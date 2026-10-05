import React, { useState } from 'react';
import { 
  Layers, 
  ArrowLeft, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Save, 
  FileText, 
  Headphones, 
  PenTool, 
  Mic 
} from 'lucide-react';

export default function TestBuilder({ onBack, onComplete }) {
  const [testTitle, setTestTitle] = useState('Edumax Full Cambridge Mock Paper #12');
  const [testFormat, setTestFormat] = useState('Academic');
  const [duration, setDuration] = useState('2h 45m');

  const [sections, setSections] = useState([
    { skill: 'Listening', name: 'Official 4-Section Audio Battery (40 Qs)', status: 'Configured' },
    { skill: 'Reading', name: 'Academic 3-Passage Battery (40 Qs)', status: 'Configured' },
    { skill: 'Writing', name: 'Task 1 (Bar Chart) & Task 2 (Discussion)', status: 'Configured' },
    { skill: 'Speaking', name: '1-on-1 Certified Examiner Interview (3 Parts)', status: 'Configured' }
  ]);

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Question Bank</span>
        </button>
        <span className="badge badge-red">Full Mock Assembly Studio</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Test Builder: Assemble Examination Paper
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Combine listening, reading, writing, and speaking sections into official mock papers.
        </p>
      </div>

      {saved ? (
        <div className="edu-card" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={30} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Examination Paper Assembled!</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <strong>{testTitle}</strong> is now compiled and ready to be assigned to batches.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="edu-card" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Mock Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Target Format</label>
                <select 
                  className="form-select"
                  value={testFormat}
                  onChange={(e) => setTestFormat(e.target.value)}
                >
                  <option value="Academic">IELTS Academic</option>
                  <option value="General">IELTS General Training</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Total Duration</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* 4 Sections Assembly Checklist */}
          <div className="edu-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Assembled Skill Modules</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sections.map((sec, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '8px', 
                      background: 'var(--primary-red-subtle)', 
                      color: 'var(--primary-red)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {sec.skill === 'Listening' ? <Headphones size={18} /> :
                       sec.skill === 'Reading' ? <FileText size={18} /> :
                       sec.skill === 'Writing' ? <PenTool size={18} /> : <Mic size={18} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{sec.skill} Section</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sec.name}</div>
                    </div>
                  </div>

                  <span className="badge badge-green">
                    <CheckCircle2 size={12} /> {sec.status}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={15} />
                <span>Compile & Publish Paper</span>
              </button>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
