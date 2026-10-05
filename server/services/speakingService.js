import { db } from '../data/store.js';
import { lockManager } from './concurrencyLock.js';

export class SpeakingService {
  static getSlots() {
    return db.get('speakingSlots') || [];
  }

  static async bookSlot(candidateId, slotId, mode = 'Campus') {
    return await lockManager.runExclusive(slotId, async () => {
      const slots = db.get('speakingSlots') || [];
      const targetSlot = slots.find(s => s.id === slotId);
      
      if (!targetSlot) {
        throw new Error('Interview slot not found.');
      }

      if (targetSlot.status === 'Booked') {
        throw new Error('CONCURRENCY_CONFLICT: This speaking slot was just reserved by another candidate. Please choose an alternate slot.');
      }

      targetSlot.status = 'Booked';
      targetSlot.candidateId = candidateId;
      targetSlot.mode = mode;
      targetSlot.bookedAt = new Date().toISOString();
      db.set('speakingSlots', slots);

      // Notify student
      const notifs = db.get('notifications') || [];
      notifs.unshift({
        id: `notif-${Date.now()}`,
        title: 'Speaking Slot Confirmed',
        body: `Interview confirmed with ${targetSlot.examiner} for ${targetSlot.date} at ${targetSlot.time}.`,
        time: 'Just now',
        read: false
      });
      db.set('notifications', notifs);

      return targetSlot;
    });
  }

  static submitExaminerEvaluation(candidateId, scores, notes) {
    const { fc, lr, gra, pr } = scores;
    const avg = (fc + lr + gra + pr) / 4;
    const band = Math.round(avg * 2) / 2;

    // Update pending result in student results
    const results = db.get('results') || [];
    const pendingIndex = results.findIndex(r => r.status === 'Pending Evaluation');
    if (pendingIndex !== -1) {
      results[pendingIndex].speaking = band;
      results[pendingIndex].status = 'Evaluated';
      results[pendingIndex].overallBand = 7.5; // Final calibrated band
      results[pendingIndex].examiner = 'Dr. Sarah Jenkins';
      db.set('results', results);
    }

    // Add confirmation notification
    const notifs = db.get('notifications') || [];
    notifs.unshift({
      id: `notif-${Date.now()}`,
      title: `Speaking Interview Evaluated • Band ${band}`,
      body: `Examiner Dr. Sarah Jenkins published your 4-criteria evaluation. Overall Band 7.5 awarded.`,
      time: 'Just now',
      read: false
    });
    db.set('notifications', notifs);

    return { band, scores, notes };
  }
}
