import React from 'react';
import { 
  ArrowLeft, 
  Send,
  CheckCircle2
} from 'lucide-react';
import { STUDENT_RESULTS } from '../../data/mockData';

export default function StudentDetailView({ onBack, onAssignTest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Batch Roster</span>
        </button>
        <button className="btn btn-primary btn-sm" onClick={onAssignTest}>
          <Send size={14} />
          <span>Assign Targeted Mock</span>
        </button>
      </div>

      {/* Student 360 Profile Card — 60/30/10 Minimal System */}
      <div className="edu-card" style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            {/* Minimal Dark Slate Monogram Avatar */}
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: 'var(--radius-md)', 
              background: 'var(--brand-dark)', 
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '700',
              flexShrink: 0
            }}>
              NA
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  Nafis Ahmed
                </h2>
                <span className="badge badge-success">On Track for 8.0</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Cohort: <strong style={{ color: 'var(--text-secondary)' }}>IELTS Masterclass B-12</strong> • Campus: Gulshan HQ • Exam Target: Nov 20, 2026
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '28px', textAlign: 'center', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Band</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-red)' }}>7.5</div>
            </div>
            <div style={{ width: '1px', height: '36px', background: 'var(--border-color)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Band</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>8.0</div>
            </div>
          </div>
        </div>

        {/* Skill Breakdown Grid — Fluid Auto-Fit Responsive */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '12px', 
          marginTop: '24px', 
          paddingTop: '20px', 
          borderTop: '1px solid var(--border-color)' 
        }}>
          <div style={{ padding: '14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Listening</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0' }}>8.5</div>
            <div style={{ fontSize: '11px', color: 'var(--status-success-text)', fontWeight: '500' }}>Sections 1, 3, 4 Solid</div>
          </div>

          <div style={{ padding: '14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Reading</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0' }}>8.0</div>
            <div style={{ fontSize: '11px', color: 'var(--status-success-text)', fontWeight: '500' }}>Passages 1 & 2 Strong</div>
          </div>

          <div style={{ padding: '14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Writing</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-red)', margin: '4px 0' }}>6.5</div>
            <div style={{ fontSize: '11px', color: 'var(--primary-red)', fontWeight: '500' }}>Task 2 Cohesion Focus</div>
          </div>

          <div style={{ padding: '14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Speaking</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0' }}>7.5</div>
            <div style={{ fontSize: '11px', color: 'var(--status-success-text)', fontWeight: '500' }}>Fluent & Certified</div>
          </div>
        </div>
      </div>

      {/* Historical Attempts Ledger */}
      <div className="edu-card" style={{ padding: 'clamp(20px, 2.5vw, 28px)' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Complete Mock Exam Record</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Historical progression of calibrated scores and examiner feedback</p>
        </div>
        
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Exam Paper</th>
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
                  <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{res.title}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{res.date}</td>
                  <td style={{ fontWeight: '800', color: res.overallBand ? 'var(--primary-red)' : 'var(--text-muted)' }}>
                    {res.overallBand || 'Pending'}
                  </td>
                  <td>{res.listening}</td>
                  <td>{res.reading}</td>
                  <td>{res.writing}</td>
                  <td>{res.speaking}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {res.status === 'Evaluated' 
                      ? 'Consistent high band in receptive skills. Task 2 coherence improving.' 
                      : 'Under active examiner review.'}
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
