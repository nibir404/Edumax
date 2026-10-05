import React from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  GitBranch, 
  Plus, 
  Send,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { INSTITUTE_BRANCHES, CURRENT_USERS } from '../../data/mockData';

export default function InstituteDashboard({ onNavigate }) {
  const manager = CURRENT_USERS.manager;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Institute Executive Console • {manager.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Edumax Consultancy • Overseeing 5 Branches • <strong>{manager.totalStudents}</strong> Active Students Enrolled
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => onNavigate('exam-session-create')}>
            <Plus size={15} />
            <span>Schedule Exam Session</span>
          </button>
          <button className="btn btn-primary" onClick={() => onNavigate('batch-create')}>
            <Plus size={15} />
            <span>Create New Cohort</span>
          </button>
        </div>
      </div>

      {/* 4 Core Institute KPIs (Lurni & Panacea Style) */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Enrolled Students</span>
            <span className="stat-value">{manager.totalStudents}</span>
            <span className="stat-trend up">
              <TrendingUp size={14} /> +12.4% vs last term
            </span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Monthly Gross Revenue</span>
            <span className="stat-value">{manager.monthlyRevenue}</span>
            <span className="stat-trend up">
              <TrendingUp size={14} /> +18.2% Growth
            </span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            <DollarSign size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Active Operating Branches</span>
            <span className="stat-value">5</span>
            <span className="stat-trend up">Gulshan, DHM, UTR, CTG, SYL</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--primary-red-subtle)', color: 'var(--primary-red)' }}>
            <GitBranch size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Exam Pass Rate (Band 7.0+)</span>
            <span className="stat-value">88.4%</span>
            <span className="stat-trend up">Exceeding British Standard</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}>
            <Award size={22} />
          </div>
        </div>
      </div>

      {/* Branch Performance Comparison (Lurni Table Style) */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Branch Performance & Revenue Breakdown</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Student enrollment and campus capacity utilization across Bangladesh</p>
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
                <th>Monthly Intake Revenue</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {INSTITUTE_BRANCHES.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Lead Director: {b.manager}</div>
                  </td>
                  <td>
                    <span className="badge badge-slate">{b.code}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '700' }}>{b.students} students</span>
                  </td>
                  <td>{b.staff} Teachers & Examiners</td>
                  <td>{b.rooms} Speaking & Audio Suites</td>
                  <td>
                    <span style={{ fontWeight: '800', color: 'var(--accent-green)' }}>{b.revenue}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('branches')}
                    >
                      <span>Branch Analytics</span>
                      <ChevronRight size={13} />
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
