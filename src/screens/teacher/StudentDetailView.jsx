import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Award, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Send,
  Sparkles
} from 'lucide-react';
import { STUDENT_RESULTS } from '../../data/mockData';

export default function StudentDetailView({ onBack, onAssignTest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Batch</span>
        </button>
        <button className="btn btn-primary btn-sm" onClick={onAssignTest}>
          <Send size={14} />
          <span>Assign Targeted Mock</span>
        </button>
      </div>

      {/* Student 360 Card */}
      <div className="edu-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--primary-red), #F43F5E)', 
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '800'
            }}>
              NA
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Nafis Ahmed</h2>
                <span className="badge badge-green">On Track for 8.0</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Cohort: <strong>IELTS Masterclass B-12</strong> • Branch: Gulshan HQ • Target Exam: Nov 20, 2026
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Band</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-red)' }}>7.5</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-color)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Band</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--brand-slate)' }}>8.0</div>
            </div>
          </div>
        </div>

        {/* Skill Breakdown Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>LISTENING</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-blue)' }}>8.5</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-green)' }}>Strengths: Sec 1, 3, 4</div>
          </div>

          <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>READING</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-green)' }}>8.0</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-green)' }}>Strengths: Passages 1 & 2</div>
          </div>

          <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>WRITING</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-red)' }}>6.5</div>
            <div style={{ fontSize: '11px', color: 'var(--primary-red)' }}>Needs Collocation Work</div>
          </div>

          <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SPEAKING</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-purple)' }}>7.5</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-green)' }}>Strong Flow & Idioms</div>
          </div>
        </div>
      </div>

      {/* Historical Attempts Ledger */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Complete Mock Exam Record</h3>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Date</th>
                <th>Overall</th>
                <th>L</th>
                <th>R</th>
                <th>W</th>
                <th>S</th>
                <th>Examiner Remarks</th>
              </tr>
            </thead>
            <tbody>
              {STUDENT_RESULTS.map((res) => (
                <tr key={res.id}>
                  <td style={{ fontWeight: '700' }}>{res.title}</td>
                  <td>{res.date}</td>
                  <td style={{ fontWeight: '800', color: 'var(--primary-red)' }}>{res.overallBand || 'Pending'}</td>
                  <td>{res.listening}</td>
                  <td>{res.reading}</td>
                  <td>{res.writing}</td>
                  <td>{res.speaking}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {res.status === 'Evaluated' ? 'Consistent high band in receptive skills. Task 2 coherence improving.' : 'Currently in grading pipeline.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
