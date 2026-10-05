import { Router } from 'express';
import { db } from '../data/store.js';
import { ExamService } from '../services/examService.js';
import { SpeakingService } from '../services/speakingService.js';
import { ManagerService } from '../services/managerService.js';
import { AdminService } from '../services/adminService.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

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
  res.json({ success: true, data: users.student });
});

// --- Tests & Exam Taking Journey ---
router.get('/tests', (req, res) => {
  const tests = db.get('tests') || [];
  res.json({ success: true, data: tests });
});

// Student only: Submit Exam Attempt
router.post('/exams/submit', authenticate, requireRole(['student']), (req, res) => {
  try {
    const candidateId = req.user?.id || req.body.candidateId || 'std_01';
    const { testId, answers, essayText } = req.body;
    const result = ExamService.submitAttempt(candidateId, testId, answers || {}, essayText || '');
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/results', (req, res) => {
  const results = db.get('results') || [];
  res.json({ success: true, data: results });
});

// --- Speaking Slots & Live Examiner ---
router.get('/speaking/slots', (req, res) => {
  const slots = SpeakingService.getSlots();
  res.json({ success: true, data: slots });
});

// Student only: Atomic Slot Reservation with Mutex Lock
router.post('/speaking/book', authenticate, requireRole(['student']), async (req, res) => {
  try {
    const candidateId = req.user?.id || req.body.candidateId || 'std_01';
    const { slotId, mode } = req.body;
    const booked = await SpeakingService.bookSlot(candidateId, slotId, mode);
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
    res.json({ success: true, data: evaluation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- Batches & Exam Sessions (Teacher & Manager) ---
router.get('/batches', (req, res) => {
  const batches = db.get('batches') || [];
  res.json({ success: true, data: batches });
});

// Manager only: Create Batch Cohort
router.post('/batches/create', authenticate, requireRole(['manager', 'admin']), (req, res) => {
  try {
    const newBatch = ManagerService.createBatch(req.body);
    res.json({ success: true, data: newBatch });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Manager only: Schedule Exam Session
router.post('/exams/schedule', authenticate, requireRole(['manager', 'admin']), (req, res) => {
  try {
    const session = ManagerService.scheduleExamSession(req.body);
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
    res.json({ success: true, data: publishResult });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- Platform Admin Services ---
// Platform Admin only: Tenant Management
router.get('/tenants', authenticate, requireRole(['admin']), (req, res) => {
  const tenants = AdminService.getTenants();
  res.json({ success: true, data: tenants });
});

router.put('/tenants/:id', authenticate, requireRole(['admin']), (req, res) => {
  try {
    const updated = AdminService.updateTenant(req.params.id, req.body);
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
  res.json({ success: true, data: updatedFlags });
});

// Platform Admin only: System Telemetry
router.get('/system/telemetry', authenticate, requireRole(['admin']), (req, res) => {
  const telemetry = AdminService.getSystemTelemetry();
  res.json({ success: true, data: telemetry });
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
  const notifs = db.get('notifications') || [];
  res.json({ success: true, data: notifs });
});

router.post('/notifications/read', (req, res) => {
  const notifs = db.get('notifications') || [];
  notifs.forEach(n => { n.read = true; });
  db.set('notifications', notifs);
  res.json({ success: true, data: notifs });
});

export default router;
