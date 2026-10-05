import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Target, 
  Calendar, 
  Lock, 
  ShieldCheck, 
  Save,
  CheckCircle2
} from 'lucide-react';
import { CURRENT_USERS } from '../../data/mockData';

export default function StudentProfile() {
  const [user, setUser] = useState(CURRENT_USERS.student);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Student Profile & Target Configuration
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Manage your candidate credentials, passport registration details, and target band scores.
        </p>
      </div>

      {saved && (
        <div style={{ padding: '12px 18px', background: 'var(--accent-green-light)', color: '#065F46', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> Changes successfully saved to your Edumax profile!
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="edu-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Personal Information</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label">Full Candidate Name (as on Passport)</label>
            <input 
              type="text" 
              className="form-input" 
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Official Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Overall Band Score</label>
            <select 
              className="form-select"
              value={user.targetBand}
              onChange={(e) => setUser({ ...user, targetBand: parseFloat(e.target.value) })}
            >
              <option value="6.5">Band 6.5 (Standard University Entry)</option>
              <option value="7.0">Band 7.0 (Postgraduate / Direct Nursing)</option>
              <option value="7.5">Band 7.5 (Top Tier Universities)</option>
              <option value="8.0">Band 8.0 (Ivy League / Oxford / Cambridge)</option>
              <option value="8.5">Band 8.5 (Mastery Tier)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Upcoming Official Exam Date</label>
            <input 
              type="date" 
              className="form-input" 
              value={user.examDate}
              onChange={(e) => setUser({ ...user, examDate: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Assigned Institute Branch</label>
            <input 
              type="text" 
              className="form-input" 
              value={user.branch} 
              disabled 
              style={{ background: '#F1F5F9', color: '#64748B' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Enrolled Cohort</label>
            <input 
              type="text" 
              className="form-input" 
              value={user.batch} 
              disabled 
              style={{ background: '#F1F5F9', color: '#64748B' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={15} />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>

      {/* Security & Password */}
      <div className="edu-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Security & Credentials</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input type="password" placeholder="••••••••••••" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input type="password" placeholder="Minimum 8 characters" className="form-input" />
          </div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => alert("Password updated successfully.")}>
            Update Password
          </button>
        </div>
      </div>

    </div>
  );
}
