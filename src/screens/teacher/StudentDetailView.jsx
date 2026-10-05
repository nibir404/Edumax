import React from 'react';
import { 
  ArrowLeft, 
  Send,
  CheckCircle2,
  Award
} from 'lucide-react';
import { STUDENT_RESULTS } from '../../data/mockData';
import SpiderChart from '../../components/charts/SpiderChart';
import Sparkline from '../../components/charts/Sparkline';

export default function StudentDetailView({ onBack, onAssignTest }) {
  const latest = STUDENT_RESULTS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
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

      {/* Student 360 Profile Card — Split Layout with Spider Chart */}
      <div className="edu-card" style={{ padding: '24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'center' }}>
          
          {/* Left Info & Metric Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ 
                width: '52px', 
                height: '52px', 
                borderRadius: '14px', 
                background: '#0F172A', 
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '800',
                flexShrink: 0
              }}>
                NA
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                    Nafis Ahmed
                  </h2>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', background: '#F0FDF4', padding: '2px 8px', borderRadius: '999px' }}>
                    Band 8.0 Track
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '3px', margin: 0 }}>
                  IELTS Masterclass B-12 • Gulshan HQ • Target Exam: Nov 2026
                </p>
              </div>
            </div>

            {/* 4 Skill Mini Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Listening</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{latest.listening}</div>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '500' }}>37/40 Correct</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Reading</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{latest.reading}</div>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '500' }}>35/40 Correct</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Writing</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-red)', marginTop: '2px' }}>{latest.writing}</div>
                <div style={{ fontSize: '11px', color: 'var(--primary-red)', fontWeight: '500' }}>Task 2 Cohesion Focus</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Speaking</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{latest.speaking}</div>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '500' }}>Fluent & Certified</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Spider Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>
              Skill Balance vs Band 8.0 Target
            </div>
            <SpiderChart 
              skills={[
                { label: 'Listening', current: latest.listening, target: 8.0 },
                { label: 'Reading', current: latest.reading, target: 8.0 },
                { label: 'Writing', current: latest.writing, target: 8.0 },
                { label: 'Speaking', current: latest.speaking, target: 8.0 }
              ]}
              size={210}
            />
          </div>

        </div>
      </div>

      {/* Historical Attempts Ledger */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Evaluations</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Calibrated Mock Results</div>
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {STUDENT_RESULTS.map((res) => (
                <tr key={res.id}>
                  <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{res.title}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{res.date}</td>
                  <td style={{ fontWeight: '800', color: res.overallBand ? 'var(--primary-red)' : 'var(--text-muted)' }}>
                    {res.overallBand ? `Band ${res.overallBand}` : 'Pending'}
                  </td>
                  <td>{res.listening}</td>
                  <td>{res.reading}</td>
                  <td>{res.writing}</td>
                  <td>{res.speaking}</td>
                  <td>
                    <span 
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: res.status === 'Evaluated' ? '#F0FDF4' : '#FEF3C7',
                        color: res.status === 'Evaluated' ? '#166534' : '#92400E'
                      }}
                    >
                      {res.status}
                    </span>
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
