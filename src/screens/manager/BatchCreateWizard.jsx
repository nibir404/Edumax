import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Save, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { INSTITUTE_BRANCHES, STAFF_MEMBERS } from '../../data/mockData';

export default function BatchCreateWizard({ onBack, onComplete }) {
  const [formData, setFormData] = useState({
    name: 'IELTS Academic Masterclass B-16',
    branch: INSTITUTE_BRANCHES[0].name,
    startDate: '2026-11-01',
    endDate: '2026-12-28',
    schedule: 'Mon, Wed, Fri (6:30 PM - 8:30 PM)',
    assignedTeacher: STAFF_MEMBERS[0].name,
    capacity: 30,
    room: 'Gulshan Lab 304'
  });
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCreated(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Cancel & Back</span>
        </button>
        <span className="badge badge-red">Batch Provisioning Wizard</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Create New Student Cohort / Batch
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Assign teachers, set physical classroom capacity, and configure enrollment schedules.
        </p>
      </div>

      {isCreated ? (
        <div className="edu-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={30} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Cohort Successfully Created!</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <strong>{formData.name}</strong> is now open for enrollment at <strong>{formData.branch}</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="edu-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label className="form-label">Cohort Designation Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Campus Branch</label>
                <select 
                  className="form-select"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                >
                  {INSTITUTE_BRANCHES.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Dedicated Classroom / Lab</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Term Start Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Term End Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Class Schedule & Time</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Maximum Student Capacity</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  min={5}
                  max={60}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Lead IELTS Examiner / Faculty</label>
              <select 
                className="form-select"
                value={formData.assignedTeacher}
                onChange={(e) => setFormData({ ...formData, assignedTeacher: e.target.value })}
              >
                {STAFF_MEMBERS.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.role})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={15} />
                <span>Launch & Publish Cohort</span>
              </button>
            </div>

          </div>
        </form>
      )}

    </div>
  );
}
