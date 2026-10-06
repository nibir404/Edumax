import React, { useState } from 'react';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  Calendar, 
  ArrowUpRight, 
  ChevronRight 
} from 'lucide-react';
import { CURRENT_USERS, STUDENT_RESULTS } from '../../data/mockData';
import Sparkline from '../../components/charts/Sparkline';
import SpiderChart from '../../components/charts/SpiderChart';
import TrackBarChart from '../../components/charts/TrackBarChart';
import RoundCirclePie from '../../components/charts/RoundCirclePie';
import DonutPieChart from '../../components/charts/DonutPieChart';

export default function StudentDashboard({ onNavigate }) {
  const user = CURRENT_USERS.student;
  const recentMock = STUDENT_RESULTS[0];
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');

  // Sparkline historical data series for 4 skills
  const sparkData = {
    listening: [6.5, 7.0, 7.5, 8.0, 8.5],
    reading: [6.5, 6.5, 7.0, 7.5, 8.0],
    writing: [6.0, 6.0, 6.5, 6.5, 7.0],
    speaking: [6.0, 6.5, 7.0, 7.0, 7.5]
  };

  const upcomingSessions = [
    { id: 'SES-901', title: '1-on-1 Speaking Mock with Dr. Sarah', type: 'Speaking', date: 'Tomorrow, 2:30 PM', room: 'Lab 302', status: 'Scheduled' },
    { id: 'SES-902', title: 'Cambridge IELTS 19 Full Academic Mock', type: 'Full Mock', date: 'Oct 12, 10:00 AM', room: 'Exam Hall A', status: 'Scheduled' },
    { id: 'SES-899', title: 'Task 2 Essay: Urbanization Argument', type: 'Writing Review', date: 'Yesterday', room: 'Online Portal', status: 'In Review' },
    { id: 'SES-898', title: 'Academic Reading Diagnostic Paper 4', type: 'Reading', date: 'Oct 03, 2025', room: 'Computer Lab 1', status: 'Evaluated' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Header - Modulix Style */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px', margin: 0 }}>
            Welcome, {user.name} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '3px', margin: 0 }}>
            Cohort: <strong style={{ color: 'var(--text-primary)' }}>{user.batch}</strong> • Target: <strong>Band {user.targetBand}</strong> • Official Exam in {user.daysLeft} days
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('speaking-booking')}>
            <Calendar size={14} />
            <span>Book Speaking Slot</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('test-library')}>
            <BookOpen size={14} />
            <span>Take Practice Mock</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards with Inline SVG Sparklines (SellPilot / Modulix Style) */}
      <div className="stats-grid">
        
        {/* Listening Card */}
        <div 
          className="edu-card stat-card edu-card-interactive" 
          onClick={() => onNavigate('listening-detail')}
          style={{ padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(200, 30, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Headphones size={15} color="var(--primary-red)" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Listening</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {recentMock.listening}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>37/40 (92%)</span>
            </div>
          </div>
          <Sparkline data={sparkData.listening} color="var(--status-success-text)" width={74} height={32} />
        </div>

        {/* Reading Card */}
        <div 
          className="edu-card stat-card edu-card-interactive" 
          onClick={() => onNavigate('reading-detail')}
          style={{ padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={15} color="#0F172A" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Reading</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {recentMock.reading}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>35/40 (88%)</span>
            </div>
          </div>
          <Sparkline data={sparkData.reading} color="#0F172A" width={74} height={32} />
        </div>

        {/* Writing Card */}
        <div 
          className="edu-card stat-card edu-card-interactive" 
          onClick={() => onNavigate('writing-detail')}
          style={{ padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(200, 30, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PenTool size={15} color="var(--primary-red)" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Writing</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {recentMock.writing}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--primary-red)', fontWeight: '600' }}>
              Needs +0.5 to Goal
            </div>
          </div>
          <Sparkline data={sparkData.writing} color="var(--primary-red)" width={74} height={32} />
        </div>

        {/* Speaking Card */}
        <div 
          className="edu-card stat-card edu-card-interactive" 
          onClick={() => onNavigate('speaking-detail')}
          style={{ padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={15} color="#10B981" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Speaking</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {recentMock.speaking}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>Certified Band</span>
            </div>
          </div>
          <Sparkline data={sparkData.speaking} color="#10B981" width={74} height={32} />
        </div>
      </div>

      {/* Visual Analytics Row 1: Modulix Bar Chart + Spider/Radar Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Left: Overview Track Bar Chart (Modulix Inspired) */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Historical Calibration</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Band 7.5</span>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '700', background: '#F0FDF4', padding: '2px 8px', borderRadius: '999px' }}>
                  +1.5 Growth
                </span>
              </div>
            </div>

            {/* Timeframe selector */}
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-subtle)', padding: '3px', borderRadius: '8px' }}>
              {['6M', '1Y', 'All'].map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTimeframe(t)}
                  style={{
                    background: selectedTimeframe === t ? '#FFFFFF' : 'none',
                    border: 'none',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: selectedTimeframe === t ? '700' : '500',
                    color: selectedTimeframe === t ? '#0F172A' : '#64748B',
                    boxShadow: selectedTimeframe === t ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Track Bar Chart */}
          <TrackBarChart />
        </div>

        {/* Right: 4-Skill Spider / Radar Chart (Specifically Requested) */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Skill Balance</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Competency Radar</div>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('progress-analytics')}
              style={{ padding: '4px 10px', fontSize: '11.5px' }}
            >
              <span>Full Analytics</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Spider / Radar Chart Visual */}
          <SpiderChart 
            skills={[
              { label: 'Listening', current: recentMock.listening, target: user.targetBand },
              { label: 'Reading', current: recentMock.reading, target: user.targetBand },
              { label: 'Writing', current: recentMock.writing, target: user.targetBand },
              { label: 'Speaking', current: recentMock.speaking, target: user.targetBand }
            ]}
            size={220}
          />
        </div>
      </div>

      {/* Visual Analytics Row 2: Donut Question Distribution + Radial Gauge + Upcoming Table */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Question Type Accuracy Donut Pie */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Reading & Listening</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Accuracy by Question Type</div>
          </div>
          
          <DonutPieChart 
            segments={[
              { label: 'True / False / NG', value: 14, color: '#C81E2E' },
              { label: 'Multiple Choice', value: 11, color: '#0F172A' },
              { label: 'Matching Headings', value: 8, color: '#10B981' },
              { label: 'Sentence Completion', value: 7, color: '#94A3B8' }
            ]}
            size={160}
            strokeWidth={14}
            centerTitle="40"
            centerSubtitle="Items"
          />
        </div>

        {/* Radial Target Attainment Gauge (Round Circle Pie) */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Target Milestone</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Official Exam Readiness</div>
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#10B981', background: '#F0FDF4', padding: '2px 8px', borderRadius: '999px' }}>
              Top 8%
            </span>
          </div>

          <RoundCirclePie value={recentMock.overallBand} target={user.targetBand} size={155} strokeWidth={11} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CEFR Level</div>
              <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>C1 Advanced</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-color)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mocks Completed</div>
              <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>5 of 8</div>
            </div>
          </div>
        </div>

        {/* Clean Sessions Table (Modulix Style) */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Schedule</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Upcoming Mock Sessions</div>
            </div>
            <button 
              className="btn btn-subtle btn-sm"
              onClick={() => onNavigate('my-results')}
              style={{ fontSize: '11.5px' }}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {upcomingSessions.map((ses) => (
              <div 
                key={ses.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  fontSize: '12.5px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ses.status === 'Scheduled' ? '#10B981' : 'var(--primary-red)' }} />
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{ses.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ses.date} • {ses.room}</div>
                  </div>
                </div>
                <span 
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: ses.status === 'Scheduled' ? '#F0FDF4' : ses.status === 'Evaluated' ? '#EEF2FF' : '#FEF3C7',
                    color: ses.status === 'Scheduled' ? '#166534' : ses.status === 'Evaluated' ? '#3730A3' : '#92400E'
                  }}
                >
                  {ses.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
