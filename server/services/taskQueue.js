import crypto from 'node:crypto';

/**
 * Enterprise Asynchronous Background Task Queue
 * 
 * Offloads heavy computational workloads (AI Essay Evaluation, WhatsApp blasts, PDF generation)
 * away from the main request/response lifecycle to maintain sub-50ms P95 API latencies for 1M users.
 */
class TaskQueue {
  constructor(concurrency = 8) {
    this.concurrency = concurrency;
    this.runningCount = 0;
    this.queue = []; // Array of job objects
    this.jobs = new Map(); // jobId -> job state

    this.metrics = {
      totalEnqueued: 0,
      totalCompleted: 0,
      totalFailed: 0,
      totalRetries: 0
    };

    // Auto cleanup completed jobs older than 1 hour
    this.cleanupTimer = setInterval(() => this.cleanup(), 60000);
    if (this.cleanupTimer.unref) this.cleanupTimer.unref();
  }

  enqueue(type, payload, handler, options = {}) {
    const jobId = `job_${crypto.randomUUID().substring(0, 12)}`;
    const maxRetries = options.maxRetries || 2;
    const priority = options.priority || 'normal';

    const job = {
      id: jobId,
      type,
      payload,
      handler,
      status: 'QUEUED',
      progress: 0,
      result: null,
      error: null,
      retries: 0,
      maxRetries,
      priority,
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null
    };

    this.jobs.set(jobId, job);
    this.metrics.totalEnqueued++;

    if (priority === 'high') {
      this.queue.unshift(job);
    } else {
      this.queue.push(job);
    }

    this.processNext();
    return job;
  }

  async processNext() {
    if (this.runningCount >= this.concurrency || this.queue.length === 0) {
      return;
    }

    const job = this.queue.shift();
    if (!job) return;

    this.runningCount++;
    job.status = 'PROCESSING';
    job.startedAt = new Date().toISOString();

    try {
      const result = await job.handler(job.payload, (progress) => {
        job.progress = Math.min(100, Math.max(0, progress));
      });

      job.status = 'COMPLETED';
      job.progress = 100;
      job.result = result;
      job.completedAt = new Date().toISOString();
      this.metrics.totalCompleted++;
    } catch (err) {
      if (job.retries < job.maxRetries) {
        job.retries++;
        this.metrics.totalRetries++;
        job.status = 'RETRYING';
        this.queue.push(job);
      } else {
        job.status = 'FAILED';
        job.error = err.message;
        job.completedAt = new Date().toISOString();
        this.metrics.totalFailed++;
      }
    } finally {
      this.runningCount--;
      this.processNext();
    }
  }

  getJob(jobId) {
    const job = this.jobs.get(jobId);
    if (!job) return null;
    // Exclude internal handler function from returned object
    const { handler: _handler, ...publicJob } = job;
    return publicJob;
  }

  cleanup() {
    const oneHourAgo = Date.now() - 3600000;
    for (const [id, job] of this.jobs.entries()) {
      if (job.completedAt && new Date(job.completedAt).getTime() < oneHourAgo) {
        this.jobs.delete(id);
      }
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      activeWorkers: this.runningCount,
      queuedJobsCount: this.queue.length,
      trackedJobsCount: this.jobs.size,
      maxConcurrency: this.concurrency
    };
  }
}

export const taskQueue = new TaskQueue(12);
