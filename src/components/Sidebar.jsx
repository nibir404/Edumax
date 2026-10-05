import React from 'react';
import Logo from './Logo';
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Headphones, 
  FileText, 
  PenTool, 
  Mic, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  User, 
  Bell, 
  CreditCard, 
  Receipt, 
  HelpCircle,
  Users,
  FolderKanban,
  ClipboardCheck,
  Send,
  Sliders,
  BarChart3,
  Building2,
  GitBranch,
  ShieldCheck,
  FileSpreadsheet,
  Database,
  Code,
  Palette,
  Server,
  Key,
  DollarSign,
  Ticket,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { ROLES } from '../data/mockData';

export default function Sidebar({ currentRole, activeScreen, setActiveScreen, isOpenMobile, onCloseMobile }) {

  // Role Menus defined strictly according to the specification
  const studentMenu = [
    {
      group: 'IELTS Core',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'test-library', label: 'Test Library', icon: BookOpen, badge: 'New' },
        { id: 'my-results', label: 'My Results List', icon: Award },
        { id: 'answer-review', label: 'Answer Review', icon: CheckCircle2 },
        { id: 'progress-analytics', label: 'Progress Analytics', icon: TrendingUp }
      ]
    },
    {
      group: 'Skill Detail Views',
      items: [
        { id: 'listening-detail', label: 'Listening Result', icon: Headphones, badge: '8.5' },
        { id: 'reading-detail', label: 'Reading Result', icon: FileText, badge: '8.0' },
        { id: 'writing-detail', label: 'Writing Result', icon: PenTool, badge: '6.5' },
        { id: 'speaking-detail', label: 'Speaking Result', icon: Mic, badge: '7.5' }
      ]
    },
    {
      group: 'Booking & Account',
      items: [
        { id: 'speaking-booking', label: 'Speaking Booking', icon: Calendar },
        { id: 'profile', label: 'Profile & Target Band', icon: User },
        { id: 'notifications', label: 'Notification Settings', icon: Bell },
        { id: 'subscription', label: 'Subscription & Billing', icon: CreditCard },
        { id: 'invoices', label: 'Invoices', icon: Receipt },
        { id: 'help', label: 'Help & Support', icon: HelpCircle }
      ]
    }
  ];

  const teacherMenu = [
    {
      group: 'Examiner Console',
      items: [
        { id: 'teacher-dashboard', label: 'Teacher Dashboard', icon: LayoutDashboard },
        { id: 'speaking-interview', label: 'Speaking Interview Screen', icon: Mic, badge: 'Live Tool' },
        { id: 'assign-test', label: 'Assign Test to Batch', icon: Send }
      ]
    },
    {
      group: 'Batches & Students',
      items: [
        { id: 'my-batches', label: 'My Batches', icon: Users, badge: '3' },
        { id: 'batch-detail', label: 'Batch Detail & Roster', icon: FolderKanban },
        { id: 'student-detail', label: 'Student 360° History', icon: User },
        { id: 'teacher-reports', label: 'Batch Reports', icon: BarChart3 }
      ]
    }
  ];

  const managerMenu = [
    {
      group: 'Institute Overview',
      items: [
        { id: 'institute-dashboard', label: 'Institute Dashboard', icon: LayoutDashboard },
        { id: 'branches', label: 'Branches (5)', icon: GitBranch },
        { id: 'staff-list', label: 'Staff Directory', icon: Users, badge: '48' },
        { id: 'staff-detail', label: 'Staff Role & Permissions', icon: ShieldCheck }
      ]
    },
    {
      group: 'Exam & Batch Operations',
      items: [
        { id: 'batch-list', label: 'Batch List', icon: FolderKanban },
        { id: 'batch-create', label: 'Create New Batch', icon: Users },
        { id: 'exam-session-create', label: 'Exam Session Setup', icon: ClipboardCheck },
        { id: 'publish-results', label: 'Publish Results Modal', icon: CheckCircle2 }
      ]
    },
    {
      group: 'Content & Branding',
      items: [
        { id: 'question-bank', label: 'Question Bank', icon: Database },
        { id: 'question-editor', label: 'Question Editor', icon: Code },
        { id: 'test-builder', label: 'Test Builder Paper', icon: Layers },
        { id: 'branding', label: 'Branding Settings', icon: Palette },
        { id: 'institute-billing', label: 'Institute Billing', icon: CreditCard },
        { id: 'institute-reports', label: 'Institute-wide Reports', icon: BarChart3 }
      ]
    }
  ];

  const adminMenu = [
    {
      group: 'Tenant Management',
      items: [
        { id: 'tenant-list', label: 'Tenant Institutes', icon: Building2, badge: '34' },
        { id: 'tenant-detail', label: 'Manage Tenant Detail', icon: Sliders },
        { id: 'global-users', label: 'Global Users Search', icon: Users }
      ]
    },
    {
      group: 'Global Content & Pricing',
      items: [
        { id: 'content-library', label: 'Shared Question Bank', icon: Database },
        { id: 'plan-editor', label: 'Plan Entitlements Editor', icon: Layers },
        { id: 'coupons', label: 'Discount Coupons', icon: Ticket },
        { id: 'feature-flags', label: 'Feature Flags Matrix', icon: Sparkles }
      ]
    },
    {
      group: 'Infrastructure & Ops',
      items: [
        { id: 'system-health', label: 'System Health & Latency', icon: Cpu, badge: '99.9%' },
        { id: 'support-inbox', label: 'Support Ticket Inbox', icon: HelpCircle, badge: '4' },
        { id: 'revenue-dashboard', label: 'Global Revenue & MRR', icon: DollarSign }
      ]
    }
  ];

  const getMenuForRole = () => {
    switch (currentRole) {
      case ROLES.STUDENT: return studentMenu;
      case ROLES.TEACHER: return teacherMenu;
      case ROLES.MANAGER: return managerMenu;
      case ROLES.PLATFORM_ADMIN: return adminMenu;
      default: return studentMenu;
    }
  };

  const currentGroups = getMenuForRole();

  return (
    <>
      {isOpenMobile && (
        <div className="sidebar-overlay" onClick={onCloseMobile} />
      )}
      <aside className={`sidebar ${isOpenMobile ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <Logo size="medium" />
          {isOpenMobile && (
            <button 
              onClick={onCloseMobile}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          )}
        </div>

      {/* Nav Scroll Area */}
      <div className="sidebar-nav-scroll">
        {currentGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <div className="sidebar-group-title">{group.group}</div>
            <ul className="sidebar-menu">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`sidebar-item-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveScreen(item.id)}
                    >
                      <div className="sidebar-item-left">
                        <Icon size={16} color={isActive ? 'var(--primary-red)' : 'var(--text-secondary)'} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="sidebar-item-badge">{item.badge}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Sidebar Footer with Minimal System Info */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            background: 'var(--status-success-text)'
          }} />
          <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>
            Edumax Cloud • Live
          </span>
        </div>
      </div>
    </aside>
    </>
  );
}
