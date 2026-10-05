import React from 'react';
import { ShieldAlert, ArrowLeft, LogIn, Lock, CheckCircle2 } from 'lucide-react';

export default function AccessDenied({ currentRole, attemptedScreen, onReturnHome, onSwitchAccount }) {
  const roleDisplayNames = {
    student: 'Student Portal Candidate',
    teacher: 'Teacher / IELTS Examiner',
    manager: 'Institute Operations Manager',
    admin: 'Platform SaaS Administrator'
  };

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 20px'
    }}>
      <div className="edu-card" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '32px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Shield Icon in Minimal Slate Box */}
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          color: 'var(--primary-red)'
        }}>
          <ShieldAlert size={26} />
        </div>

        <div className="badge badge-red" style={{ marginBottom: '14px' }}>
          <Lock size={11} />
          <span>HTTP 403 • Role Access Restricted</span>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Restricted Portal View
        </h2>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '20px' }}>
          You are signed in as a <strong style={{ color: 'var(--text-primary)' }}>{roleDisplayNames[currentRole] || currentRole}</strong>. 
          The requested view (<code style={{ background: 'var(--bg-subtle)', padding: '1px 5px', borderRadius: '4px', fontSize: '12px' }}>{attemptedScreen}</code>) is segregated under Edumax's enterprise RBAC security policy.
        </p>

        {/* Minimal Isolation Policy Notice */}
        <div style={{
          background: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          textAlign: 'left',
          marginBottom: '24px',
          fontSize: '12.5px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={13} color="var(--status-success-text)" />
            Enterprise Privacy & Isolation Rules:
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--text-secondary)', lineHeight: '1.55', fontSize: '12px' }}>
            <li>Students cannot access staff, manager, or examiner screens.</li>
            <li>Examiners only access candidate evaluation consoles.</li>
            <li>Institute Managers oversee campus cohorts & confidential records.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={onReturnHome}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}
          >
            <ArrowLeft size={14} />
            <span>Return to My Dashboard</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={onSwitchAccount}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}
          >
            <LogIn size={14} />
            <span>Switch Portal Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
