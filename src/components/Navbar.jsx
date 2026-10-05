import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Menu, 
  LogOut, 
  ArrowRightLeft,
  GraduationCap,
  Award,
  Building,
  ShieldAlert
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
      portalTag: 'STUDENT PORTAL'
    },
    [ROLES.TEACHER]: {
      label: 'Teacher / Examiner',
      badge: 'Examiner',
      icon: Award,
      portalTag: 'EXAMINER PORTAL'
    },
    [ROLES.MANAGER]: {
      label: 'Institute Manager',
      badge: '5 Branches',
      icon: Building,
      portalTag: 'MANAGER PORTAL'
    },
    [ROLES.PLATFORM_ADMIN]: {
      label: 'Platform Admin',
      badge: 'Admin',
      icon: ShieldAlert,
      portalTag: 'PLATFORM ADMIN'
    }
  };

  const currentMeta = roleMeta[currentRole] || roleMeta[ROLES.STUDENT];
  const RoleIcon = currentMeta.icon;

  return (
    <header className="top-navbar">
      {/* Left: Menu Toggle & Navigation Breadcrumb */}
      <div className="nav-left-section">
        <button 
          className="mobile-menu-btn" 
          onClick={onToggleMobileMenu}
          aria-label="Open Navigation Menu"
        >
          <Menu size={18} />
        </button>

        {/* Minimal Monochromatic Breadcrumbs */}
        <div className="nav-breadcrumbs">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-subtle)',
            color: 'var(--brand-dark)',
            border: '1px solid var(--border-color)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.4px',
            flexShrink: 0
          }}>
            <RoleIcon size={12} color="var(--primary-red)" />
            {currentMeta.portalTag}
          </div>
          <span style={{ color: 'var(--border-color)', fontSize: '13px' }}>/</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {activeScreen.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').trim()}
          </span>
        </div>

        {/* Clean Search Bar */}
        <div className="global-search-bar" onClick={onOpenSearch}>
          <Search size={15} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder={`Search ${currentMeta.label.toLowerCase()}...`} 
            readOnly 
          />
          <span className="search-shortcut-pill">⌘K</span>
        </div>
      </div>

      {/* Right: Telemetry, Switch Portal, Notifications, User */}
      <div className="nav-right-section">

        {/* Minimal Telemetry Status */}
        <div 
          className="desktop-only"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            padding: '3px 9px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--text-secondary)'
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--status-success-text)'
          }} />
          <span>SaaS Mutex Active</span>
        </div>

        {/* Switch Portal Account Button */}
        <button
          onClick={onOpenLoginModal}
          className="btn btn-secondary btn-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Switch to another segregated role portal"
        >
          <ArrowRightLeft size={13} color="var(--primary-red)" />
          <span className="desktop-sm-visible">Switch Portal</span>
        </button>

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <button 
            className="nav-action-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={16} />
            {notificationCount > 0 && <span className="nav-badge-dot" />}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <span style={{ fontWeight: '700', fontSize: '12.5px' }}>Notifications ({notificationCount})</span>
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
          >
            <div className="user-avatar">
              {currentUser.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div className="user-info desktop-only">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role">
                {currentMeta.label}
              </span>
            </div>
            <ChevronDown size={13} color="var(--text-muted)" className="desktop-only" />
          </div>

          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '230px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-dropdown)',
              padding: '10px',
              zIndex: 1000
            }}>
              <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser.email || 'user@edumax.io'}
                </div>
                <div style={{ 
                  marginTop: '5px', 
                  fontSize: '10.5px', 
                  background: 'var(--bg-subtle)', 
                  color: 'var(--text-secondary)',
                  display: 'inline-block',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  fontWeight: '600'
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
                  padding: '7px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <ArrowRightLeft size={13} color="var(--primary-red)" />
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
                  padding: '7px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-red-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
