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
  AlertCircle, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { CURRENT_USERS, STUDENT_RESULTS } from '../../data/mockData';

export default function StudentDashboard({ onNavigate }) {
  const user = CURRENT_USERS.student;
  const recentMock = STUDENT_RESULTS[0];
  const pendingMock = STUDENT_RESULTS[3];

  const [activeTooltip, setActiveTooltip] = useState(null);

  // Band chart data
  const progressMonths = [
    { month: 'Jun', band: 6.0 },
    { month: 'Jul', band: 6.5 },
    { month: 'Aug', band: 7.0 },
    { month: 'Sep', band: 7.0 },
    { month: 'Oct', band: 7.5 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Welcome back, {user.name} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>
            Enrolled in <strong style={{ color: 'var(--primary-red)' }}>{user.batch}</strong> • Official Exam in <strong>{user.daysLeft} days</strong> ({user.examDate})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => onNavigate('speaking-booking')}>
            <Calendar size={15} />
            <span>Book Speaking Slot</span>
          </button>
          <button className="btn btn-primary" onClick={() => onNavigate('test-library')}>
            <BookOpen size={15} />
            <span>Take Practice Mock</span>
          </button>
        </div>
      </div>

      {/* Pending Result State Alert Banner (As specified in requirement) */}
      <div 
        className="edu-card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', 
          borderColor: '#FDE68A',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            background: '#F59E0B', 
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#92400E' }}>
              Pending Result: {pendingMock.title}
            </div>
            <div style={{ fontSize: '12px', color: '#B45309' }}>
              Listening & Reading evaluated (Band 8.5/8.0). Writing essay under examiner review. Speaking slot: Tomorrow 2:30 PM.
            </div>
          </div>
        </div>
        <button 
          className="btn btn-sm" 
          style={{ background: '#FFFFFF', color: '#92400E', border: '1px solid #FDE68A', fontWeight: '600' }}
          onClick={() => onNavigate('my-results')}
        >
          Track Evaluation Status
        </button>
      </div>

      {/* 4 Section Band Cards (Panacea & Lurni Inspired) */}
      <div className="stats-grid">
        {/* Listening Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('listening-detail')}>
          <div className="stat-info">
            <span className="stat-label">Listening Band</span>
            <span className="stat-value">{recentMock.listening}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> 37/40 Correct (92%)
            </span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
            <Headphones size={22} />
          </div>
        </div>

        {/* Reading Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('reading-detail')}>
          <div className="stat-info">
            <span className="stat-label">Reading Band</span>
            <span className="stat-value">{recentMock.reading}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> 35/40 Correct (88%)
            </span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            <BookOpen size={22} />
          </div>
        </div>

        {/* Writing Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('writing-detail')}>
          <div className="stat-info">
            <span className="stat-label">Writing Band</span>
            <span className="stat-value">{recentMock.writing}</span>
            <span className="stat-trend down">
              Needs +0.5 to Goal
            </span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--primary-red-subtle)', color: 'var(--primary-red)' }}>
            <PenTool size={22} />
          </div>
        </div>

        {/* Speaking Card */}
        <div className="edu-card stat-card edu-card-interactive" onClick={() => onNavigate('speaking-detail')}>
          <div className="stat-info">
            <span className="stat-label">Speaking Band</span>
            <span className="stat-value">{recentMock.speaking}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> Examiner Certified
            </span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}>
            <Mic size={22} />
          </div>
        </div>
      </div>

      {/* Main Grid: Band Gauge + Progress Chart + Urgent Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', gap: '20px' }}>
        
        {/* Overall Band Gauge Card (Panacea Donut Inspired) */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Overall Band Score</h3>
            <span className="badge badge-red">Latest Mock</span>
          </div>

          <div className="band-gauge-wrapper" style={{ margin: '14px 0' }}>
            <svg width="180" height="180" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="10"
              />
              {/* Active Progress Ring (7.5 out of 9.0 = 83.3%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--primary-red)"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 7.5 / 9.0)}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="band-gauge-score">
              <div className="num">7.5</div>
              <div className="sub">Target: {user.targetBand}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '10px', width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CEFR LEVEL</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>C1 Advanced</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-color)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>GLOBAL RANK</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-green)' }}>Top 8%</div>
            </div>
          </div>

          <button 
            className="btn btn-secondary btn-sm" 
            style={{ width: '100%', marginTop: '20px' }}
            onClick={() => onNavigate('progress-analytics')}
          >
            <span>View Full Breakdown</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Progress Trend Bar Chart (Lurni & Sarah Inspired) */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Band Score Progression</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Consistent upward trajectory across 5 official mock examinations</p>
            </div>
            <span className="badge badge-green">+1.5 Band Growth</span>
          </div>

          {/* Custom SVG Bar Chart */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '20px 10px 10px', height: '180px', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
            {progressMonths.map((item, idx) => {
              const heightPercent = (item.band / 9.0) * 100;
              const isLatest = idx === progressMonths.length - 1;
              return (
                <div 
                  key={idx} 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48px', position: 'relative' }}
                  onMouseEnter={() => setActiveTooltip(idx)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {/* Tooltip on hover */}
                  {activeTooltip === idx && (
                    <div style={{
                      position: 'absolute',
                      bottom: `${heightPercent + 14}%`,
                      background: '#0F172A',
                      color: '#FFF',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      zIndex: 10
                    }}>
                      Band {item.band} ({item.month} '26)
                    </div>
                  )}

                  {/* Vertical bar */}
                  <div style={{
                    width: '32px',
                    height: `${heightPercent}%`,
                    background: isLatest ? 'var(--primary-red)' : '#CBD5E1',
                    borderRadius: '8px 8px 4px 4px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }} />
                  <span style={{ fontSize: '12px', fontWeight: isLatest ? '700' : '500', color: isLatest ? 'var(--primary-red)' : 'var(--text-muted)', marginTop: '8px' }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: 'var(--primary-red)', borderRadius: '2px' }} />
                Current Active Band: 7.5
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: '#CBD5E1', borderRadius: '2px' }} />
                Historical Mocks
              </span>
            </div>
            <button className="btn btn-subtle btn-sm" onClick={() => onNavigate('answer-review')}>
              Answer Key Audit
            </button>
          </div>
        </div>

        {/* Actionable To-Do & Speaking Schedule (Sarah Setter Inspired) */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Actionable To-Dos</h3>
            <span className="badge badge-amber">3 Pending</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div 
              style={{ padding: '12px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => onNavigate('writing-detail')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary-red)', textTransform: 'uppercase' }}>High Priority</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Due Today</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>
                Review AI Vocabulary Rewrites for Task 2
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Fix collocations in paragraph 2 to reach Band 7.5.
              </p>
            </div>

            <div 
              style={{ padding: '12px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => onNavigate('speaking-booking')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-blue)', textTransform: 'uppercase' }}>Speaking</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tomorrow</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>
                1-on-1 Speaking Slot with Dr. Sarah
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Room 302 / Zoom link available 15m prior.
              </p>
            </div>

            <div 
              style={{ padding: '12px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => onNavigate('answer-review')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-green)', textTransform: 'uppercase' }}>Mistake Log</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>3 Questions</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>
                Re-attempt True/False/Not Given in Passage 3
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
