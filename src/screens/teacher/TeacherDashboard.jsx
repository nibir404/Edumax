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
  AlertCircle,
  FileCheck
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Examiner Console • Welcome, {teacher.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            {teacher.role} • {teacher.branch} • <strong>{teacher.pendingEvaluations}</strong> Submissions awaiting grading
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" onClick={() => onNavigate('speaking-interview')}>
            <Mic size={15} />
            <span>Launch Live Speaking Exam Console</span>
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('assign-test')}>
            <Send size={15} />
            <span>Assign Test to Batch</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Widgets (Lurni & Panacea Style) */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Assigned Batches</span>
            <span className="stat-value">{teacher.assignedBatches}</span>
            <span className="stat-trend up">85 Total Students</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Pending Essay Evaluations</span>
            <span className="stat-value">{teacher.pendingEvaluations}</span>
            <span className="stat-trend down" style={{ color: '#D97706' }}>3 Due Today</span>
          </div>
          <div className="stat-icon-box" style={{ background: '#FEF3C7', color: '#B45309' }}>
            <PenTool size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Today's Speaking Slots</span>
            <span className="stat-value">{teacher.todayInterviews}</span>
            <span className="stat-trend up">1 Completed</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}>
            <Mic size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Average Cohort Band</span>
            <span className="stat-value">7.2</span>
            <span className="stat-trend up">+0.4 This Month</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            <Award size={22} />
          </div>
        </div>
      </div>

      {/* Main Grid: Batches Progress + Today's Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        
        {/* Batches Overview Card */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Active Cohorts Overview</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Progress and mock readiness across your assigned classes</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('my-batches')}>
              View All Batches
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {TEACHER_BATCHES.map((batch) => (
              <div 
                key={batch.id} 
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '1px solid var(--border-color)', 
                  background: '#F8FAFC',
                  cursor: 'pointer'
                }}
                onClick={() => onNavigate('batch-detail')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{batch.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {batch.studentsCount} Students • {batch.schedule} • Room: {batch.room}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-red">Avg Band {batch.avgBand}</span>
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    <span>Syllabus Completion</span>
                    <strong>{batch.progress}%</strong>
                  </div>
                  <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${batch.progress}%`, height: '100%', background: 'var(--primary-red)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Speaking Schedule (Panacea Appointment Style) */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Today's Speaking Schedule</h3>
            <span className="badge badge-purple">4 Scheduled</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todayInterviews.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '12px 14px', 
                  borderRadius: '10px', 
                  background: item.status === 'Completed' ? '#F1F5F9' : '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {item.student}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    ⏱ {item.time} • {item.room}
                  </div>
                </div>

                <div>
                  {item.status === 'Completed' ? (
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} /> Done
                    </span>
                  ) : (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onNavigate('speaking-interview')}
                    >
                      <Mic size={12} /> Start
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
