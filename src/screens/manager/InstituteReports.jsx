import React from 'react';
import { 
  BarChart3, 
  Download, 
  Award, 
  Users 
} from 'lucide-react';

export default function InstituteReports() {
  const branchScores = [
    { branch: 'Gulshan Main Campus (HQ)', avgBand: 7.4, students: 540, passRate: '92%' },
    { branch: 'Dhanmondi Academic Center', avgBand: 7.1, students: 380, passRate: '88%' },
    { branch: 'Uttara North Sector Hub', avgBand: 7.0, students: 260, passRate: '86%' },
    { branch: 'Chittagong Regional Campus', avgBand: 6.9, students: 160, passRate: '82%' },
    { branch: 'Sylhet Global Centre', avgBand: 6.8, students: 80, passRate: '80%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Institute-Wide Executive Intelligence & Reports
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Comprehensive performance metrics, multi-branch cohort progression, and audit exports.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => alert("Exporting comprehensive annual report (PDF)...")}>
          <Download size={14} />
          <span>Export Institute Intelligence Report</span>
        </button>
      </div>

      {/* 3 Core Overview Cards */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Tests Administered</span>
            <span className="stat-value">6,420</span>
            <span className="stat-trend up">+24% vs Q2</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
            <BarChart3 size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Institute Overall Average Band</span>
            <span className="stat-value">7.15</span>
            <span className="stat-trend up">Top 5% Nationwide</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--primary-red-subtle)', color: 'var(--primary-red)' }}>
            <Award size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Course Completion Rate</span>
            <span className="stat-value">94.2%</span>
            <span className="stat-trend up">High Retention</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            <Users size={22} />
          </div>
        </div>
      </div>

      {/* Multi-Branch Comparative Score Card */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
          Branch Comparative Band Scores & Benchmark Attainment
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {branchScores.map((b, idx) => (
            <div key={idx} style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{b.branch}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>({b.students} active candidates)</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span className="badge badge-green">Band 7.0+ Pass: {b.passRate}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: '800', color: 'var(--primary-red)' }}>
                    Band {b.avgBand}
                  </span>
                </div>
              </div>

              <div style={{ height: '7px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(b.avgBand / 9.0) * 100}%`, height: '100%', background: 'var(--primary-red)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
