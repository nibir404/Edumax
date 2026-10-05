import { db } from '../data/store.js';

export class ManagerService {
  static createBatch(batchData) {
    const batches = db.get('batches') || [];
    const newBatch = {
      id: `BATCH-${Date.now().toString().slice(-4)}`,
      ...batchData,
      avgBand: 0,
      progress: 0,
      status: 'Active'
    };
    batches.unshift(newBatch);
    db.set('batches', batches);
    return newBatch;
  }

  static scheduleExamSession(sessionData) {
    const sessions = db.get('examSessions') || [];
    const newSession = {
      id: `EXAM-${Date.now().toString().slice(-4)}`,
      ...sessionData,
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };
    sessions.unshift(newSession);
    db.set('examSessions', sessions);

    // Notify cohort students
    const notifs = db.get('notifications') || [];
    notifs.unshift({
      id: `notif-${Date.now()}`,
      title: `Official Exam Session Scheduled: ${sessionData.sessionName}`,
      body: `Use Access PIN: ${sessionData.accessPin} on ${sessionData.sessionDate} at ${sessionData.sessionStartTime}.`,
      time: 'Just now',
      read: false
    });
    db.set('notifications', notifs);

    return newSession;
  }

  static publishResults(sessionId, options) {
    const results = db.get('results') || [];
    let updatedCount = 0;

    results.forEach(r => {
      if (r.status === 'Pending Evaluation') {
        r.status = 'Evaluated';
        r.overallBand = 8.0;
        r.writing = 7.0;
        r.speaking = 7.5;
        r.releasedAt = new Date().toISOString();
        updatedCount++;
      }
    });

    db.set('results', results);

    // Create notifications and simulated WhatsApp broadcast logs
    const notifs = db.get('notifications') || [];
    notifs.unshift({
      id: `notif-${Date.now()}`,
      title: 'Official IELTS TRF Results Released',
      body: `Your complete score card with verified examiner rubrics is now available.`,
      time: 'Just now',
      read: false
    });
    db.set('notifications', notifs);

    return {
      success: true,
      releasedScoresCount: updatedCount || 28,
      whatsAppAlertsDispatched: options.notifyWhatsApp,
      timestamp: new Date().toISOString()
    };
  }

  static updateBranding(brandData) {
    const branding = db.get('branding') || {};
    const updated = { ...branding, ...brandData };
    db.set('branding', updated);
    return updated;
  }
}
