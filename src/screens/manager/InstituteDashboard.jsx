import React from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  DollarSign, 
  TrendingUp, 
  GitBranch, 
  Plus, 
  ChevronRight
} from 'lucide-react';
import { INSTITUTE_BRANCHES, CURRENT_USERS } from '../../data/mockData';

export default function InstituteDashboard({ onNavigate }) {
  const manager = CURRENT_USERS.manager;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            Institute Operations
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            {manager.name} • 5 Campuses Overseen • <strong>{manager.totalStudents}</strong> Active Candidates Enrolled
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('exam-session-create')}>
            <Plus size={14} />
            <span>Schedule Exam Session</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('batch-create')}>
            <Plus size={14} />
            <span>Create New Cohort</span>
          </button>
        </div>
      </div>

      {/* 4 Core Institute KPIs */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Enrolled Students</span>
            <span className="stat-value">{manager.totalStudents}</span>
            <span className="stat-trend up">
              <TrendingUp size={13} /> +12.4% vs last term
            </span>
          </div>
          <div className="stat-icon-box">
            <Users size={20} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Monthly Gross Revenue</span>
            <span className="stat-value">{manager.monthlyRevenue}</span>
            <span className="stat-trend up">
              <TrendingUp size={13} /> +18.2% Growth
            </span>
          </div>
          <div className="stat-icon-box">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Operating Campuses</span>
            <span className="stat-value">5</span>
            <span className="stat-trend" style={{ color: 'var(--text-muted)' }}>
              Gulshan, DHM, UTR, CTG, SYL
            </span>
          </div>
          <div className="stat-icon-box">
            <GitBranch size={20} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Exam Pass Rate (Band 7.0+)</span>
            <span className="stat-value">88.4%</span>
            <span className="stat-trend up">Exceeding Benchmark</span>
          </div>
          <div className="stat-icon-box">
            <Award size={20} />
          </div>
        </div>
      </div>

      {/* Branch Performance Comparison */}
      <div className="edu-card" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-primary)' }}>Branch Performance Breakdown</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Candidate enrollment and campus capacity utilization across Bangladesh</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('branches')}>
            Manage Branches
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Branch Campus</th>
                <th>Branch Code</th>
                <th>Active Students</th>
                <th>Staff Headcount</th>
                <th>Dedicated Exam Labs</th>
                <th>Monthly Intake</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {INSTITUTE_BRANCHES.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Director: {b.manager}</div>
                  </td>
                  <td>
                    <span className="badge">{b.code}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '700' }}>{b.students} students</span>
                  </td>
                  <td>{b.staff} Teachers & Examiners</td>
                  <td>{b.rooms} Suites</td>
                  <td>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.revenue}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('branches')}
                    >
                      <span>Analytics</span>
                      <ChevronRight size={12} />
                    </button>
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
