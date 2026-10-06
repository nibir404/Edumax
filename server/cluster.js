import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const numCPUs = process.env.CLUSTER_WORKERS === 'auto' || !process.env.CLUSTER_WORKERS
  ? os.cpus().length
  : parseInt(process.env.CLUSTER_WORKERS, 10) || 4;

const PORT = process.env.PORT || 5001;

if (cluster.isPrimary) {
  console.log('\n===============================================================');
  console.log('🚀 EDUMAX SAAS ENTERPRISE MULTI-CORE CLUSTER MANAGER');
  console.log(`🌐 Primary Process PID: ${process.pid}`);
  console.log(`⚡ Detected Host CPU Cores: ${os.cpus().length} | Spawning Workers: ${numCPUs}`);
  console.log(`📡 Port: ${PORT} | Architecture Target: 1M Scalable Concurrency`);
  console.log('===============================================================\n');

  const workers = new Map();

  function spawnWorker(i) {
    const worker = cluster.fork({ WORKER_INDEX: i });
    workers.set(worker.id, { id: worker.id, pid: worker.process.pid, index: i });

    worker.on('message', (msg) => {
      // Handle IPC messages from workers if needed
      if (msg.type === 'TELEMETRY_PING') {
        // Broadcast or aggregate
      }
    });

    return worker;
  }

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    spawnWorker(i + 1);
  }

  // Auto-healing: Replace dead workers automatically
  cluster.on('exit', (worker, code, signal) => {
    console.warn(`[Cluster Primary] Worker #${worker.id} (PID ${worker.process.pid}) exited with code ${code} / signal ${signal}.`);
    workers.delete(worker.id);

    console.log('[Cluster Primary] Auto-healing: Spawning fresh replacement worker...');
    const newWorker = spawnWorker(workers.size + 1);
    console.log(`[Cluster Primary] Replacement Worker #${newWorker.id} spawned successfully.`);
  });

  // Zero-Downtime Rolling Reload on SIGUSR2
  process.on('SIGUSR2', async () => {
    console.log('[Cluster Primary] Received SIGUSR2: Initiating zero-downtime rolling restart...');
    const workerList = Object.values(cluster.workers);

    for (const oldWorker of workerList) {
      if (!oldWorker) continue;
      console.log(`[Cluster Primary] Restarting worker #${oldWorker.id}...`);
      
      const newWorker = spawnWorker(workers.size + 1);
      
      // Wait for new worker to be listening before disconnecting old one
      await new Promise((resolve) => {
        newWorker.once('listening', resolve);
      });

      oldWorker.disconnect();
      const killTimer = setTimeout(() => oldWorker.kill(), 5000);
      if (killTimer.unref) killTimer.unref();
    }
    console.log('[Cluster Primary] Zero-downtime rolling reload completed successfully.');
  });

  // Graceful shutdown
  const handleShutdown = () => {
    console.log('[Cluster Primary] Terminating cluster gracefully...');
    for (const id in cluster.workers) {
      cluster.workers[id]?.disconnect();
    }
    setTimeout(() => process.exit(0), 3000);
  };

  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);

} else {
  // Worker process: start application server
  import('./index.js').catch(err => {
    console.error(`[Worker ${process.pid}] Startup failed:`, err);
    process.exit(1);
  });
}
