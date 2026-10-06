import { Router } from 'express';
import { db } from '../data/store.js';
import { ExamService } from '../services/examService.js';
import { SpeakingService } from '../services/speakingService.js';
import { ManagerService } from '../services/managerService.js';
import { AdminService } from '../services/adminService.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { cacheManager, cacheRoute } from '../middleware/cache.js';
import { lockManager } from '../services/concurrencyLock.js';
import { taskQueue } from '../services/taskQueue.js';

const router = Router();

// Helper to handle pagination or direct array response cleanly
function respondCollection(res, key, req, filterFn = null, sortFn = null) {
  if (req.query.page || req.query.limit) {
    const paginated = db.paginate(key, {
      page: req.query.page,
      limit: req.query.limit,
      filterFn,
      sortFn
    });
    return res.json({
      success: true,
      data: paginated.items,
      pagination: paginated.pagination
    });
  }
  const full = db.get(key) || [];
  const items = filterFn ? full.filter(filterFn) : full;
  return res.json({ success: true, data: items });
}

// --- Auth & Profile ---
router.get('/user/:role', (req, res) => {
  const users = db.get('users') || {};
  const user = users[req.params.role] || users.student;
  res.json({ success: true, data: user });
});

router.put('/user/profile', authenticate, requireRole(['student']), (req, res) => {
  const users = db.get('users') || {};
  users.student = { ...users.student, ...req.body };
  db.set('users', users);
  cacheManager.invalidatePattern('/api/user');
  res.json({ success: true, data: users.student });
});

// --- Tests & Exam Taking Journey ---
router.get('/tests', cacheRoute(120000), (req, res) => {
  respondCollection(res, 'tests', req);
});

// Student only: Submit Exam Attempt (with Mutex lock & Idempotency Key protection)
router.post('/exams/submit', authenticate, requireRole(['student']), async (req, res) => {
  try {
    const candidateId = req.user?.id || req.body.candidateId || 'std_01';
    const { testId, answers, essayText } = req.body;
    const idempotencyKey = req.headers['idempotency-key'] || req.body.idempotencyKey;

    const executeSubmission = async () => {
      const result = ExamService.submitAttempt(candidateId, testId, answers || {}, essayText || '');
      cacheManager.invalidatePattern('/api/results');
      return result;
    };

    const result = idempotencyKey
      ? await lockManager.runIdempotent(idempotencyKey, executeSubmission)
      : await executeSubmission();

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/results', (req, res) => {
  const candidateFilter = req.query.candidateId
    ? (r) => (r.candidateId || 'std_01') === req.query.candidateId
    : null;
  respondCollection(res, 'results', req, candidateFilter);
});

// --- Speaking Slots & Live Examiner ---
router.get('/speaking/slots', cacheRoute(30000), (req, res) => {
  const slots = SpeakingService.getSlots();
  res.json({ success: true, data: slots });
});

// Student only: Atomic Slot Reservation with Distributed Mutex Lock
router.post('/speaking/book', authenticate, requireRole(['student']), async (req, res) => {
  try {
    const candidateId = req.user?.id || req.body.candidateId || 'std_01';
    const { slotId, mode } = req.body;
    const idempotencyKey = req.headers['idempotency-key'] || req.body.idempotencyKey;

    const executeBooking = async () => {
      const booked = await SpeakingService.bookSlot(candidateId, slotId, mode);
      cacheManager.invalidatePattern('/api/speaking');
      return booked;
    };

    const booked = idempotencyKey
      ? await lockManager.runIdempotent(idempotencyKey, executeBooking)
      : await executeBooking();

    res.json({ success: true, data: booked });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Teacher / Examiner only: Submit Speaking Rubric Evaluation
router.post('/speaking/evaluate', authenticate, requireRole(['teacher', 'manager']), (req, res) => {
  try {
    const { candidateId, scores, notes } = req.body;
    const evaluation = SpeakingService.submitExaminerEvaluation(candidateId || 'std_01', scores, notes);
    cacheManager.invalidatePattern('/api/speaking');
    cacheManager.invalidatePattern('/api/results');
    res.json({ success: true, data: evaluation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- Batches & Exam Sessions (Teacher & Manager) ---
router.get('/batches', cacheRoute(60000), (req, res) => {
  respondCollection(res, 'batches', req);
});

// Manager only: Create Batch Cohort
router.post('/batches/create', authenticate, requireRole(['manager', 'admin']), (req, res) => {
  try {
    const newBatch = ManagerService.createBatch(req.body);
    cacheManager.invalidatePattern('/api/batches');
    res.json({ success: true, data: newBatch });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Manager only: Schedule Exam Session
router.post('/exams/schedule', authenticate, requireRole(['manager', 'admin']), (req, res) => {
  try {
    const session = ManagerService.scheduleExamSession(req.body);
    cacheManager.invalidatePattern('/api/batches');
    res.json({ success: true, data: session });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Manager only: Publish Exam Results & WhatsApp Dispatches
router.post('/results/publish', authenticate, requireRole(['manager', 'admin']), (req, res) => {
  try {
    const { sessionId, options } = req.body;
    const publishResult = ManagerService.publishResults(sessionId, options || {});
    cacheManager.invalidatePattern('/api/results');
    res.json({ success: true, data: publishResult });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- Platform Admin Services ---
// Platform Admin only: Tenant Management
router.get('/tenants', authenticate, requireRole(['admin']), (req, res) => {
  respondCollection(res, 'tenants', req);
});

router.put('/tenants/:id', authenticate, requireRole(['admin']), (req, res) => {
  try {
    const updated = AdminService.updateTenant(req.params.id, req.body);
    cacheManager.invalidatePattern('/api/tenants');
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Admin & Manager: Coupon Validation
router.post('/coupons/validate', authenticate, requireRole(['admin', 'manager', 'student']), (req, res) => {
  const { code, amount } = req.body;
  const result = AdminService.validateCoupon(code, amount);
  res.json({ success: true, data: result });
});

// Platform Admin only: Feature Flags
router.post('/features/toggle', authenticate, requireRole(['admin']), (req, res) => {
  const { tenantId, flagKey, enabled } = req.body;
  const updatedFlags = AdminService.toggleFeatureFlag(tenantId || 'ten-1', flagKey, enabled);
  cacheManager.invalidatePattern('/api/features');
  res.json({ success: true, data: updatedFlags });
});

// Platform Admin only: System Telemetry
router.get('/system/telemetry', authenticate, requireRole(['admin']), (req, res) => {
  const telemetryData = AdminService.getSystemTelemetry();
  res.json({ success: true, data: telemetryData });
});

// Platform Admin only: Support Ticket Reply
router.post('/tickets/reply', authenticate, requireRole(['admin']), (req, res) => {
  try {
    const { ticketId, replyText } = req.body;
    const updatedTicket = AdminService.replySupportTicket(ticketId, replyText);
    res.json({ success: true, data: updatedTicket });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- Notifications ---
router.get('/notifications', (req, res) => {
  respondCollection(res, 'notifications', req);
});

router.post('/notifications/read', (req, res) => {
  const notifs = db.get('notifications') || [];
  notifs.forEach(n => { n.read = true; });
  db.set('notifications', notifs);
  res.json({ success: true, data: notifs });
});

// --- Asynchronous Background Job Status Polling ---
router.get('/jobs/:jobId', (req, res) => {
  const job = taskQueue.getJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ success: false, error: 'Job not found' });
  }
  res.json({ success: true, data: job });
});

// --- High-Scale System Diagnostics ---
router.get('/system/cache-stats', (req, res) => {
  res.json({ success: true, data: cacheManager.getMetrics() });
});

router.get('/system/db-stats', (req, res) => {
  res.json({ success: true, data: db.getMetrics() });
});

router.get('/system/queue-stats', (req, res) => {
  res.json({ success: true, data: taskQueue.getMetrics() });
});

export default router;
