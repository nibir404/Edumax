import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Award, 
  Mic, 
  PenTool, 
  Users, 
  Calendar, 
  Building2, 
  CreditCard,
  ChevronRight,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { ROLES } from '../data/mockData';

export default function GlobalSearchModal({ isOpen, onClose, onSelectScreen, currentRole = ROLES.STUDENT }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Master catalog of screens per role
  const catalog = {
    [ROLES.STUDENT]: [
      { title: 'Student Dashboard (Band Gauge & Recent Mocks)', screen: 'dashboard', category: 'Student Core', icon: Award },
      { title: 'Official IELTS Test Library', screen: 'test-library', category: 'Practice', icon: BookOpen },
      { title: 'Interactive Mock Exam Session Simulator', screen: 'exam-taking', category: 'Practice', icon: PenTool },
      { title: 'My Historical Results & Band Calibrations', screen: 'my-results', category: 'Analytics', icon: Award },
      { title: 'Listening Result & Band 8.5 Analysis', screen: 'listening-detail', category: 'Skills', icon: Award },
      { title: 'Reading Result & Raw Score Breakdown', screen: 'reading-detail', category: 'Skills', icon: BookOpen },
      { title: 'Writing Task 2 AI Feedback & Band 9 Rewrite', screen: 'writing-detail', category: 'Skills', icon: PenTool },
      { title: 'Speaking Result Detail & Rubric Breakdown', screen: 'speaking-detail', category: 'Skills', icon: Mic },
      { title: 'Answer Review & Detailed Explanations', screen: 'answer-review', category: 'Review', icon: BookOpen },
      { title: 'Skill Progression & Weak Area Analytics', screen: 'progress-analytics', category: 'Analytics', icon: Award },
      { title: 'Live 1-on-1 Speaking Booking Calendar', screen: 'speaking-booking', category: 'Booking', icon: Calendar },
      { title: 'Candidate Profile & Target Band Settings', screen: 'profile', category: 'Account', icon: Users },
      { title: 'Notification Alerts & WhatsApp Preferences', screen: 'notifications', category: 'Account', icon: Calendar },
      { title: 'Subscription Plan & Quota Top-ups', screen: 'subscription', category: 'Billing', icon: CreditCard },
      { title: 'Payment Invoices & Receipts', screen: 'invoices', category: 'Billing', icon: CreditCard },
      { title: 'Support & IELTS Candidate Guide', screen: 'help', category: 'Support', icon: Users }
    ],

    [ROLES.TEACHER]: [
      { title: 'Teacher & Examiner Overview Dashboard', screen: 'teacher-dashboard', category: 'Examiner Console', icon: Award },
      { title: 'Live Speaking Interview Rubric Console', screen: 'speaking-interview', category: 'Examiner Console', icon: Mic },
      { title: 'Assigned Student Cohorts & Batches', screen: 'my-batches', category: 'Cohorts', icon: Users },
      { title: 'Cohort Roster & Candidate Analytics', screen: 'batch-detail', category: 'Cohorts', icon: Users },
      { title: 'Individual Student Profile & Diagnostic History', screen: 'student-detail', category: 'Cohorts', icon: Users },
      { title: 'Assign Official Test Paper to Batch', screen: 'assign-test', category: 'Assignments', icon: BookOpen },
      { title: 'Cohort Performance & Band Distribution Reports', screen: 'teacher-reports', category: 'Reports', icon: Award }
    ],

    [ROLES.MANAGER]: [
      { title: 'Multi-Branch Institute Dashboard', screen: 'institute-dashboard', category: 'Executive View', icon: Building2 },
      { title: 'Campus Branches & Capacity Directory', screen: 'branches', category: 'Organization', icon: Building2 },
      { title: 'Staff & Teacher Examiner Directory', screen: 'staff-list', category: 'Staff', icon: Users },
      { title: 'Staff Performance & Assigned Batches', screen: 'staff-detail', category: 'Staff', icon: Users },
      { title: 'Batch Directory & Enrollment Capacity', screen: 'batch-list', category: 'Batches', icon: Users },
      { title: 'Batch Creation Wizard (Classroom / Online)', screen: 'batch-create', category: 'Batches', icon: Users },
      { title: 'Schedule Exam Session & PIN Generator', screen: 'exam-session-create', category: 'Exams', icon: Calendar },
      { title: 'Publish Calibrated Results & WhatsApp Blast', screen: 'publish-results', category: 'Exams', icon: Award },
      { title: 'Institute Private Question Bank', screen: 'question-bank', category: 'Question Assets', icon: BookOpen },
      { title: 'Question Authoring & Passage Editor', screen: 'question-editor', category: 'Question Assets', icon: PenTool },
      { title: 'Multi-Section IELTS Test Builder', screen: 'test-builder', category: 'Question Assets', icon: BookOpen },
      { title: 'White-Label Branding & Custom Domain', screen: 'branding', category: 'Settings', icon: Building2 },
      { title: 'Enterprise Institute Billing & License Seats', screen: 'institute-billing', category: 'Finance', icon: CreditCard },
      { title: 'Branch Enrollment & Band Trends Reports', screen: 'institute-reports', category: 'Executive', icon: Award }
    ],

    [ROLES.PLATFORM_ADMIN]: [
      { title: 'Multi-Tenant Institutes Overview', screen: 'tenant-list', category: 'Tenants', icon: Building2 },
      { title: 'Tenant Configuration & SLA Quotas', screen: 'tenant-detail', category: 'Tenants', icon: Building2 },
      { title: 'Global SaaS Users Directory', screen: 'global-users', category: 'Global Directory', icon: Users },
      { title: 'Global Master Content & Exam Library', screen: 'content-library', category: 'Global Content', icon: BookOpen },
      { title: 'SaaS Subscription Plan & Tier Matrix', screen: 'plan-editor', category: 'Plans & Pricing', icon: CreditCard },
      { title: 'Promotional Coupons & Discount Manager', screen: 'coupons', category: 'Discounts', icon: CreditCard },
      { title: 'SaaS Feature Flags & Dark Launches', screen: 'feature-flags', category: 'Flags', icon: ShieldCheck },
      { title: 'System Health, Telemetry & P99 Latency', screen: 'system-health', category: 'DevOps', icon: ShieldCheck },
      { title: 'Enterprise Support Helpdesk Inbox', screen: 'support-inbox', category: 'Support Tickets', icon: Users },
      { title: 'Global MRR, ARR & Churn Revenue Dashboard', screen: 'revenue-dashboard', category: 'Revenue', icon: CreditCard }
    ]
  };

  // Strictly filter to the active user's role to prevent cross-role leaks
  const currentRoleItems = catalog[currentRole] || catalog[ROLES.STUDENT];

  const filtered = currentRoleItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--surface-color)'
        }}>
          <Search size={20} color="var(--primary-red)" />
          <input 
            type="text" 
            placeholder={`Search within ${currentRole.toUpperCase()} views...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '15px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px' }}>
          <div style={{ 
            padding: '8px 12px', 
            fontSize: '11px', 
            fontWeight: '700', 
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Available Views ({filtered.length})</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)' }}>
              <ShieldCheck size={12} />
              RBAC Verified: {currentRole}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No views found matching "{query}" within the {currentRole} role.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon || BookOpen;
              return (
                <div 
                  key={idx}
                  onClick={() => {
                    onSelectScreen(currentRole, item.screen);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-color-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '8px', 
                      background: 'rgba(200, 30, 46, 0.08)',
                      color: 'var(--primary-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '10px 16px',
          background: 'var(--surface-color-subtle)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          <span>Press <kbd style={{ padding: '2px 5px', borderRadius: '4px', background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>ESC</kbd> to exit</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Lock size={12} />
            Isolated Role View
          </span>
        </div>
      </div>
    </div>
  );
}
