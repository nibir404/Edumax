import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Check, 
  Sparkles,
  User,
  GraduationCap,
  Award,
  Building,
  ShieldAlert,
  Menu,
  LogOut,
  Zap,
  Lock,
  ArrowRightLeft
} from 'lucide-react';
import { ROLES, CURRENT_USERS } from '../data/mockData';

export default function Navbar({ 
  currentRole, 
  activeScreen, 
  onOpenSearch,
  onToggleMobileMenu,
  onOpenLoginModal,
  notificationCount = 3 
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const currentUser = CURRENT_USERS[currentRole] || CURRENT_USERS[ROLES.STUDENT];

  const roleMeta = {
    [ROLES.STUDENT]: {
      label: 'Student Portal',
      badge: 'Target 8.0',
      icon: GraduationCap,
      color: '#3b82f6',
      portalTag: 'CANDIDATE VIEW'
    },
    [ROLES.TEACHER]: {
      label: 'Teacher / Examiner',
      badge: 'Senior Evaluator',
      icon: Award,
      color: '#8b5cf6',
      portalTag: 'EXAMINER VIEW'
    },
    [ROLES.MANAGER]: {
      label: 'Institute Manager',
      badge: '5 Branches',
      icon: Building,
      color: '#C81E2E',
      portalTag: 'OPERATIONS VIEW'
    },
    [ROLES.PLATFORM_ADMIN]: {
      label: 'Platform SaaS Admin',
      badge: 'Super Admin',
      icon: ShieldAlert,
      color: '#10b981',
      portalTag: 'SUPER ADMIN VIEW'
    }
  };

  const currentMeta = roleMeta[currentRole] || roleMeta[ROLES.STUDENT];
  const RoleIcon = currentMeta.icon;

  return (
    <header className="top-navbar">
      {/* Left: Breadcrumbs & Search */}
      <div className="nav-left-section">
        <button 
          className="mobile-menu-btn" 
          onClick={onToggleMobileMenu}
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* Dynamic RBAC Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: `${currentMeta.color}15`,
            color: currentMeta.color,
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.4px'
          }}>
            <RoleIcon size={12} />
            {currentMeta.portalTag}
          </div>
          <span style={{ color: 'var(--border-color)' }}>/</span>
          <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {activeScreen.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').trim()}
          </span>
        </div>

        {/* Global Search Bar (Only searches current role views) */}
        <div className="global-search-bar" onClick={onOpenSearch}>
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder={`Search ${currentMeta.label.toLowerCase()} actions & screens...`} 
            readOnly 
          />
          <span className="search-shortcut-pill">⌘K</span>
        </div>
      </div>

      {/* Right: Telemetry, Notifications & User Account */}
      <div className="nav-right-section">

        {/* SaaS High-Concurrency Telemetry Badge */}
        <div 
          className="desktop-only"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--surface-color-subtle)',
            border: '1px solid var(--border-color)',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--text-secondary)'
          }}
          title="SaaS Concurrency Protected with FIFO Mutex Locks & Sub-Millisecond Response"
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-green)',
            boxShadow: '0 0 6px rgba(16, 185, 129, 0.8)'
          }} />
          <span>SaaS Mutex Active</span>
        </div>

        {/* Switch Portal Account Button */}
        <button
          onClick={onOpenLoginModal}
          className="btn btn-secondary"
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            borderRadius: '8px'
          }}
          title="Switch to another segregated role portal"
        >
          <ArrowRightLeft size={13} color="var(--primary-red)" />
          <span>Switch Portal</span>
        </button>

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <button 
            className="nav-action-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {notificationCount > 0 && <span className="nav-badge-dot" />}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <span style={{ fontWeight: '700', fontSize: '13px' }}>Notifications ({notificationCount})</span>
                <span style={{ fontSize: '11px', color: 'var(--primary-red)', cursor: 'pointer', fontWeight: '600' }}>
                  Mark all read
                </span>
              </div>
              <div className="notification-list">
                <div className="notification-item unread">
                  <div className="notif-title">Speaking Slot Confirmed</div>
                  <div className="notif-desc">Interview scheduled with Dr. Sarah Jenkins for tomorrow at 10:00 AM.</div>
                  <div className="notif-time">10m ago</div>
                </div>
                <div className="notification-item unread">
                  <div className="notif-title">Writing Test 03 Evaluated</div>
                  <div className="notif-desc">AI Assessment ready: Band 6.5 with rewrite recommendations.</div>
                  <div className="notif-time">1h ago</div>
                </div>
                <div className="notification-item">
                  <div className="notif-title">Institute Announcement</div>
                  <div className="notif-desc">Gulshan branch mock test registration open for May cohort.</div>
                  <div className="notif-time">1d ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active User Profile & Menu */}
        <div style={{ position: 'relative' }}>
          <div 
            className="user-profile-summary"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ cursor: 'pointer' }}
          >
            <div className="user-avatar" style={{ background: currentMeta.color }}>
              {currentUser.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div className="user-info desktop-only">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role" style={{ color: currentMeta.color, fontWeight: '700' }}>
                {currentMeta.label}
              </span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" className="desktop-only" />
          </div>

          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '240px',
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              padding: '12px',
              zIndex: 1000
            }}>
              <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                <div style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser.email || 'user@edumax.io'}
                </div>
                <div style={{ 
                  marginTop: '6px', 
                  fontSize: '11px', 
                  background: `${currentMeta.color}15`, 
                  color: currentMeta.color,
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '700'
                }}>
                  {currentMeta.badge}
                </div>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenLoginModal();
                }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-color-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <ArrowRightLeft size={14} color="var(--primary-red)" />
                Switch Role Account
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenLoginModal();
                }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: 'var(--primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(220, 38, 38, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
