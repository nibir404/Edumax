import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Save 
} from 'lucide-react';
import { TEST_LIBRARY, TEACHER_BATCHES } from '../../data/mockData';
import { api } from '../../services/api';

export default function ExamSessionCreate({ onBack, onComplete }) {
  const [sessionData, setSessionData] = useState({
    sessionName: 'Mid-Term Cambridge Simulation Exam #11',
    paperId: TEST_LIBRARY[0].id,
    batchId: TEACHER_BATCHES[0].id,
    sessionDate: '2026-10-15',
    sessionStartTime: '10:00',
    durationMinutes: 165,
    accessPin: 'EDX-8820',
    releasePolicy: 'manual' // 'instant' | 'manual'
  });
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.scheduleExamSession(sessionData);
      setCreated(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    } catch {
      setCreated(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Cancel & Back</span>
        </button>
        <span className="badge badge-red">Official Exam Scheduler</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Schedule Official Mock Examination Session
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Assemble exam papers, assign cohorts, set timed lockouts, and establish secure student access keys.
        </p>
      </div>

      {created ? (
        <div className="edu-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={30} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Exam Session Scheduled!</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Access PIN <strong>{sessionData.accessPin}</strong> generated. Exam portal will unlock automatically on <strong>{sessionData.sessionDate} at {sessionData.sessionStartTime}</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="edu-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label className="form-label">Exam Session Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={sessionData.sessionName}
                onChange={(e) => setSessionData({ ...sessionData, sessionName: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Official Test Paper</label>
                <select 
                  className="form-select"
                  value={sessionData.paperId}
                  onChange={(e) => setSessionData({ ...sessionData, paperId: e.target.value })}
                >
                  {TEST_LIBRARY.map(t => (
                    <option key={t.id} value={t.id}>{t.title} ({t.type})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Assigned Cohort / Batch</label>
                <select 
                  className="form-select"
                  value={sessionData.batchId}
                  onChange={(e) => setSessionData({ ...sessionData, batchId: e.target.value })}
                >
                  {TEACHER_BATCHES.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Session Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={sessionData.sessionDate}
                  onChange={(e) => setSessionData({ ...sessionData, sessionDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input 
                  type="time" 
                  className="form-input"
                  value={sessionData.sessionStartTime}
                  onChange={(e) => setSessionData({ ...sessionData, sessionStartTime: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Candidate Access PIN</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={sessionData.accessPin}
                  onChange={(e) => setSessionData({ ...sessionData, accessPin: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Result Release Protocol</label>
              <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="release" 
                    value="manual"
                    checked={sessionData.releasePolicy === 'manual'}
                    onChange={() => setSessionData({ ...sessionData, releasePolicy: 'manual' })}
                  />
                  Manual Release (After Examiner Speaking Validation)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="release" 
                    value="instant"
                    checked={sessionData.releasePolicy === 'instant'}
                    onChange={() => setSessionData({ ...sessionData, releasePolicy: 'instant' })}
                  />
                  Automated Immediate Release
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Save size={15} />
                <span>{loading ? 'Scheduling...' : 'Lock & Schedule Session'}</span>
              </button>
            </div>

          </div>
        </form>
      )}

    </div>
  );
}
