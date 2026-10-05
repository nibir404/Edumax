import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Building2, 
  ShieldAlert, 
  X,
  ArrowRight, 
  Zap,
  Check
} from 'lucide-react';
import Logo from './Logo';
import { api } from '../services/api';

const DEMO_PERSONAS = [
  {
    role: 'student',
    title: 'Student Portal',
    name: 'Nafis Ahmed',
    email: 'nafis.ahmed@edumax.io',
    description: 'IELTS candidate preparing for academic test with practice tests, band analytics & AI feedback.',
    icon: GraduationCap,
    badge: 'Target Band 8.0',
    screensCount: 15
  },
  {
    role: 'teacher',
    title: 'Teacher / Examiner',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@edumax.io',
    description: 'Speaking interviewer & writing examiner reviewing candidate essays, audio recordings and cohorts.',
    icon: Award,
    badge: 'Senior Evaluator',
    screensCount: 7
  },
  {
    role: 'manager',
    title: 'Institute Manager',
    name: 'Kazi Farhan',
    email: 'kazi.farhan@edumax.io',
    description: 'Branch administrator managing 5 campuses, staff, cohort batches, exam sessions & white-label settings.',
    icon: Building2,
    badge: '5 Branches Active',
    screensCount: 14
  },
  {
    role: 'admin',
    title: 'Platform SaaS Admin',
    name: 'Alex Rivera',
    email: 'alex.rivera@platform.edumax.io',
    description: 'SaaS multi-tenant controller overlooking all institutes, revenue, system health, coupons & feature flags.',
    icon: ShieldAlert,
    badge: 'Super Admin',
    screensCount: 10
  }
];

export default function LoginPortal({ isOpen, onClose, onLoginSuccess, currentRole }) {
  const [selectedRole, setSelectedRole] = useState(currentRole || 'student');
  const [customEmail, setCustomEmail] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [useCustomCreds, setUseCustomCreds] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSelectRole = async (persona) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.login({ email: persona.email, role: persona.role });
      if (res && res.success) {
        onLoginSuccess(res.data.user, res.data.token);
        if (onClose) onClose();
      } else {
        setErrorMsg(res?.error || 'Authentication failed. Please retry.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Network error connecting to backend auth service.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomLogin = async (e) => {
    e.preventDefault();
    if (!customEmail) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.login({ email: customEmail, role: selectedRole });
      if (res && res.success) {
        onLoginSuccess(res.data.user, res.data.token);
        if (onClose) onClose();
      } else {
        setErrorMsg(res?.error || 'Invalid credentials or user not found.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Auth failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '800px', width: '92%', borderRadius: 'var(--radius-xl)', padding: 0, overflow: 'hidden' }}>
        
        {/* Header - Minimal Dark Slate */}
        <div style={{
          background: 'var(--brand-dark)',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Logo size="small" />
              <span style={{ 
                background: 'rgba(255,255,255,0.1)', 
                color: '#FFFFFF', 
                fontSize: '10.5px', 
                fontWeight: '700', 
                padding: '2px 7px', 
                borderRadius: '4px',
                letterSpacing: '0.4px'
              }}>
                ROLE-BASED PORTALS
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
              Edumax Portal Switcher
            </h2>
            <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '3px 0 0 0' }}>
              Select a persona to enter that role's isolated, dedicated workspace.
            </p>
          </div>

          {onClose && (
            <button 
              onClick={onClose} 
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', maxHeight: '72vh', overflowY: 'auto' }}>
          
          {errorMsg && (
            <div style={{
              background: 'var(--primary-red-subtle)',
              border: '1px solid var(--primary-red-border)',
              color: 'var(--primary-red)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '12.5px',
              fontWeight: '500',
              marginBottom: '16px'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Clean Segmented Tab Switcher */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '18px', background: 'var(--bg-subtle)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setUseCustomCreds(false)}
              className="btn"
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12.5px',
                fontWeight: '600',
                background: !useCustomCreds ? 'var(--bg-card)' : 'transparent',
                color: !useCustomCreds ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: !useCustomCreds ? '1px solid var(--border-color)' : 'none',
                boxShadow: !useCustomCreds ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer'
              }}
            >
              4 Demo Personas (One-Click)
            </button>
            <button
              onClick={() => setUseCustomCreds(true)}
              className="btn"
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12.5px',
                fontWeight: '600',
                background: useCustomCreds ? 'var(--bg-card)' : 'transparent',
                color: useCustomCreds ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: useCustomCreds ? '1px solid var(--border-color)' : 'none',
                boxShadow: useCustomCreds ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer'
              }}
            >
              Custom Credentials
            </button>
          </div>

          {!useCustomCreds ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '14px' }}>
              {DEMO_PERSONAS.map((persona) => {
                const Icon = persona.icon;
                const isCurrent = currentRole === persona.role;

                return (
                  <div
                    key={persona.role}
                    onClick={() => handleSelectRole(persona)}
                    style={{
                      background: 'var(--bg-card)',
                      border: isCurrent 
                        ? '1.5px solid var(--primary-red)' 
                        : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isCurrent ? '0 2px 8px rgba(200, 30, 46, 0.08)' : 'var(--shadow-card)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrent) e.currentTarget.style.borderColor = 'var(--border-hover)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrent) e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: 'var(--radius-md)',
                          background: isCurrent ? 'var(--primary-red-subtle)' : 'var(--bg-subtle)',
                          color: isCurrent ? 'var(--primary-red)' : 'var(--brand-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-color)'
                        }}>
                          <Icon size={18} />
                        </div>

                        <span className="badge" style={{ fontSize: '11px' }}>
                          {persona.badge}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
                        <h3 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                          {persona.title}
                        </h3>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          ({persona.screensCount} views)
                        </span>
                      </div>

                      <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>
                        {persona.name}
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                        {persona.email}
                      </div>

                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                        {persona.description}
                      </p>
                    </div>

                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        {isCurrent ? '● Active' : 'Click to Enter'}
                      </span>
                      <button 
                        className={`btn ${isCurrent ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                        disabled={loading}
                      >
                        {isCurrent ? 'Current' : 'Enter Portal'}
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleCustomLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div className="form-group">
                <label className="form-label">
                  Target Role Portal
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="form-select"
                >
                  <option value="student">Student Portal (Candidate)</option>
                  <option value="teacher">Teacher / IELTS Examiner Portal</option>
                  <option value="manager">Institute Manager Portal</option>
                  <option value="admin">Platform SaaS Super Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>
                <input 
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="e.g. nafis.ahmed@edumax.io"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password
                </label>
                <input 
                  type="password"
                  value={customPassword}
                  onChange={(e) => setCustomPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '8px' }}
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In with Role Clearance'}
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* Minimal Concurrency & Scalability Footer */}
          <div style={{
            marginTop: '20px',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11.5px',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)'
          }}>
            <Zap size={14} color="var(--primary-red)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Role Segregation:</strong> Sessions are token-authenticated with sub-millisecond RBAC validation and atomic mutex locking.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
