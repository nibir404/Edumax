import React from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  Award, 
  ArrowRight, 
  Send,
  Plus
} from 'lucide-react';
import { TEACHER_BATCHES } from '../../data/mockData';

export default function TeacherBatches({ onSelectBatch, onAssignTest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            My Assigned Cohorts & Batches
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Active student rosters, session schedules, and mock test completion rates.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onAssignTest}>
          <Send size={15} />
          <span>Assign Mock Paper</span>
        </button>
      </div>

      {/* Batches Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {TEACHER_BATCHES.map((batch) => (
          <div key={batch.id} className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="badge badge-slate">{batch.id}</span>
                <span className="badge badge-red">Avg Band {batch.avgBand}</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                {batch.name}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <div>👥 <strong>Enrollment:</strong> {batch.studentsCount} Students</div>
                <div>🗓 <strong>Schedule:</strong> {batch.schedule}</div>
                <div>📍 <strong>Assigned Space:</strong> {batch.room}</div>
                <div>⏱ <strong>Next Session:</strong> {batch.nextSession}</div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Curriculum Completion</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{batch.progress}%</strong>
                </div>
                <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${batch.progress}%`, height: '100%', background: 'var(--primary-red)' }} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ flex: 1 }}
                onClick={() => onSelectBatch(batch)}
              >
                <span>Batch Roster</span>
                <ArrowRight size={13} />
              </button>
              <button 
                className="btn btn-subtle btn-sm"
                onClick={onAssignTest}
              >
                Assign Exam
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
