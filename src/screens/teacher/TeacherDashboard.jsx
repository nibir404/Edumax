import React from 'react';
import { 
  Users, 
  Award, 
  Mic, 
  PenTool, 
  Send, 
  ArrowUpRight 
} from 'lucide-react';
import { CURRENT_USERS, TEACHER_BATCHES } from '../../data/mockData';
import Sparkline from '../../components/charts/Sparkline';
import DonutPieChart from '../../components/charts/DonutPieChart';

export default function TeacherDashboard({ onNavigate }) {
  const teacher = CURRENT_USERS.teacher;

  const todayInterviews = [
    { time: '10:00 AM', student: 'Nafis Ahmed', type: 'Full Mock Part 1-3', room: 'Lab 302', status: 'Completed' },
    { time: '11:30 AM', student: 'Tasnia Faruque', type: 'Speaking Diagnostic', room: 'Zoom Room 1', status: 'Upcoming' },
    { time: '02:30 PM', student: 'Arif Chowdhury', type: 'Part 2 Cue Card Intensive', room: 'Lab 302', status: 'Upcoming' },
    { time: '04:00 PM', student: 'Sadia Rahman', type: 'Official Simulation', room: 'Lab 304', status: 'Upcoming' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px', margin: 0 }}>
            Examiner Console
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '3px', margin: 0 }}>
            {teacher.name} • {teacher.branch} • <strong>{teacher.pendingEvaluations} Submissions</strong> awaiting grading
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

      {/* Top 4 Stat Widgets with Inline SVG Sparklines */}
      <div className="stats-grid">
        
        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={15} color="#0F172A" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Assigned Cohorts</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {teacher.assignedBatches}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              85 Enrolled Candidates
            </div>
          </div>
          <Sparkline data={[3, 3, 4, 4, 4]} color="#0F172A" width={74} height={32} />
        </div>

        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(200, 30, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PenTool size={15} color="var(--primary-red)" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Pending Essays</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {teacher.pendingEvaluations}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--primary-red)', fontWeight: '600' }}>
              3 Due Today
            </div>
          </div>
          <Sparkline data={[12, 10, 14, 11, 8]} color="var(--primary-red)" width={74} height={32} isPositive={false} />
        </div>

        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={15} color="#10B981" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Speaking Slots</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {teacher.todayInterviews}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600' }}>
              1 Completed Today
            </div>
          </div>
          <Sparkline data={[2, 3, 5, 4, 6]} color="#10B981" width={74} height={32} />
        </div>

        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(200, 30, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={15} color="var(--primary-red)" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Average Band</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              7.2
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+0.4 This Month</span>
            </div>
          </div>
          <Sparkline data={[6.6, 6.8, 7.0, 7.1, 7.2]} color="var(--status-success-text)" width={74} height={32} />
        </div>

      </div>

      {/* Main Grid: Batches Progress + Student Distribution Donut + Today's Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Batches Overview Card */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Assigned Cohorts</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Batch Progress & Syllabus</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('my-batches')} style={{ fontSize: '11.5px' }}>
              View Batches
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TEACHER_BATCHES.map((batch) => (
              <div 
                key={batch.id} 
                style={{ 
                  padding: '12px 14px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border-color)', 
                  background: 'var(--bg-subtle)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                onClick={() => onNavigate('batch-detail')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{batch.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {batch.studentsCount} Students • {batch.schedule} • Room: {batch.room}
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary-red)', background: 'var(--primary-red-subtle)', padding: '2px 8px', borderRadius: '999px' }}>
                    Band {batch.avgBand}
                  </span>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    <span>Syllabus Completion</span>
                    <strong style={{ color: '#0F172A' }}>{batch.progress}%</strong>
                  </div>
                  <div style={{ height: '5px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${batch.progress}%`, height: '100%', background: 'var(--primary-red)', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Band Distribution Donut Pie Chart */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Cohort Analytics</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Student Band Distribution</div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutPieChart 
              segments={[
                { label: 'Band 8.0+ (Advanced)', value: 19, color: '#10B981' },
                { label: 'Band 7.0-7.5 (Competent)', value: 46, color: '#0F172A' },
                { label: 'Band 6.0-6.5 (Modest)', value: 15, color: '#C81E2E' },
                { label: 'Below 6.0 (Developing)', value: 5, color: '#94A3B8' }
              ]}
              size={170}
              strokeWidth={14}
              centerTitle="85"
              centerSubtitle="Candidates"
            />
          </div>
        </div>

        {/* Today's Speaking Schedule */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Oral Interview Queue</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Today's Speaking Schedule</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)' }}>4 Slots</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todayInterviews.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '11px 13px', 
                  borderRadius: '10px', 
                  background: item.status === 'Completed' ? 'var(--bg-subtle)' : '#FFFFFF',
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
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.type} • {item.room}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#0F172A' }}>{item.time}</div>
                  <span 
                    style={{
                      fontSize: '10.5px',
                      fontWeight: '600',
                      padding: '1px 6px',
                      borderRadius: '999px',
                      background: item.status === 'Completed' ? '#F0FDF4' : '#EEF2FF',
                      color: item.status === 'Completed' ? '#166534' : '#3730A3',
                      display: 'inline-block',
                      marginTop: '3px'
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
