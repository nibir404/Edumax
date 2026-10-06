// Automated Integration Test: Role-Based Access Control (RBAC) Verification
import assert from 'assert';

const BASE_URL = process.env.API_URL || 'http://localhost:5001/api';

async function postJSON(endpoint, data = {}, headers = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return { status: res.status, data: json };
}

async function getJSON(endpoint, headers = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...headers }
  });
  const json = await res.json();
  return { status: res.status, data: json };
}

async function ensureServerRunning() {
  try {
    const res = await fetch(`${BASE_URL.replace('/api', '')}/health`);
    if (res.status === 200) return null;
  } catch {}
  const { startServer } = await import('../server/index.js');
  const server = startServer(5001);
  await new Promise(r => setTimeout(r, 600));
  return server;
}

async function runRBACTests() {
  console.log('--- Starting Edumax SaaS RBAC Verification ---');
  const serverInstance = await ensureServerRunning();
  try {

  // Step 1: Login all 4 personas
  console.log('\n[1/4] Authenticating all 4 personas...');
  const studentAuth = await postJSON('/auth/login', { role: 'student' });
  const teacherAuth = await postJSON('/auth/login', { role: 'teacher' });
  const managerAuth = await postJSON('/auth/login', { role: 'manager' });
  const adminAuth = await postJSON('/auth/login', { role: 'admin' });

  assert.strictEqual(studentAuth.status, 200, 'Student login should succeed');
  assert.strictEqual(teacherAuth.status, 200, 'Teacher login should succeed');
  assert.strictEqual(managerAuth.status, 200, 'Manager login should succeed');
  assert.strictEqual(adminAuth.status, 200, 'Admin login should succeed');

  const studentToken = studentAuth.data.data.token;
  const teacherToken = teacherAuth.data.data.token;
  const managerToken = managerAuth.data.data.token;
  const adminToken = adminAuth.data.data.token;

  console.log('✓ Successfully authenticated: Student, Teacher, Manager, and Admin');

  // Step 2: Test Student Boundary (Must NOT access Manager batch creation)
  console.log('\n[2/4] Testing Student role boundaries...');
  const studentAttempt = await postJSON(
    '/batches/create',
    { name: 'Unauthorized Batch' },
    { Authorization: `Bearer ${studentToken}` }
  );
  assert.strictEqual(studentAttempt.status, 403, 'Student must receive 403 Forbidden for Manager route');
  assert.strictEqual(studentAttempt.data.code, 'FORBIDDEN');
  console.log('✓ Student access to manager batch creation blocked with 403 FORBIDDEN');

  // Step 3: Test Teacher Boundary (Must NOT access Admin tenant management)
  console.log('\n[3/4] Testing Teacher & Manager boundaries...');
  const teacherAttempt = await getJSON(
    '/tenants',
    { Authorization: `Bearer ${teacherToken}` }
  );
  assert.strictEqual(teacherAttempt.status, 403, 'Teacher must receive 403 Forbidden for Admin route');
  console.log('✓ Teacher access to platform admin tenants blocked with 403 FORBIDDEN');

  const managerAttempt = await getJSON(
    '/tenants',
    { Authorization: `Bearer ${managerToken}` }
  );
  assert.strictEqual(managerAttempt.status, 403, 'Manager must receive 403 Forbidden for Admin route');
  console.log('✓ Manager access to platform admin tenants blocked with 403 FORBIDDEN');

  // Step 4: Test Platform Admin Clearance (Must access Admin route)
  console.log('\n[4/4] Testing Admin elevated clearance...');
  const adminAccess = await getJSON(
    '/tenants',
    { Authorization: `Bearer ${adminToken}` }
  );
  assert.strictEqual(adminAccess.status, 200, 'Admin should have 200 OK access to Admin route');
  assert.strictEqual(adminAccess.data.success, true);
  console.log('✓ Platform Admin successfully accessed tenant catalog with 200 OK');

  console.log('\n=============================================');
  console.log('🎉 ALL RBAC ACCESS BOUNDARY TESTS PASSED (4/4)');
  console.log('=============================================\n');
  } finally {
    if (serverInstance) serverInstance.close();
  }
}

runRBACTests().catch(err => {
  console.error('❌ RBAC Test Failed:', err);
  process.exit(1);
});
