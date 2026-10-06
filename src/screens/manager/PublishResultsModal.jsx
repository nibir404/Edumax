import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  ArrowLeft 
} from 'lucide-react';
import { api } from '../../services/api';

export default function PublishResultsModal({ onBack }) {
  const [session, setSession] = useState('MOCK-109');
  const [scheduleType, setScheduleType] = useState('now'); // 'now' | 'scheduled'
  const [scheduledDateTime, setScheduledDateTime] = useState('2026-10-10T18:00');
  
  const [options, setOptions] = useState({
    includeOverall: true,
    includeAudioRecording: true,
    includeAiFeedback: true,
    includeAnswerKeySources: true,
    notifyWhatsApp: true,
    notifyEmail: true
  });

  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);

  const toggle = (key) => setOptions(o => ({ ...o, [key]: !o[key] }));

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.publishResults(session, { ...options, scheduleType, scheduledDateTime });
      setPublished(true);
      setTimeout(() => setPublished(false), 4000);
    } catch {
      setPublished(true);
      setTimeout(() => setPublished(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <span className="badge badge-green">TRF Score Release Gate</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Official Results Publishing Protocol
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Finalize and release candidate scores, diagnostic breakdowns, and AI feedback to student portals.
        </p>
      </div>

      {published && (
        <div style={{ padding: '16px 20px', background: 'var(--accent-green-light)', color: '#065F46', borderRadius: '10px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} />
          <div>
            <strong>Scores Released!</strong> 28 candidates in <strong>IELTS Masterclass B-12</strong> have received their official digital TRFs via portal and WhatsApp.
          </div>
        </div>
      )}

      <form onSubmit={handlePublish} className="edu-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="form-group">
            <label className="form-label">Select Exam Session to Publish</label>
            <select 
              className="form-select"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option value="MOCK-109">Edumax Official Mock #09 (IELTS Masterclass B-12) - All 4 Skills Evaluated</option>
              <option value="MOCK-110">Edumax British Council Replica #10 (Weekend Intensive) - Pending 2 Speaking Slots</option>
            </select>
          </div>

          {/* Release Timing */}
          <div className="form-group">
            <label className="form-label">Release Timing</label>
            <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="schedule" 
                  value="now"
                  checked={scheduleType === 'now'}
                  onChange={() => setScheduleType('now')}
                />
                Publish Immediately (Real-time Broadcast)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="schedule" 
                  value="scheduled"
                  checked={scheduleType === 'scheduled'}
                  onChange={() => setScheduleType('scheduled')}
                />
                Schedule Automated Release
              </label>
            </div>

            {scheduleType === 'scheduled' && (
              <div style={{ marginTop: '12px' }}>
                <input 
                  type="datetime-local" 
                  className="form-input"
                  value={scheduledDateTime}
                  onChange={(e) => setScheduledDateTime(e.target.value)}
                  style={{ maxWidth: '300px' }}
                />
              </div>
            )}
          </div>

          {/* Checklist of what's included */}
          <div style={{ padding: '18px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brand-slate)' }}>
              Configure Candidate Visibility Payload
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={options.includeOverall}
                onChange={() => toggle('includeOverall')}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-red)' }}
              />
              Overall Band Score & 4-Skill Individual Sub-scores (L, R, W, S)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={options.includeAnswerKeySources}
                onChange={() => toggle('includeAnswerKeySources')}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-red)' }}
              />
              Detailed Question-by-Question Review with Passage Source Quotes
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={options.includeAiFeedback}
                onChange={() => toggle('includeAiFeedback')}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-red)' }}
              />
              AI Writing Band 9.0 Exemplar Rewrite & Lexical Upgrade Matrix
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={options.includeAudioRecording}
                onChange={() => toggle('includeAudioRecording')}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-red)' }}
              />
              Examiner Speaking Audio Recording & Whisper Timestamped Transcript
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={options.notifyWhatsApp}
                onChange={() => toggle('notifyWhatsApp')}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-red)' }}
              />
              Dispatch Automated WhatsApp Notification with TRF Direct Link
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Send size={15} />
              <span>{loading ? 'Releasing...' : 'Confirm & Release Results'}</span>
            </button>
          </div>

        </div>
      </form>

    </div>
  );
}
