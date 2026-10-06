import assert from 'node:assert';

const BASE_URL = process.env.API_URL || 'http://localhost:5001';

async function checkServerRunning() {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    return res.status === 200;
  } catch {
    return false;
  }
}

async function runScaleBenchmark() {
  console.log('\n===============================================================');
  console.log('⚡ EDUMAX SAAS 1,000,000 SCALE & STRESS VERIFICATION SUITE');
  console.log('===============================================================\n');

  let serverInstance = null;
  const isRunning = await checkServerRunning();
  if (!isRunning) {
    console.log('Spawning in-process test server instance for benchmark...');
    const { startServer } = await import('../server/index.js');
    serverInstance = startServer(5001);
    await new Promise(r => setTimeout(r, 600));
  }

  try {
    // -------------------------------------------------------------
    // Test 1: Health Probes & System Telemetry
    // -------------------------------------------------------------
    console.log('[Test 1/7] Verifying Kubernetes Probes & System Health Telemetry...');
    const liveRes = await fetch(`${BASE_URL}/health/live`);
    assert.strictEqual(liveRes.status, 200, 'Kubernetes Liveness probe must return 200');

    const readyRes = await fetch(`${BASE_URL}/health/ready`);
    assert.strictEqual(readyRes.status, 200, 'Kubernetes Readiness probe must return 200');

    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthJson = await healthRes.json();
    assert.strictEqual(healthJson.status, 'ONLINE');
    assert.ok(healthJson.storageEngine, 'Storage engine metrics must be present');
    assert.ok(healthJson.cacheTelemetry, 'Cache telemetry must be present');
    console.log(`  ✓ Kubernetes Liveness & Readiness OK. Worker: ${healthJson.clusterWorker}`);
    console.log(`  ✓ Storage Engine: ${JSON.stringify(healthJson.storageEngine.indexedCollections)}`);

    // -------------------------------------------------------------
    // Test 2: Compression Verification (Gzip)
    // -------------------------------------------------------------
    console.log('\n[Test 2/7] Verifying Native Gzip Response Compression...');
    const compRes = await fetch(`${BASE_URL}/api/tests`, {
      headers: { 'Accept-Encoding': 'gzip' }
    });
    assert.strictEqual(compRes.status, 200);
    const contentEncoding = compRes.headers.get('content-encoding');
    console.log(`  ✓ Tests catalog returned with encoding: ${contentEncoding || 'identity'}`);
    assert.strictEqual(contentEncoding, 'gzip', 'Large JSON payload must be gzip compressed');

    // -------------------------------------------------------------
    // Test 3: Multi-Tier Cache & ETag 304 Verification
    // -------------------------------------------------------------
    console.log('\n[Test 3/7] Verifying LRU Cache & Conditional 304 Not Modified...');
    const firstReq = await fetch(`${BASE_URL}/api/tests`);
    const etag = firstReq.headers.get('etag');
    assert.ok(etag, 'ETag header must be provided for cacheable responses');
    console.log(`  ✓ Received ETag: ${etag}`);

    const conditionalReq = await fetch(`${BASE_URL}/api/tests`, {
      headers: { 'If-None-Match': etag }
    });
    assert.strictEqual(conditionalReq.status, 304, 'Server must return 304 Not Modified on matching ETag');
    console.log('  ✓ Conditional GET safely returned 304 Not Modified (0 byte body transfer)');

    // -------------------------------------------------------------
    // Test 4: Pagination & Sub-Collection Queries
    // -------------------------------------------------------------
    console.log('\n[Test 4/7] Verifying High-Scale Dataset Pagination (page=1, limit=2)...');
    const pageRes = await fetch(`${BASE_URL}/api/results?page=1&limit=2`);
    const pageJson = await pageRes.json();
    assert.strictEqual(pageJson.success, true);
    assert.strictEqual(pageJson.data.length, 2, 'Page should contain exactly 2 items');
    assert.ok(pageJson.pagination, 'Pagination metadata must be present');
    assert.strictEqual(pageJson.pagination.page, 1);
    assert.strictEqual(pageJson.pagination.limit, 2);
    console.log(`  ✓ Pagination verified: Page 1 of ${pageJson.pagination.totalPages} (Total ${pageJson.pagination.total} records)`);

    // -------------------------------------------------------------
    // Test 5: Prometheus / OpenTelemetry Metrics Exposition
    // -------------------------------------------------------------
    console.log('\n[Test 5/7] Verifying OpenMetrics / Prometheus /metrics endpoint...');
    const metricsRes = await fetch(`${BASE_URL}/metrics`);
    assert.strictEqual(metricsRes.status, 200);
    const metricsText = await metricsRes.text();
    assert.ok(metricsText.includes('edumax_http_requests_total'), 'Metrics should contain total requests');
    assert.ok(metricsText.includes('edumax_request_duration_p99_ms'), 'Metrics should expose P99 latency');
    console.log('  ✓ Prometheus exposition scraped successfully');

    // -------------------------------------------------------------
    // Test 6: Rate Limiting & Dynamic SaaS Headers
    // -------------------------------------------------------------
    console.log('\n[Test 6/7] Verifying Sliding-Window Rate Limiter & Headers...');
    const rlRes = await fetch(`${BASE_URL}/api/tests`);
    const limitHeader = rlRes.headers.get('x-ratelimit-limit');
    const remainingHeader = rlRes.headers.get('x-ratelimit-remaining');
    assert.ok(limitHeader, 'X-RateLimit-Limit must be set');
    assert.ok(remainingHeader, 'X-RateLimit-Remaining must be set');
    console.log(`  ✓ Rate limit headers: Limit=${limitHeader}, Remaining=${remainingHeader}`);

    // -------------------------------------------------------------
    // Test 7: Burst Concurrency & High Throughput Simulation
    // -------------------------------------------------------------
    const CONCURRENCY = 40;
    const TOTAL_REQUESTS = 400;
    console.log(`\n[Test 7/7] Simulating High-Throughput Burst: ${TOTAL_REQUESTS} Requests (${CONCURRENCY} concurrent workers)...`);
    
    const startTime = Date.now();
    const endpoints = [
      '/api/tests',
      '/health',
      '/api/batches',
      '/api/speaking/slots',
      '/api/results?page=1&limit=3'
    ];

    const latencies = [];
    for (let batch = 0; batch < TOTAL_REQUESTS; batch += CONCURRENCY) {
      const batchPromises = Array.from({ length: CONCURRENCY }, async (_, idx) => {
        const i = batch + idx;
        const ep = endpoints[i % endpoints.length];
        const reqStart = Date.now();
        const res = await fetch(`${BASE_URL}${ep}`);
        const duration = Date.now() - reqStart;
        latencies.push(duration);
        assert.strictEqual(res.status, 200, `Request ${i} to ${ep} must succeed`);
        return res.status;
      });
      await Promise.all(batchPromises);
    }

    const totalDurationMs = Date.now() - startTime;
    const rps = Math.round((TOTAL_REQUESTS / totalDurationMs) * 1000);

    latencies.sort((a, b) => a - b);
    const p50 = latencies[Math.floor(latencies.length * 0.50)];
    const p95 = latencies[Math.floor(latencies.length * 0.95)];
    const p99 = latencies[Math.floor(latencies.length * 0.99)];

    console.log(`  ✓ Completed ${TOTAL_REQUESTS} requests in ${totalDurationMs}ms`);
    console.log(`  ⚡ Measured Throughput: ${rps} Requests/Sec (In-Process)`);
    console.log(`  📊 Latency Distribution: P50=${p50}ms | P95=${p95}ms | P99=${p99}ms`);

    assert.ok(p99 < 300, `P99 latency (${p99}ms) should be well within acceptable threshold`);

    console.log('\n===============================================================');
    console.log('🎉 ALL 7 SCALE & CONCURRENCY BENCHMARK TESTS PASSED');
    console.log('===============================================================\n');

  } finally {
    if (serverInstance) {
      serverInstance.close();
    }
  }
}

runScaleBenchmark().catch(err => {
  console.error('\n❌ Scale Benchmark Failed:', err);
  process.exit(1);
});
