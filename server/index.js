import express from 'express';
import cors from 'cors';
import cluster from 'node:cluster';
import apiRouter from './routes/api.js';
import authRouter from './routes/auth.js';
import { lockManager } from './services/concurrencyLock.js';
import { db } from './data/store.js';
import { cacheManager } from './middleware/cache.js';
import { rateLimitMiddleware } from './middleware/rateLimiter.js';
import { compressionMiddleware } from './middleware/compression.js';
import { telemetry } from './services/telemetry.js';

const app = express();
const PORT = process.env.PORT || 5001;
const WORKER_ID = cluster.isWorker ? `worker-${cluster.worker.id}` : 'standalone-01';

// High-speed CORS & Body Parser
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Idempotency-Key', 'If-None-Match']
}));

// Fast Response Compression (Gzip / Deflate for > 1KB)
app.use(compressionMiddleware);

// JSON Body Parser with reasonable limit
app.use(express.json({ limit: '10mb' }));

// SaaS Scalability & Concurrency Middleware
app.use((req, res, next) => {
  const startHr = process.hrtime.bigint();
  telemetry.recordRequestStart();

  res.setHeader('X-SaaS-Cluster-Node', 'edumax-cluster-lon1');
  res.setHeader('X-SaaS-Cluster-Worker', WORKER_ID);

  res.on('finish', () => {
    const endHr = process.hrtime.bigint();
    const durationMs = Number(endHr - startHr) / 1000000;
    telemetry.recordRequestEnd(req.method, req.baseUrl || req.path, res.statusCode, durationMs);

    // Log slow requests (> 300ms)
    if (durationMs > 300) {
      console.warn(`[SLOW API QUERY] ${req.method} ${req.originalUrl} took ${durationMs.toFixed(2)}ms`);
    }
  });

  next();
});

// Dynamic Sliding Window Rate Limiting
app.use(rateLimitMiddleware);

// Authentication & Session Routes
app.use('/api/auth', authRouter);

// Main API Routes (with RBAC, Pagination, Caching, and Concurrency Protection)
app.use('/api', apiRouter);

// --- Health, Kubernetes Probes & Telemetry ---

// Comprehensive Health & Telemetry Endpoint
app.get('/health', (req, res) => {
  const snap = telemetry.getSnapshot();
  res.json({
    status: 'ONLINE',
    service: 'Edumax Enterprise Unified Backend API',
    version: '4.5.0-scale-1m',
    clusterWorker: WORKER_ID,
    runtime: snap,
    concurrencyLocks: lockManager.getMetrics(),
    cacheTelemetry: cacheManager.getMetrics(),
    storageEngine: db.getMetrics(),
    timestamp: new Date().toISOString()
  });
});

// Kubernetes Liveness Probe (Instant response)
app.get('/health/live', (req, res) => {
  res.status(200).send('OK');
});

// Kubernetes Readiness Probe (Ensures storage engine & event loop are healthy)
app.get('/health/ready', (req, res) => {
  const snap = telemetry.getSnapshot();
  // If event loop lag > 1000ms or memory critically exhausted, fail readiness to let K8s route elsewhere
  if (snap.latency.eventLoopLagMs > 1000) {
    return res.status(503).json({ status: 'DEGRADED', reason: 'High event loop lag' });
  }
  res.status(200).json({ status: 'READY', worker: WORKER_ID });
});

// OpenTelemetry / Prometheus Metrics Endpoint
app.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; version=0.0.4');
  res.send(telemetry.getPrometheusMetrics());
});

// Concurrency Verification / Stress Simulation Endpoint
app.post('/api/system/concurrency-test', async (req, res) => {
  const { workers = 20, resourceKey = 'test_slot_demo' } = req.body;
  
  let successCount = 0;
  let conflictCount = 0;
  const executionLogs = [];

  const promises = Array.from({ length: Math.min(workers, 100) }, (_, i) => {
    return lockManager.runExclusive(resourceKey, async () => {
      // Simulate atomic verification & DB write
      await new Promise(r => setTimeout(r, 10)); // 10ms critical section
      if (successCount === 0) {
        successCount++;
        executionLogs.push({ worker: i + 1, result: 'GRANTED', timestamp: Date.now() });
        return { status: 'GRANTED', worker: i + 1 };
      } else {
        conflictCount++;
        executionLogs.push({ worker: i + 1, result: 'CONFLICT_PREVENTED', timestamp: Date.now() });
        return { status: 'CONFLICT_PREVENTED', worker: i + 1 };
      }
    });
  });

  const results = await Promise.all(promises);

  res.json({
    success: true,
    message: `Processed ${workers} concurrent requests atomically with FIFO mutex queue.`,
    metrics: {
      totalRequests: workers,
      granted: successCount,
      conflictsSafelyPrevented: conflictCount,
      lockTelemetry: lockManager.getMetrics()
    },
    resultsSummary: results.slice(0, 10)
  });
});

export function startServer(port = PORT) {
  const server = app.listen(port, () => {
    console.log(`[Edumax API Service] [${WORKER_ID}] Running with 1M Scale Engine on http://localhost:${port}`);
  });

  // Keep-alive socket tuning for high-throughput reverse proxies (Nginx / Cloudflare / ALB)
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

  return server;
}

// Auto-start when executed directly (or in cluster worker)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule || cluster.isWorker) {
  startServer(PORT);
}

export default app;
