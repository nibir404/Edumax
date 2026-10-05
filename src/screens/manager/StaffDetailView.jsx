import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Mail, 
  Save, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { STAFF_MEMBERS } from '../../data/mockData';

export default function StaffDetailView({ onBack }) {
  const staff = STAFF_MEMBERS[0];
  const [permissions, setPermissions] = useState({
    conductSpeaking: true,
    gradeWriting: true,
    publishResults: true,
    authorQuestions: true,
    manageBatches: true,
    accessFinancials: false
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setPermissions(p => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Staff Directory</span>
        </button>
        <span className="badge badge-red">Security & Role Configurator</span>
      </div>

      {saved && (
        <div style={{ padding: '12px 18px', background: 'var(--accent-green-light)', color: '#065F46', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> Permissions matrix successfully updated for {staff.name}!
        </div>
      )}

      {/* Staff Identity Card */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            background: 'var(--brand-slate)', 
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: '800'
          }}>
            SJ
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{staff.name}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {staff.role} • Primary Campus: <strong>{staff.branch}</strong> • {staff.email}
            </p>
          </div>
        </div>
      </div>

      {/* Granular Permissions Matrix */}
      <div className="edu-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
          Access Control & Examiner Privileges
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Live Speaking Examiner Console Access</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Authorized to conduct 1-on-1 interviews and assign official band scores.</div>
            </div>
            <input 
              type="checkbox" 
              checked={permissions.conductSpeaking} 
              onChange={() => toggle('conductSpeaking')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '700' }}>AI Writing Assessment Co-Grading</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Override and approve Task 1 & Task 2 band scores and annotations.</div>
            </div>
            <input 
              type="checkbox" 
              checked={permissions.gradeWriting} 
              onChange={() => toggle('gradeWriting')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Publish Official TRF Test Reports</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Permitted to release results directly to candidate portal and SMS/WhatsApp channels.</div>
            </div>
            <input 
              type="checkbox" 
              checked={permissions.publishResults} 
              onChange={() => toggle('publishResults')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Author Private Institute Question Bank</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Create reading passages, audio transcripts, and answer keys.</div>
            </div>
            <input 
              type="checkbox" 
              checked={permissions.authorQuestions} 
              onChange={() => toggle('authorQuestions')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Institute Billing & Financial Analytics</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Restricted to Managing Directors and Owner accounts.</div>
            </div>
            <input 
              type="checkbox" 
              checked={permissions.accessFinancials} 
              onChange={() => toggle('accessFinancials')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

        </div>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={15} />
            <span>Save Role Permissions</span>
          </button>
        </div>
      </div>

    </div>
  );
}
