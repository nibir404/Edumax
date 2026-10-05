import React from 'react';
import { 
  Users, 
  Clock, 
  Award, 
  Mic, 
  PenTool, 
  Send, 
  ChevronRight, 
  CheckCircle2, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { CURRENT_USERS, TEACHER_BATCHES } from '../../data/mockData';

export default function TeacherDashboard({ onNavigate }) {
  const teacher = CURRENT_USERS.teacher;

  const todayInterviews = [
    { time: '10:00 AM', student: 'Nafis Ahmed', type: 'Part 1, 2, 3 Full Mock', room: 'Lab 302', status: 'Completed' },
    { time: '11:30 AM', student: 'Tasnia Faruque', type: 'Speaking Diagnostic', room: 'Zoom Room 1', status: 'Upcoming' },
    { time: '02:30 PM', student: 'Arif Chowdhury', type: 'Part 2 Cue Card Intensive', room: 'Lab 302', status: 'Upcoming' },
    { time: '04:00 PM', student: 'Sadia Rahman', type: 'Final Official Simulation', room: 'Lab 304', status: 'Upcoming' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            Examiner Console
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            {teacher.name} • {teacher.branch} • <strong>{teacher.pendingEvaluations}</strong> Submissions awaiting grading
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('speaking-interview')}>
            <Mic size={14} />
            <span>Launch Speaking Console</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('assign-test')}>
            <Send size={14} />
            <span>Assign Test Paper</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Widgets - Unified Design Tokens */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Assigned Batches</span>
            <span className="stat-value">{teacher.assignedBatches}</span>
            <span className="stat-trend up">85 Total Students</span>
          </div>
          <div className="stat-icon-box">
            <Users size={20} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Pending Essay Reviews</span>
            <span className="stat-value">{teacher.pendingEvaluations}</span>
            <span className="stat-trend" style={{ color: 'var(--status-warning-text)' }}>3 Due Today</span>
          </div>
          <div className="stat-icon-box">
            <PenTool size={20} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Today's Speaking Slots</span>
            <span className="stat-value">{teacher.todayInterviews}</span>
            <span className="stat-trend up">1 Completed</span>
          </div>
          <div className="stat-icon-box">
            <Mic size={20} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Average Cohort Band</span>
            <span className="stat-value">7.2</span>
            <span className="stat-trend up">+0.4 This Month</span>
          </div>
          <div className="stat-icon-box">
            <Award size={20} />
          </div>
        </div>
      </div>

      {/* Main Grid: Batches Progress + Today's Schedule (Responsive) */}
      <div className="teacher-main-grid">
        
        {/* Batches Overview Card */}
        <div className="edu-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-primary)' }}>Active Cohorts Overview</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Progress and mock readiness across assigned classes</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('my-batches')}>
              View All Batches
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TEACHER_BATCHES.map((batch) => (
              <div 
                key={batch.id} 
                style={{ 
                  padding: '14px 16px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-color)', 
                  background: 'var(--bg-subtle)',
                  cursor: 'pointer',
                  transition: 'border-color 0.12s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                onClick={() => onNavigate('batch-detail')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>{batch.name}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {batch.studentsCount} Students • {batch.schedule} • Room: {batch.room}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-red">Avg Band {batch.avgBand}</span>
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    <span>Syllabus Completion</span>
                    <strong>{batch.progress}%</strong>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${batch.progress}%`, height: '100%', background: 'var(--primary-red)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Speaking Schedule */}
        <div className="edu-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-primary)' }}>Today's Speaking Schedule</h3>
            <span className="badge">4 Scheduled</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todayInterviews.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '11px 13px', 
                  borderRadius: 'var(--radius-md)', 
                  background: item.status === 'Completed' ? 'var(--bg-subtle)' : 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {item.student}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {item.time} • {item.room}
                  </div>
                </div>

                <div>
                  {item.status === 'Completed' ? (
                    <span className="badge badge-success">
                      <CheckCircle2 size={11} /> Done
                    </span>
                  ) : (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onNavigate('speaking-interview')}
                    >
                      <Mic size={11} /> Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
