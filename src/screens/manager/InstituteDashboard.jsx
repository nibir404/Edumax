import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  DollarSign, 
  TrendingUp, 
  GitBranch, 
  Plus, 
  ChevronRight,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { INSTITUTE_BRANCHES, CURRENT_USERS } from '../../data/mockData';
import Sparkline from '../../components/charts/Sparkline';
import DonutPieChart from '../../components/charts/DonutPieChart';
import TrackBarChart from '../../components/charts/TrackBarChart';

export default function InstituteDashboard({ onNavigate }) {
  const manager = CURRENT_USERS.manager;

  const campusEnrollmentSeries = [
    { label: 'Gulshan', value: 480, detail: '480 Active Students (HQ)' },
    { label: 'Dhanmondi', value: 320, detail: '320 Active Students' },
    { label: 'Uttara', value: 260, detail: '260 Active Students' },
    { label: 'Chittagong', value: 210, detail: '210 Active Students' },
    { label: 'Sylhet', value: 150, detail: '150 Active Students' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header - SellPilot / Modulix Minimal Style */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px', margin: 0 }}>
            Institute Operations
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '3px', margin: 0 }}>
            {manager.name} • 5 Campuses • <strong>{manager.totalStudents} Active Candidates</strong> Enrolled
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
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

      {/* 4 Core Institute KPIs with Inline SVG Sparklines (SellPilot Style) */}
      <div className="stats-grid">
        
        {/* Total Enrolled Students */}
        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={15} color="#0F172A" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Enrolled Students</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {manager.totalStudents}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+12.4% vs last term</span>
            </div>
          </div>
          <Sparkline data={[1150, 1220, 1290, 1360, 1420]} color="var(--status-success-text)" width={74} height={32} />
        </div>

        {/* Monthly Revenue */}
        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(200, 30, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={15} color="var(--primary-red)" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Monthly Gross</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {manager.monthlyRevenue}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+18.2% Growth</span>
            </div>
          </div>
          <Sparkline data={[98, 105, 114, 121, 128]} color="var(--primary-red)" width={74} height={32} />
        </div>

        {/* Operating Campuses */}
        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GitBranch size={15} color="#0F172A" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Campuses</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              5
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              100% Operational
            </div>
          </div>
          <Sparkline data={[4, 4, 5, 5, 5]} color="#0F172A" width={74} height={32} />
        </div>

        {/* Pass Rate */}
        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={15} color="#10B981" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Pass Rate (7.0+)</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              88.4%
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>Above Target</span>
            </div>
          </div>
          <Sparkline data={[82, 84, 85, 87, 88.4]} color="#10B981" width={74} height={32} />
        </div>

      </div>

      {/* Visual Analytics Row: Campus Enrollment Track Bars + Campus Revenue Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Campus Intake Comparison Track Bars */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Campus Distribution</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Student Enrollment by Branch</div>
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#0F172A', background: 'var(--bg-subtle)', padding: '3px 8px', borderRadius: '6px' }}>
              1,420 Enrolled
            </span>
          </div>

          <TrackBarChart 
            items={campusEnrollmentSeries} 
            maxVal={600} 
            height={180} 
            accentColor="#0F172A"
            brandColor="#C81E2E"
          />
        </div>

        {/* Campus Revenue Donut Pie */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Revenue Contribution</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Intake by Campus</div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutPieChart 
              segments={[
                { label: 'Gulshan HQ', value: 42, color: '#C81E2E' },
                { label: 'Dhanmondi', value: 24, color: '#0F172A' },
                { label: 'Uttara', value: 18, color: '#10B981' },
                { label: 'Chittagong', value: 10, color: '#64748B' },
                { label: 'Sylhet', value: 6, color: '#CBD5E1' }
              ]}
              size={170}
              strokeWidth={14}
              centerTitle="100%"
              centerSubtitle="Intake"
            />
          </div>
        </div>

      </div>

      {/* Clean Table: Branch Performance (SellPilot Style) */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Facility Directory</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Branch Performance Summary</div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('branches')} style={{ fontSize: '11.5px' }}>
            Manage Branches
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Branch Campus</th>
                <th>Code</th>
                <th>Active Students</th>
                <th>Staff</th>
                <th>Exam Labs</th>
                <th>Monthly Intake</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {INSTITUTE_BRANCHES.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Lead: {b.manager}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#0F172A', background: 'var(--bg-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                      {b.code}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '700', color: '#0F172A' }}>{b.students}</span>
                  </td>
                  <td>{b.staff} Teachers</td>
                  <td>{b.rooms} Suites</td>
                  <td>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.revenue}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('branches')}
                      style={{ padding: '3px 8px', fontSize: '11.5px' }}
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
