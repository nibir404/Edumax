// Automated Concurrency & Scalability Benchmark Test
import assert from 'assert';

const BASE_URL = process.env.API_URL || 'http://localhost:5001/api';

async function runConcurrencyTest() {
  console.log('--- Starting Edumax SaaS Concurrency Stress Benchmark ---');
  const WORKERS = 50;

  console.log(`\nSimulating ${WORKERS} simultaneous concurrent transactional requests...`);
  const startTime = Date.now();

  const res = await fetch(`${BASE_URL}/system/concurrency-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workers: WORKERS, resourceKey: `bench_${Date.now()}` })
  });

  const durationMs = Date.now() - startTime;
  const json = await res.json();

  assert.strictEqual(res.status, 200, 'Benchmark endpoint must return 200 OK');
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.metrics.totalRequests, WORKERS);
  assert.strictEqual(json.metrics.granted, 1, 'Only 1 worker must acquire lock');
  assert.strictEqual(json.metrics.conflictsSafelyPrevented, WORKERS - 1, '49 conflicts safely resolved');

  console.log(`✓ Handled ${WORKERS} concurrent requests in ${durationMs}ms`);
  console.log(`✓ Atomically granted: ${json.metrics.granted}`);
  console.log(`✓ Race conflicts safely prevented: ${json.metrics.conflictsSafelyPrevented}`);
  console.log(`✓ Active locks remaining: ${json.metrics.lockTelemetry.activeLocks}`);

  console.log('\n=============================================');
  console.log('🎉 CONCURRENCY & RACE CONDITION TEST PASSED');
  console.log('=============================================\n');
}

runConcurrencyTest().catch(err => {
  console.error('❌ Concurrency Test Failed:', err);
  process.exit(1);
});
