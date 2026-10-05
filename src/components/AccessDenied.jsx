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
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '560px',
        width: '100%',
        background: 'var(--surface-color)',
        border: '1px solid rgba(220, 38, 38, 0.25)',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(220, 38, 38, 0.08)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top Warning Accent Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #dc2626, #ef4444)'
        }} />

        {/* Shield Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(220, 38, 38, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'var(--primary-red)'
        }}>
          <ShieldAlert size={32} />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(220, 38, 38, 0.08)',
          color: 'var(--primary-red)',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          marginBottom: '16px'
        }}>
          <Lock size={12} />
          HTTP 403 • Role Access Restricted
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Restricted Portal View
        </h2>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
          You are currently signed in as a <strong style={{ color: 'var(--text-primary)' }}>{roleDisplayNames[currentRole] || currentRole}</strong>. 
          The view you requested (<code style={{ background: 'var(--surface-color-subtle)', padding: '2px 6px', borderRadius: '4px' }}>{attemptedScreen}</code>) is strictly segregated and inaccessible to this role under Edumax's enterprise RBAC security policy.
        </p>

        {/* RBAC Enforced Details */}
        <div style={{
          background: 'var(--surface-color-subtle)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'left',
          marginBottom: '28px',
          fontSize: '13px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="var(--accent-green)" />
            Enterprise Privacy & Isolation Guarantee:
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <li>Students cannot view internal staff, manager, or examiner screens.</li>
            <li>Teachers and examiners only access candidate evaluation tools.</li>
            <li>Institute Managers maintain confidential cohort & revenue controls.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={onReturnHome}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} />
            Return to My Dashboard
          </button>

          <button 
            className="btn btn-secondary"
            onClick={onSwitchAccount}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <LogIn size={16} />
            Switch Portal Account
          </button>
        </div>
      </div>
    </div>
  );
}
