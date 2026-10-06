import os from 'node:os';
import process from 'node:process';

/**
 * Enterprise Observability & OpenTelemetry / Prometheus Engine
 * 
 * Tracks:
 * - Request duration percentiles (P50, P90, P95, P99)
 * - Event loop lag detection (crucial for detecting event loop blocking)
 * - Process memory breakdown (Heap, RSS, External)
 * - Prometheus OpenMetrics text exposition
 */
class TelemetryService {
  constructor() {
    this.requestLatencies = []; // Sliding window of latencies for percentile calculations
    this.maxWindowSize = 5000;
    this.statusCounts = new Map(); // status -> count
    this.routeCounts = new Map(); // method:route -> count
    this.totalRequests = 0;
    this.activeRequests = 0;
    this.peakConcurrentRequests = 0;
    
    this.eventLoopLagMs = 0;
    this.startEventLoopMonitor();
  }

  startEventLoopMonitor() {
    let lastTime = process.hrtime.bigint();
    const interval = 500; // Check every 500ms

    const checkLag = () => {
      const now = process.hrtime.bigint();
      const expected = BigInt(interval * 1000000);
      const delta = now - lastTime;
      const lag = Number(delta - expected) / 1000000;
      this.eventLoopLagMs = Math.max(0, lag);
      lastTime = process.hrtime.bigint();
    };

    const timer = setInterval(checkLag, interval);
    if (timer.unref) timer.unref();
  }

  recordRequestStart() {
    this.totalRequests++;
    this.activeRequests++;
    if (this.activeRequests > this.peakConcurrentRequests) {
      this.peakConcurrentRequests = this.activeRequests;
    }
  }

  recordRequestEnd(method, route, statusCode, durationMs) {
    this.activeRequests = Math.max(0, this.activeRequests - 1);

    // Track status counts
    const statusKey = String(statusCode);
    this.statusCounts.set(statusKey, (this.statusCounts.get(statusKey) || 0) + 1);

    // Track route counts
    const routeKey = `${method} ${route}`;
    this.routeCounts.set(routeKey, (this.routeCounts.get(routeKey) || 0) + 1);

    // Track latency window
    if (this.requestLatencies.length >= this.maxWindowSize) {
      this.requestLatencies.shift();
    }
    this.requestLatencies.push(durationMs);
  }

  calculatePercentiles() {
    if (this.requestLatencies.length === 0) {
      return { p50: 0, p90: 0, p95: 0, p99: 0 };
    }

    const sorted = [...this.requestLatencies].sort((a, b) => a - b);
    const getPercentile = (p) => {
      const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * p));
      return parseFloat(sorted[idx].toFixed(2));
    };

    return {
      p50: getPercentile(0.50),
      p90: getPercentile(0.90),
      p95: getPercentile(0.95),
      p99: getPercentile(0.99)
    };
  }

  getSnapshot() {
    const mem = process.memoryUsage();
    const percentiles = this.calculatePercentiles();

    return {
      uptimeSeconds: Math.floor(process.uptime()),
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        cpuCores: os.cpus().length,
        systemLoadAvg: os.loadavg(),
        freeMemoryMB: (os.freemem() / 1024 / 1024).toFixed(2),
        totalMemoryMB: (os.totalmem() / 1024 / 1024).toFixed(2)
      },
      traffic: {
        totalRequestsServed: this.totalRequests,
        activeConcurrentRequests: this.activeRequests,
        peakConcurrentRequests: this.peakConcurrentRequests
      },
      latency: {
        eventLoopLagMs: parseFloat(this.eventLoopLagMs.toFixed(2)),
        ...percentiles
      },
      memory: {
        heapUsedMB: parseFloat((mem.heapUsed / 1024 / 1024).toFixed(2)),
        heapTotalMB: parseFloat((mem.heapTotal / 1024 / 1024).toFixed(2)),
        rssMB: parseFloat((mem.rss / 1024 / 1024).toFixed(2)),
        externalMB: parseFloat((mem.external / 1024 / 1024).toFixed(2))
      }
    };
  }

  getPrometheusMetrics() {
    const snap = this.getSnapshot();
    const lines = [];

    lines.push('# HELP edumax_http_requests_total Total HTTP requests received');
    lines.push('# TYPE edumax_http_requests_total counter');
    lines.push(`edumax_http_requests_total ${this.totalRequests}`);

    lines.push('# HELP edumax_active_concurrent_requests Currently active concurrent requests');
    lines.push('# TYPE edumax_active_concurrent_requests gauge');
    lines.push(`edumax_active_concurrent_requests ${this.activeRequests}`);

    lines.push('# HELP edumax_event_loop_lag_milliseconds Node.js event loop lag in ms');
    lines.push('# TYPE edumax_event_loop_lag_milliseconds gauge');
    lines.push(`edumax_event_loop_lag_milliseconds ${snap.latency.eventLoopLagMs}`);

    lines.push('# HELP edumax_request_duration_p99_ms P99 request latency in milliseconds');
    lines.push('# TYPE edumax_request_duration_p99_ms gauge');
    lines.push(`edumax_request_duration_p99_ms ${snap.latency.p99}`);

    lines.push('# HELP edumax_memory_heap_used_bytes Heap memory used in bytes');
    lines.push('# TYPE edumax_memory_heap_used_bytes gauge');
    lines.push(`edumax_memory_heap_used_bytes ${process.memoryUsage().heapUsed}`);

    lines.push('# HELP edumax_memory_rss_bytes Resident set size in bytes');
    lines.push('# TYPE edumax_memory_rss_bytes gauge');
    lines.push(`edumax_memory_rss_bytes ${process.memoryUsage().rss}`);

    return lines.join('\n') + '\n';
  }
}

export const telemetry = new TelemetryService();
