import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Building2, 
  ShieldAlert, 
  Lock, 
  Check, 
  ArrowRight, 
  X,
  Sparkles,
  Zap,
  KeyRound
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
    color: '#3b82f6',
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
    color: '#8b5cf6',
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
    color: '#C81E2E',
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
    color: '#10b981',
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
    <div className="modal-overlay" style={{ zIndex: 9999, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="modal-content" style={{ maxWidth: '820px', width: '92%', borderRadius: '20px', padding: '0', overflow: 'hidden' }}>
        
        {/* Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1F242D 0%, #151922 100%)',
          padding: '28px 32px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Logo size="small" />
              <span style={{ 
                background: 'rgba(200, 30, 46, 0.2)', 
                color: 'var(--primary-red)', 
                fontSize: '11px', 
                fontWeight: '700', 
                padding: '3px 8px', 
                borderRadius: '6px',
                letterSpacing: '0.5px'
              }}>
                ENTERPRISE RBAC GATEWAY
              </span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
              SaaS Role-Based Access Management
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>
              Select a persona below. Each role operates within its own strictly isolated dashboard.
            </p>
          </div>

          {onClose && (
            <button 
              onClick={onClose} 
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px 32px', maxHeight: '70vh', overflowY: 'auto' }}>
          
          {errorMsg && (
            <div style={{
              background: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: 'var(--primary-red)',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '20px'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={() => setUseCustomCreds(false)}
              className="btn"
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                background: !useCustomCreds ? 'var(--primary-red)' : 'var(--surface-color-subtle)',
                color: !useCustomCreds ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              One-Click Role Selection (4 Personas)
            </button>
            <button
              onClick={() => setUseCustomCreds(true)}
              className="btn"
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                background: useCustomCreds ? 'var(--primary-red)' : 'var(--surface-color-subtle)',
                color: useCustomCreds ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              Enter Custom Credentials
            </button>
          </div>

          {!useCustomCreds ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {DEMO_PERSONAS.map((persona) => {
                const Icon = persona.icon;
                const isCurrent = currentRole === persona.role;

                return (
                  <div
                    key={persona.role}
                    onClick={() => handleSelectRole(persona)}
                    style={{
                      background: 'var(--surface-color)',
                      border: isCurrent 
                        ? '2px solid var(--primary-red)' 
                        : '1px solid var(--border-color)',
                      borderRadius: '14px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isCurrent ? '0 4px 16px rgba(200, 30, 46, 0.12)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrent) e.currentTarget.style.borderColor = 'var(--text-muted)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrent) e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: `${persona.color}15`,
                          color: persona.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={22} />
                        </div>

                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'var(--surface-color-subtle)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-color)'
                        }}>
                          {persona.badge}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '15.5px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                          {persona.title}
                        </h3>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                          ({persona.screensCount} screens)
                        </span>
                      </div>

                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {persona.name}
                      </div>

                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '10px' }}>
                        {persona.email}
                      </div>

                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        {persona.description}
                      </p>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {isCurrent ? '● Active Session' : 'Click to Switch'}
                      </span>
                      <button 
                        className={`btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        disabled={loading}
                      >
                        {isCurrent ? 'Signed In' : 'Enter Portal'}
                        <ArrowRight size={13} style={{ marginLeft: '4px' }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleCustomLogin} style={{ maxWidth: '420px', margin: '0 auto' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Target Role Portal
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)',
                    color: 'var(--text-primary)',
                    fontSize: '13.5px'
                  }}
                >
                  <option value="student">Student Portal (Candidate)</option>
                  <option value="teacher">Teacher / IELTS Examiner Portal</option>
                  <option value="manager">Institute Manager Portal</option>
                  <option value="admin">Platform SaaS Super Admin</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input 
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="e.g. nafis.ahmed@edumax.io"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)',
                    color: 'var(--text-primary)',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Password
                </label>
                <input 
                  type="password"
                  value={customPassword}
                  onChange={(e) => setCustomPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)',
                    color: 'var(--text-primary)',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '14px', justifyContent: 'center' }}
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In with Role Clearance'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Concurrency & Scalability Note */}
          <div style={{
            marginTop: '24px',
            background: 'var(--surface-color-subtle)',
            borderRadius: '10px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)'
          }}>
            <Zap size={16} color="var(--primary-red)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>High-Concurrency SaaS Architecture:</strong> All sessions are token-authenticated with sub-millisecond RBAC validation and atomic mutex locking on shared resources.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
