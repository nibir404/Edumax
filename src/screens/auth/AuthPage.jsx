import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import { api } from '../../services/api';

export default function AuthPage({ onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('nafis.ahmed@edumax.io');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle standard email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.login({ email, role: selectedRole });
      if (res && res.success && res.data?.user) {
        onLoginSuccess(res.data.user, res.data.token);
      } else {
        setErrorMsg(res?.error || 'Invalid credentials. Please verify your account details.');
      }
    } catch {
      setErrorMsg('Network error connecting to backend auth service.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Social Login (Google or LinkedIn)
  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.socialLogin({
        provider,
        role: provider === 'linkedin' ? 'teacher' : selectedRole,
        profile: {
          email: provider === 'linkedin' ? 's.jenkins@edumax.io' : 'nafis.ahmed@edumax.io',
          name: provider === 'linkedin' ? 'Dr. Sarah Jenkins' : 'Nafis Ahmed'
        }
      });

      if (res && res.success && res.data?.user) {
        onLoginSuccess(res.data.user, res.data.token);
      } else {
        setErrorMsg(res?.error || `${provider} authentication failed.`);
      }
    } catch {
      setErrorMsg(`Failed to authenticate with ${provider}.`);
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Account Auto-Fill
  const handleSelectDemo = (demoRole, demoEmail) => {
    setSelectedRole(demoRole);
    setEmail(demoEmail);
    setErrorMsg('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(20px, 4vw, 40px) 16px',
      background: 'var(--bg-app)'
    }}>
      
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-block', marginBottom: '10px' }}>
          <Logo size="medium" />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px', margin: 0 }}>
          Sign in to Edumax Cloud
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Your Career Coach • IELTS Preparation & Institutional Learning SaaS
        </p>
      </div>

      {/* Main Authentication Card — 60/30/10 Architecture */}
      <div className="edu-card" style={{
        maxWidth: '460px',
        width: '100%',
        padding: 'clamp(24px, 4vw, 36px)',
        boxShadow: 'var(--shadow-dropdown)'
      }}>

        {/* Target Portal Selection Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          background: 'var(--bg-subtle)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '22px'
        }}>
          <button
            type="button"
            onClick={() => handleSelectDemo('student', 'nafis.ahmed@edumax.io')}
            style={{
              flex: 1,
              padding: '7px 4px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11.5px',
              fontWeight: '600',
              background: selectedRole === 'student' ? 'var(--bg-card)' : 'transparent',
              color: selectedRole === 'student' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: selectedRole === 'student' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.12s ease'
            }}
          >
            Candidate
          </button>
          <button
            type="button"
            onClick={() => handleSelectDemo('teacher', 's.jenkins@edumax.io')}
            style={{
              flex: 1,
              padding: '7px 4px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11.5px',
              fontWeight: '600',
              background: selectedRole === 'teacher' ? 'var(--bg-card)' : 'transparent',
              color: selectedRole === 'teacher' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: selectedRole === 'teacher' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.12s ease'
            }}
          >
            Examiner
          </button>
          <button
            type="button"
            onClick={() => handleSelectDemo('manager', 'kazi.farhan@edumax.io')}
            style={{
              flex: 1,
              padding: '7px 4px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11.5px',
              fontWeight: '600',
              background: selectedRole === 'manager' ? 'var(--bg-card)' : 'transparent',
              color: selectedRole === 'manager' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: selectedRole === 'manager' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.12s ease'
            }}
          >
            Manager
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: 'var(--primary-red-subtle)',
            border: '1px solid var(--primary-red-border)',
            color: 'var(--primary-red)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '12.5px',
            fontWeight: '500',
            marginBottom: '18px'
          }}>
            {errorMsg}
          </div>
        )}

        {/* --------------------------------------------------------------------
           SOCIAL LOGIN BUTTONS (Google & LinkedIn)
           -------------------------------------------------------------------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
          
          {/* Google Social Login */}
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="btn btn-secondary"
            style={{
              width: '100%',
              minHeight: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '13px',
              fontWeight: '600',
              borderColor: 'var(--border-color)'
            }}
          >
            {/* Google SVG Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* LinkedIn Social Login (for Teachers, Examiners & Staff) */}
          <button
            type="button"
            onClick={() => handleSocialLogin('linkedin')}
            disabled={loading}
            className="btn btn-secondary"
            style={{
              width: '100%',
              minHeight: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '13px',
              fontWeight: '600',
              borderColor: 'var(--border-color)'
            }}
          >
            {/* LinkedIn SVG Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67A1.67 1.67 0 0 0 6.46 5.42a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.67 1.67 1.67m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
            </svg>
            <span>Continue with LinkedIn</span>
            {selectedRole === 'teacher' && (
              <span className="badge" style={{ fontSize: '10px', padding: '1px 5px', marginLeft: 'auto' }}>
                Recommended for Examiners
              </span>
            )}
          </button>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '11.5px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            or work email
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <span style={{ fontSize: '11.5px', color: 'var(--primary-red)', cursor: 'pointer', fontWeight: '500' }}>
                Forgot password?
              </span>
            </div>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', minHeight: '42px', fontSize: '13.5px', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : `Enter ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Portal`}
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div style={{
          marginTop: '24px',
          paddingTop: '18px',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Quick Demo Accounts:
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-subtle btn-sm"
              onClick={() => handleSelectDemo('student', 'nafis.ahmed@edumax.io')}
              style={{ fontSize: '11px', padding: '3px 8px' }}
            >
              Candidate
            </button>
            <button
              type="button"
              className="btn btn-subtle btn-sm"
              onClick={() => handleSelectDemo('teacher', 's.jenkins@edumax.io')}
              style={{ fontSize: '11px', padding: '3px 8px' }}
            >
              Teacher
            </button>
            <button
              type="button"
              className="btn btn-subtle btn-sm"
              onClick={() => handleSelectDemo('manager', 'kazi.farhan@edumax.io')}
              style={{ fontSize: '11px', padding: '3px 8px' }}
            >
              Manager
            </button>
            <button
              type="button"
              className="btn btn-subtle btn-sm"
              onClick={() => handleSelectDemo('admin', 'alex.rivera@platform.edumax.io')}
              style={{ fontSize: '11px', padding: '3px 8px' }}
            >
              Admin
            </button>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11.5px', color: 'var(--text-subtle)' }}>
        Edumax Cloud v4.0 Enterprise • Secure SSL & Mutex Concurrency Protected
      </div>

    </div>
  );
}
