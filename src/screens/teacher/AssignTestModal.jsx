import React, { useState } from 'react';
import { 
  Send, 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { TEST_LIBRARY, TEACHER_BATCHES } from '../../data/mockData';

export default function AssignTestModal({ onBack, onClose, onComplete, onAssigned }) {
  const [selectedTest, setSelectedTest] = useState(TEST_LIBRARY[0].id);
  const [selectedBatch, setSelectedBatch] = useState(TEACHER_BATCHES[0].id);
  const [deadline, setDeadline] = useState('2026-10-12T23:59');
  const [enableAiGrading, setEnableAiGrading] = useState(true);
  const [releaseMode, setReleaseMode] = useState('instant'); // 'instant' | 'examinerApproval'
  const [isAssigned, setIsAssigned] = useState(false);

  const handleClose = () => {
    if (onBack) onBack();
    else if (onClose) onClose();
  };

  const handleAssign = (e) => {
    e.preventDefault();
    setIsAssigned(true);
    setTimeout(() => {
      if (onComplete) onComplete();
      else if (onAssigned) onAssigned();
      else if (onClose) onClose();
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={handleClose}>
          <ArrowLeft size={14} />
          <span>Cancel & Back</span>
        </button>
        <span className="badge badge-red">Batch Distribution Engine</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Assign Test Paper to Cohort
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Distribute Cambridge mock examinations or section drills with access constraints and deadlines.
        </p>
      </div>

      {isAssigned ? (
        <div className="edu-card" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={28} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Test Successfully Assigned!</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Notification bulletins and portal access have been unlocked for the students in this cohort.
          </p>
        </div>
      ) : (
        <form onSubmit={handleAssign} className="edu-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Test Paper Selection */}
            <div className="form-group">
              <label className="form-label">Select Official Test Paper</label>
              <select 
                className="form-select"
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
              >
                {TEST_LIBRARY.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.title} ({test.type} • {test.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Batch */}
            <div className="form-group">
              <label className="form-label">Target Cohort / Batch</label>
              <select 
                className="form-select"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                {TEACHER_BATCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.studentsCount} Students)
                  </option>
                ))}
              </select>
            </div>

            {/* Submission Deadline */}
            <div className="form-group">
              <label className="form-label">Submission Deadline & Lockout Time</label>
              <input 
                type="datetime-local" 
                className="form-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>

            {/* AI Grading & Release Policy */}
            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Enable Instant AI Writing Feedback</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Generate Band 9 comparative rewrites as soon as student submits.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={enableAiGrading}
                  onChange={(e) => setEnableAiGrading(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <label className="form-label">Result Release Mode</label>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="releaseMode" 
                      value="instant" 
                      checked={releaseMode === 'instant'} 
                      onChange={() => setReleaseMode('instant')}
                    />
                    Instant Self-Score (Listening & Reading immediate)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="releaseMode" 
                      value="examinerApproval" 
                      checked={releaseMode === 'examinerApproval'} 
                      onChange={() => setReleaseMode('examinerApproval')}
                    />
                    Hold until Examiner Speaking & Writing Finalized
                  </label>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Send size={15} />
                <span>Distribute to Batch Students</span>
              </button>
            </div>

          </div>
        </form>
      )}

    </div>
  );
}
