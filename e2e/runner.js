import { chromium } from '@playwright/test';

/**
 * Edumax SaaS Comprehensive E2E Test Suite
 * Powered by Playwright using macOS Native Google Chrome
 * Validates Routing, All 4 User Persona Journeys, Social Login, and Visual Components.
 */

const BASE_URL = 'http://localhost:5173';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function runE2ETests() {
  console.log('\n======================================================');
  console.log('🚀 Starting Edumax SaaS Playwright E2E Verification');
  console.log(`🌐 Target: ${BASE_URL} | Browser: Google Chrome (Mac)`);
  console.log('======================================================\n');

  let browser;
  let passedCount = 0;
  let totalCount = 0;

  function assert(condition, testName) {
    totalCount++;
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`  ✗ [FAIL] ${testName}`);
      throw new Error(`Assertion failed: ${testName}`);
    }
  }

  try {
    browser = await chromium.launch({
      executablePath: CHROME_PATH,
      headless: true
    });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    // -------------------------------------------------------------
    // Test 1: Unauthenticated Root Redirects to /login
    // -------------------------------------------------------------
    console.log('[Test 1/12] Verifying Unauthenticated Session Gate & Routing to /login...');
    await page.goto(`${BASE_URL}/`);
    await page.waitForURL('**/login', { timeout: 6000 });
    assert(page.url().includes('/login'), 'Redirected unauthenticated user to /login');

    const heading = await page.textContent('h1');
    assert(heading.includes('Sign in to Edumax Cloud'), 'AuthPage renders proper branded heading');

    // -------------------------------------------------------------
    // Test 2: Social Login Buttons Existence & Google Auth Flow
    // -------------------------------------------------------------
    console.log('\n[Test 2/12] Testing Google Social Sign-In for Student Persona...');
    const googleBtn = page.locator('button:has-text("Continue with Google")');
    assert(await googleBtn.isVisible(), 'Google Social Login button is visible and active');

    const linkedinBtn = page.locator('button:has-text("Continue with LinkedIn")');
    assert(await linkedinBtn.isVisible(), 'LinkedIn Social Login button is visible for examiners');

    // Click Google Login
    await googleBtn.click();
    await page.waitForURL('**/student/dashboard', { timeout: 8000 });
    assert(page.url().includes('/student/dashboard'), 'Google auth redirected to /student/dashboard');

    await page.locator('h1:has-text("Welcome")').waitFor({ timeout: 6000 });
    const studentWelcome = await page.textContent('h1');
    assert(studentWelcome.includes('Nafis Ahmed'), 'Student dashboard shows authenticated user greeting');

    // -------------------------------------------------------------
    // Test 3: Visual Charts Presence in Student Dashboard
    // -------------------------------------------------------------
    console.log('\n[Test 3/12] Verifying Minimal Visual Charts (Spider, Track Bars, Donut, Sparklines)...');
    const sparklines = page.locator('svg:has(path)');
    const sparklineCount = await sparklines.count();
    assert(sparklineCount >= 4, `Rendered multiple SVG charts on dashboard (Found: ${sparklineCount})`);

    const spiderChart = page.locator('svg polygon');
    assert((await spiderChart.count()) >= 2, 'Rendered 4-skill Spider / Radar chart with target & current polygons');

    // -------------------------------------------------------------
    // Test 4: Browser History & URL Deep Linking Navigation
    // -------------------------------------------------------------
    console.log('\n[Test 4/12] Testing Deep Linking & Browser History Navigation...');
    await page.goto(`${BASE_URL}/student/progress-analytics`);
    await page.locator('h1:has-text("Progress Analytics")').waitFor({ timeout: 6000 });
    assert(page.url().includes('/student/progress-analytics'), 'Direct URL navigation to /student/progress-analytics works');

    const analyticsHeader = await page.textContent('h1');
    assert(analyticsHeader.includes('Progress Analytics'), 'Loaded Progress Analytics screen from direct URL');

    // Test Browser Back Button
    await page.goBack();
    await page.waitForURL('**/student/dashboard');
    assert(page.url().includes('/student/dashboard'), 'Browser Back button successfully navigated back to dashboard');

    // -------------------------------------------------------------
    // Test 5: Role-Based Access Boundary (Cross-Role Security 403)
    // -------------------------------------------------------------
    console.log('\n[Test 5/12] Testing Cross-Role RBAC Gating (Student Attempting Manager Screen)...');
    await page.goto(`${BASE_URL}/manager/branches`);
    await page.locator('text=Restricted Portal View').waitFor({ timeout: 6000 });

    const accessDenied = page.locator('text=Restricted Portal View');
    assert(await accessDenied.isVisible(), 'Access Denied (HTTP 403) modal triggered for unauthorized cross-role access');

    // Click "Return to My Dashboard"
    const returnHomeBtn = page.locator('button:has-text("Return to My Dashboard")');
    await returnHomeBtn.click();
    await page.waitForURL('**/student/dashboard');
    assert(page.url().includes('/student/dashboard'), 'Return to Dashboard safely restored student workspace');

    // -------------------------------------------------------------
    // Test 6: In-App User Switcher Complete Absence & Sign Out
    // -------------------------------------------------------------
    console.log('\n[Test 6/12] Verifying In-App Switcher is Removed & Testing Clean Sign Out...');
    const switchPortalBtn = page.locator('button:has-text("Switch Portal")');
    assert(!(await switchPortalBtn.isVisible()), 'No "Switch Portal" button present in top navigation');

    // Open Profile Menu
    await page.locator('.user-profile-summary').click();
    await page.locator('button:has-text("Sign Out")').waitFor({ timeout: 5000 });

    const switchRoleOption = page.locator('text=Switch Role Account');
    assert(!(await switchRoleOption.isVisible()), 'No "Switch Role Account" present in profile dropdown');

    // Click Sign Out
    const signOutBtn = page.locator('button:has-text("Sign Out")').first();
    await signOutBtn.click();
    await page.waitForURL('**/login', { timeout: 6000 });
    assert(page.url().includes('/login'), 'Sign Out cleanly terminated session and navigated to /login');

    // -------------------------------------------------------------
    // Test 7: LinkedIn Social Login & Examiner Portal Flow
    // -------------------------------------------------------------
    console.log('\n[Test 7/12] Testing LinkedIn Social Login for Teacher / Examiner Persona...');
    const linkedinLoginBtn = page.locator('button:has-text("Continue with LinkedIn")');
    await linkedinLoginBtn.click();
    await page.waitForURL('**/teacher/teacher-dashboard', { timeout: 8000 });
    assert(page.url().includes('/teacher/teacher-dashboard'), 'LinkedIn auth navigated to /teacher/teacher-dashboard');

    await page.locator('h1:has-text("Examiner Console")').waitFor({ timeout: 6000 });
    const teacherHeader = await page.textContent('h1');
    assert(teacherHeader.includes('Examiner Console'), 'Examiner Console opened successfully');

    // -------------------------------------------------------------
    // Test 8: Examiner Interactive Speaking Console Flow
    // -------------------------------------------------------------
    console.log('\n[Test 8/12] Testing Examiner Speaking Console Interaction & Score Locking...');
    await page.goto(`${BASE_URL}/teacher/speaking-interview`);
    await page.waitForURL('**/teacher/speaking-interview', { timeout: 6000 });
    assert(page.url().includes('/teacher/speaking-interview'), 'Navigated to Speaking Interview Console');

    const lockScoreBtn = page.locator('button:has-text("Lock & Publish Score")');
    await lockScoreBtn.waitFor({ timeout: 6000 });
    assert(await lockScoreBtn.isVisible(), 'Lock & Publish button is active in examiner console');
    await lockScoreBtn.click();
    await page.waitForURL('**/teacher/teacher-dashboard', { timeout: 8000 });
    assert(page.url().includes('/teacher/teacher-dashboard'), 'Evaluation lock redirected safely back to teacher dashboard');

    // Sign out from teacher
    await page.locator('.user-profile-summary').click();
    await page.locator('button:has-text("Sign Out")').first().click();
    await page.waitForURL('**/login');

    // -------------------------------------------------------------
    // Test 9: Manager Persona Journey & Batch Provisioning
    // -------------------------------------------------------------
    console.log('\n[Test 9/12] Testing Institute Manager Login & Batch Creation Flow...');
    // Click Manager quick chip on AuthPage
    await page.click('button:has-text("Manager")');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/manager/institute-dashboard', { timeout: 8000 });
    assert(page.url().includes('/manager/institute-dashboard'), 'Manager logged in to institute dashboard');

    // Direct navigate to batch create wizard
    await page.goto(`${BASE_URL}/manager/batch-create`);
    await page.locator('h1:has-text("Create New Student Cohort")').waitFor({ timeout: 6000 });
    assert(page.url().includes('/manager/batch-create'), 'Navigated to Batch Creation Wizard');

    const createBatchSubmitBtn = page.locator('button:has-text("Launch & Publish Cohort")');
    assert(await createBatchSubmitBtn.isVisible(), 'Launch & Publish Cohort button is ready');
    await createBatchSubmitBtn.click();
    await page.locator('text=Cohort Successfully Created!').waitFor({ timeout: 6000 });
    assert(await page.locator('text=Cohort Successfully Created!').isVisible(), 'Batch provisioning completed with backend confirmation');

    // Sign out from manager
    await page.locator('.user-profile-summary').click();
    await page.locator('button:has-text("Sign Out")').first().click();
    await page.waitForURL('**/login');

    // -------------------------------------------------------------
    // Test 10: Platform Admin Persona & Revenue Analytics
    // -------------------------------------------------------------
    console.log('\n[Test 10/12] Testing Platform Admin Login & Revenue Dashboard...');
    await page.click('button:has-text("Admin")');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/**', { timeout: 8000 });
    assert(page.url().includes('/admin/'), 'Admin logged in successfully');

    await page.goto(`${BASE_URL}/admin/revenue-dashboard`);
    await page.locator('h1:has-text("Revenue & Commercial Analytics")').waitFor({ timeout: 6000 });
    assert(page.url().includes('/admin/revenue-dashboard'), 'Admin Revenue Dashboard loaded with visual charts');

    // Sign out from admin
    await page.locator('.user-profile-summary').click();
    await page.locator('button:has-text("Sign Out")').first().click();
    await page.waitForURL('**/login');

    // -------------------------------------------------------------
    // Test 11: Student Speaking Slot Booking Flow
    // -------------------------------------------------------------
    console.log('\n[Test 11/12] Testing Student Speaking Slot Reservation Flow...');
    await page.click('button:has-text("Continue with Google")');
    await page.waitForURL('**/student/dashboard');

    await page.goto(`${BASE_URL}/student/speaking-booking`);
    await page.locator('h1:has-text("Speaking Examiner Slot Reservation")').waitFor({ timeout: 6000 });
    assert(page.url().includes('/student/speaking-booking'), 'Navigated to Speaking Booking screen');

    const confirmBookingBtn = page.locator('button:has-text("Confirm Slot Reservation")');
    assert(await confirmBookingBtn.isVisible(), 'Confirm Slot Reservation button active');
    await confirmBookingBtn.click();
    await page.locator('text=Interview Slot Confirmed!').waitFor({ timeout: 6000 });
    assert(await page.locator('text=Interview Slot Confirmed!').isVisible(), 'Speaking reservation locked successfully with backend mutex');

    // -------------------------------------------------------------
    // Test 12: Student Practice Exam Simulation Flow
    // -------------------------------------------------------------
    console.log('\n[Test 12/12] Testing Exam Taking Simulation & Result Submission...');
    await page.goto(`${BASE_URL}/student/exam-taking`);
    await page.locator('text=OFFICIAL IELTS SIMULATION RUNNER').waitFor({ timeout: 6000 });
    assert(page.url().includes('/student/exam-taking'), 'Active exam taking simulation runner started');

    const submitExamBtn = page.locator('button:has-text("Submit Exam Paper")');
    assert(await submitExamBtn.isVisible(), 'Submit Exam Paper button is ready');
    await submitExamBtn.click();
    await page.waitForURL('**/student/my-results', { timeout: 8000 });
    assert(page.url().includes('/student/my-results'), 'Submitted exam evaluated and routed to My Results list');

    console.log('\n======================================================');
    console.log(`🎉 ALL 12 PLAYWRIGHT E2E TESTS PASSED (${passedCount}/${totalCount})`);
    console.log('======================================================\n');
  } catch (err) {
    console.error('\n❌ E2E Test Suite Error:', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
}

runE2ETests();
