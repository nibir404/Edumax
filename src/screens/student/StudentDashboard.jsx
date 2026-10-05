import React, { useState } from 'react';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { CURRENT_USERS, STUDENT_RESULTS } from '../../data/mockData';

export default function StudentDashboard({ onNavigate }) {
  const user = CURRENT_USERS.student;
  const recentMock = STUDENT_RESULTS[0];
  const pendingMock = STUDENT_RESULTS[3];

  const [activeTooltip, setActiveTooltip] = useState(null);

  // Band progression historical series
  const progressMonths = [
    { month: 'Jun', band: 6.0 },
    { month: 'Jul', band: 6.5 },
    { month: 'Aug', band: 7.0 },
    { month: 'Sep', band: 7.0 },
    { month: 'Oct', band: 7.5 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Welcome Header - Minimal & Clean */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            Welcome back, {user.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            Cohort: <strong style={{ color: 'var(--text-primary)' }}>{user.batch}</strong> • Official Exam: <strong>{user.daysLeft} days remaining</strong> ({user.examDate})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
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

      {/* Pending Result State Banner - Clean Minimal Card */}
      <div 
        className="edu-card" 
        style={{ 
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'var(--bg-card)',
          borderLeft: '3px solid var(--primary-red)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="stat-icon-box" style={{ width: '36px', height: '36px' }}>
            <Clock size={16} color="var(--primary-red)" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
              In-Progress Evaluation: {pendingMock.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '1px' }}>
              Listening & Reading evaluated (Band 8.5/8.0). Writing essay under examiner review. Speaking slot: Tomorrow 2:30 PM.
            </div>
          </div>
        </div>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onNavigate('my-results')}
        >
          Track Evaluation Status
        </button>
      </div>

      {/* 4 Section Band Cards - Unified Design System */}
      <div className="stats-grid">
        {/* Listening Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('listening-detail')}>
          <div className="stat-info">
            <span className="stat-label">Listening Band</span>
            <span className="stat-value">{recentMock.listening}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={13} /> 37/40 Correct (92%)
            </span>
          </div>
          <div className="stat-icon-box">
            <Headphones size={20} />
          </div>
        </div>

        {/* Reading Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('reading-detail')}>
          <div className="stat-info">
            <span className="stat-label">Reading Band</span>
            <span className="stat-value">{recentMock.reading}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={13} /> 35/40 Correct (88%)
            </span>
          </div>
          <div className="stat-icon-box">
            <BookOpen size={20} />
          </div>
        </div>

        {/* Writing Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('writing-detail')}>
          <div className="stat-info">
            <span className="stat-label">Writing Band</span>
            <span className="stat-value">{recentMock.writing}</span>
            <span className="stat-trend" style={{ color: 'var(--primary-red)' }}>
              Needs +0.5 to Goal
            </span>
          </div>
          <div className="stat-icon-box">
            <PenTool size={20} />
          </div>
        </div>

        {/* Speaking Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('speaking-detail')}>
          <div className="stat-info">
            <span className="stat-label">Speaking Band</span>
            <span className="stat-value">{recentMock.speaking}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={13} /> Certified Band
            </span>
          </div>
          <div className="stat-icon-box">
            <Mic size={20} />
          </div>
        </div>
      </div>

      {/* Main Grid: Band Gauge + Progression Chart + Urgent Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 320px', gap: '18px' }}>
        
        {/* Overall Band Gauge Card */}
        <div className="edu-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Overall Band Score</h3>
            <span className="badge badge-red">Latest Mock</span>
          </div>

          <div className="band-gauge-wrapper" style={{ margin: '10px 0' }}>
            <svg width="160" height="160" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--bg-subtle)"
                strokeWidth="8"
              />
              {/* Active Progress Ring (7.5 out of 9.0) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--primary-red)"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 7.5 / 9.0)}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            <div className="band-gauge-score">
              <div className="num">7.5</div>
              <div className="sub">Goal: {user.targetBand}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px', width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>CEFR LEVEL</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>C1 Advanced</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-color)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>COHORT RANK</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--status-success-text)' }}>Top 8%</div>
            </div>
          </div>

          <button 
            className="btn btn-secondary btn-sm" 
            style={{ width: '100%', marginTop: '18px' }}
            onClick={() => onNavigate('progress-analytics')}
          >
            <span>View Full Breakdown</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Progress Trend Bar Chart */}
        <div className="edu-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Band Score Progression</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Historical calibration across 5 official mock examinations</p>
            </div>
            <span className="badge badge-success">+1.5 Band Growth</span>
          </div>

          {/* Custom SVG Bar Chart */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '16px 8px 8px', height: '170px', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
            {progressMonths.map((item, idx) => {
              const heightPercent = (item.band / 9.0) * 100;
              const isLatest = idx === progressMonths.length - 1;
              return (
                <div 
                  key={idx} 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '44px', position: 'relative' }}
                  onMouseEnter={() => setActiveTooltip(idx)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {/* Tooltip on hover */}
                  {activeTooltip === idx && (
                    <div style={{
                      position: 'absolute',
                      bottom: `${heightPercent + 12}%`,
                      background: 'var(--brand-dark)',
                      color: '#FFF',
                      padding: '3px 7px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      zIndex: 10
                    }}>
                      Band {item.band} ({item.month})
                    </div>
                  )}

                  {/* Vertical bar */}
                  <div style={{
                    width: '28px',
                    height: `${heightPercent}%`,
                    background: isLatest ? 'var(--primary-red)' : 'var(--border-color)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }} />
                  <span style={{ fontSize: '11.5px', fontWeight: isLatest ? '700' : '500', color: isLatest ? 'var(--primary-red)' : 'var(--text-muted)', marginTop: '6px' }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
            <div style={{ display: 'flex', gap: '14px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--primary-red)', borderRadius: '2px' }} />
                Current Band: 7.5
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--border-color)', borderRadius: '2px' }} />
                Historical Mocks
              </span>
            </div>
            <button className="btn btn-subtle btn-sm" onClick={() => onNavigate('answer-review')}>
              Answer Key Audit
            </button>
          </div>
        </div>

        {/* Actionable To-Do & Speaking Schedule */}
        <div className="edu-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Action Items</h3>
            <span className="badge badge-warning">3 Pending</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div 
              style={{ padding: '11px 13px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => onNavigate('writing-detail')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: 'var(--primary-red)', textTransform: 'uppercase' }}>High Priority</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Due Today</span>
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '3px' }}>
                Review AI Vocabulary Rewrites for Task 2
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Collocation improvements to reach Band 7.5.
              </p>
            </div>

            <div 
              style={{ padding: '11px 13px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => onNavigate('speaking-booking')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: 'var(--brand-dark)', textTransform: 'uppercase' }}>Speaking</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tomorrow</span>
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '3px' }}>
                1-on-1 Speaking Slot with Dr. Sarah
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Room 302 / Zoom link active 15m prior.
              </p>
            </div>

            <div 
              style={{ padding: '11px 13px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => onNavigate('answer-review')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: 'var(--brand-dark)', textTransform: 'uppercase' }}>Mistake Log</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>3 Questions</span>
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '3px' }}>
                Re-attempt True/False/Not Given in Passage 3
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
