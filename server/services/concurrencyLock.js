// High-concurrency in-memory atomic mutex locker for critical SaaS transactions
// Implements an event-loop safe FIFO Promise Queue per resource key

class ConcurrencyLock {
  constructor() {
    this.queues = new Map();
    this.metrics = {
      totalAcquired: 0,
      activeLocks: 0,
      conflictsPrevented: 0
    };
  }

  // Atomically executes task with exclusive lock on given key
  async runExclusive(key, task, timeoutMs = 8000) {
    const lockKey = String(key);
    const prevQueue = this.queues.get(lockKey) || Promise.resolve();

    let releaseLock;
    let timeoutHandle;

    const currentLockPromise = new Promise((resolve, reject) => {
      releaseLock = resolve;
      if (timeoutMs > 0) {
        timeoutHandle = setTimeout(() => {
          reject(new Error(`CONCURRENCY_TIMEOUT: Acquisition timeout (${timeoutMs}ms) for resource [${lockKey}].`));
        }, timeoutMs);
      }
    });

    // Chain to serialize execution
    const serializedPromise = prevQueue
      .catch(() => {}) // Don't let previous failures block future tasks
      .then(() => currentLockPromise);

    if (this.queues.has(lockKey)) {
      this.metrics.conflictsPrevented++;
    }

    this.queues.set(lockKey, serializedPromise);
    this.metrics.activeLocks = this.queues.size;

    try {
      // Wait for our turn in the queue
      await prevQueue.catch(() => {});
      this.metrics.totalAcquired++;
      
      const result = await task();
      return result;
    } finally {
      if (timeoutHandle) clearTimeout(timeoutHandle);
      releaseLock();

      // Clean up queue if this was the last pending task
      if (this.queues.get(lockKey) === serializedPromise) {
        this.queues.delete(lockKey);
      }
      this.metrics.activeLocks = this.queues.size;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      activeLocks: this.queues.size,
      timestamp: new Date().toISOString()
    };
  }
}

export const lockManager = new ConcurrencyLock();
