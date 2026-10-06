import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Users, 
  Award
} from 'lucide-react';
import { TEACHER_BATCHES } from '../../data/mockData';

export default function TeacherReports() {
  const [selectedBatch, setSelectedBatch] = useState('ALL');

  const bandDistribution = [
    { band: 'Band 6.0', count: 4, percentage: 8 },
    { band: 'Band 6.5', count: 12, percentage: 24 },
    { band: 'Band 7.0', count: 18, percentage: 36 },
    { band: 'Band 7.5', count: 11, percentage: 22 },
    { band: 'Band 8.0+', count: 5, percentage: 10 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Batch Performance Analytics & Reports
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Empirical cohort score distributions, historical progression, and institutional exports.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="form-select" 
            style={{ width: '220px' }}
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="ALL">All Assigned Batches (85 Students)</option>
            {TEACHER_BATCHES.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={() => alert("Exporting Batch Performance Summary (PDF/CSV)...")}>
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top 3 Summary Stat Widgets */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Evaluated Mocks</span>
            <span className="stat-value">148</span>
            <span className="stat-trend up">+32 This Month</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
            <BarChart3 size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Target Band Attainment Rate</span>
            <span className="stat-value">78.4%</span>
            <span className="stat-trend up">Exceeding Benchmark</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            <Award size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Cohort Attendance Rate</span>
            <span className="stat-value">91.2%</span>
            <span className="stat-trend up">Consistent</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}>
            <Users size={22} />
          </div>
        </div>
      </div>

      {/* Band Score Histogram (Lurni & Panacea Bar Style) */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Overall Band Score Distribution</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Gaussian distribution across evaluated students in the latest mock session</p>
          </div>
          <span className="badge badge-green">Median: Band 7.0</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bandDistribution.map((item, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '700' }}>{item.band}</span>
                <span style={{ color: 'var(--text-secondary)' }}><strong>{item.count} students</strong> ({item.percentage}%)</span>
              </div>
              <div style={{ height: '10px', background: '#F1F5F9', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${item.percentage * 2.2}%`, 
                  height: '100%', 
                  background: idx >= 2 ? 'var(--primary-red)' : '#94A3B8',
                  borderRadius: '5px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
