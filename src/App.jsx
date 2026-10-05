import React, { useState, useEffect } from 'react';
import './App.css';
import { ROLES, CURRENT_USERS } from './data/mockData';
import { api, setAuthToken, getAuthToken } from './services/api';

// Shared Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GlobalSearchModal from './components/GlobalSearchModal';
import AuthPage from './screens/auth/AuthPage';
import AccessDenied from './components/AccessDenied';
import Toast from './components/Toast';

// Student Screens (15 + Simulator)
import StudentDashboard from './screens/student/StudentDashboard';
import TestLibrary from './screens/student/TestLibrary';
import ExamTakingSession from './screens/student/ExamTakingSession';
import MyResultsList from './screens/student/MyResultsList';
import ListeningResultDetail from './screens/student/ListeningResultDetail';
import ReadingResultDetail from './screens/student/ReadingResultDetail';
import WritingResultDetail from './screens/student/WritingResultDetail';
import SpeakingResultDetail from './screens/student/SpeakingResultDetail';
import AnswerReview from './screens/student/AnswerReview';
import ProgressAnalytics from './screens/student/ProgressAnalytics';
import SpeakingBooking from './screens/student/SpeakingBooking';
import StudentProfile from './screens/student/StudentProfile';
import NotificationSettings from './screens/student/NotificationSettings';
import SubscriptionBilling from './screens/student/SubscriptionBilling';
import InvoicesList from './screens/student/InvoicesList';
import StudentHelp from './screens/student/StudentHelp';

// Teacher Screens (7)
import TeacherDashboard from './screens/teacher/TeacherDashboard';
import SpeakingInterviewConsole from './screens/teacher/SpeakingInterviewConsole';
import TeacherBatches from './screens/teacher/TeacherBatches';
import BatchDetail from './screens/teacher/BatchDetail';
import StudentDetailView from './screens/teacher/StudentDetailView';
import AssignTestModal from './screens/teacher/AssignTestModal';
import TeacherReports from './screens/teacher/TeacherReports';

// Manager Screens (14)
import InstituteDashboard from './screens/manager/InstituteDashboard';
import BranchesList from './screens/manager/BranchesList';
import StaffList from './screens/manager/StaffList';
import StaffDetailView from './screens/manager/StaffDetailView';
import BatchList from './screens/manager/BatchList';
import BatchCreateWizard from './screens/manager/BatchCreateWizard';
import ExamSessionCreate from './screens/manager/ExamSessionCreate';
import PublishResultsModal from './screens/manager/PublishResultsModal';
import QuestionBank from './screens/manager/QuestionBank';
import QuestionEditor from './screens/manager/QuestionEditor';
import TestBuilder from './screens/manager/TestBuilder';
import BrandingSettings from './screens/manager/BrandingSettings';
import InstituteBilling from './screens/manager/InstituteBilling';
import InstituteReports from './screens/manager/InstituteReports';

// Platform Admin Screens (10)
import TenantList from './screens/admin/TenantList';
import TenantDetailView from './screens/admin/TenantDetailView';
import GlobalUsers from './screens/admin/GlobalUsers';
import ContentLibrary from './screens/admin/ContentLibrary';
import PlanEditor from './screens/admin/PlanEditor';
import CouponsManager from './screens/admin/CouponsManager';
import FeatureFlags from './screens/admin/FeatureFlags';
import SystemHealth from './screens/admin/SystemHealth';
import SupportInbox from './screens/admin/SupportInbox';
import RevenueDashboard from './screens/admin/RevenueDashboard';

// Role-Based Access Control Screen White-Lists
const ROLE_SCREEN_MAP = {
  [ROLES.STUDENT]: new Set([
    'dashboard', 'test-library', 'exam-taking', 'my-results',
    'listening-detail', 'reading-detail', 'writing-detail',
    'speaking-detail', 'answer-review', 'progress-analytics',
    'speaking-booking', 'profile', 'notifications',
    'subscription', 'invoices', 'help'
  ]),
  [ROLES.TEACHER]: new Set([
    'teacher-dashboard', 'speaking-interview', 'my-batches',
    'batch-detail', 'student-detail', 'assign-test', 'teacher-reports'
  ]),
  [ROLES.MANAGER]: new Set([
    'institute-dashboard', 'branches', 'staff-list', 'staff-detail',
    'batch-list', 'batch-create', 'exam-session-create', 'publish-results',
    'question-bank', 'question-editor', 'test-builder', 'branding',
    'institute-billing', 'institute-reports'
  ]),
  [ROLES.PLATFORM_ADMIN]: new Set([
    'tenant-list', 'tenant-detail', 'global-users', 'content-library',
    'plan-editor', 'coupons', 'feature-flags', 'system-health',
    'support-inbox', 'revenue-dashboard'
  ])
};

const DEFAULT_SCREENS = {
  [ROLES.STUDENT]: 'dashboard',
  [ROLES.TEACHER]: 'teacher-dashboard',
  [ROLES.MANAGER]: 'institute-dashboard',
  [ROLES.PLATFORM_ADMIN]: 'tenant-list'
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edumax_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return CURRENT_USERS[ROLES.STUDENT];
  });

  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const saved = localStorage.getItem('edumax_user');
      if (saved) {
        const u = JSON.parse(saved);
        if (u.role) return u.role;
      }
    } catch (e) {}
    return ROLES.STUDENT;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getAuthToken();
  });

  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [notificationCount, setNotificationCount] = useState(3);

  // Verify existing token session on startup
  useEffect(() => {
    async function verifySession() {
      const existingToken = getAuthToken();
      if (existingToken) {
        const res = await api.getMe();
        if (res && res.success && res.data) {
          setCurrentUser(res.data);
          setCurrentRole(res.data.role);
          setIsAuthenticated(true);
        } else if (res && !res.success) {
          api.logout();
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    }
    verifySession();
  }, []);

  // Sync notifications from backend when logged in
  useEffect(() => {
    if (!isAuthenticated) return;
    async function loadNotifs() {
      const res = await api.getNotifications();
      if (res && res.success && Array.isArray(res.data)) {
        const unread = res.data.filter(n => !n.read).length;
        setNotificationCount(unread);
      }
    }
    loadNotifs();
  }, [activeScreen, isAuthenticated]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000);
  };

  // Global Command+K Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Login (Email or Social Auth - Google / LinkedIn)
  const handleLoginSuccess = (user, token) => {
    setCurrentRole(user.role);
    setCurrentUser(user);
    setAuthToken(token);
    try {
      localStorage.setItem('edumax_user', JSON.stringify(user));
    } catch (e) {}
    setIsAuthenticated(true);
    setActiveScreen(DEFAULT_SCREENS[user.role] || 'dashboard');
    setMobileMenuOpen(false);
    showToast(`Access granted! Signed in as ${user.name} (${user.role.toUpperCase()}).`);
  };

  // Sign out - completely terminates session and directs to AuthPage
  const handleSignOut = () => {
    api.logout();
    setAuthToken('');
    try {
      localStorage.removeItem('edumax_user');
    } catch (e) {}
    setIsAuthenticated(false);
    setActiveScreen('dashboard');
    showToast('Signed out of Edumax Cloud successfully.', 'info');
  };

  const handleSelectScreenFromSearch = (role, screen) => {
    if (role === currentRole) {
      setActiveScreen(screen);
      setMobileMenuOpen(false);
    }
  };

  // RBAC Access Guard: Returns false if screen doesn't belong to current role
  const isScreenAuthorized = (role, screen) => {
    const allowed = ROLE_SCREEN_MAP[role];
    return allowed ? allowed.has(screen) : false;
  };

  // Render the appropriate screen
  const renderCurrentScreen = () => {
    // Strict RBAC Enforcement: Check authorization
    if (!isScreenAuthorized(currentRole, activeScreen)) {
      return (
        <AccessDenied 
          currentRole={currentRole}
          attemptedScreen={activeScreen}
          onReturnHome={() => setActiveScreen(DEFAULT_SCREENS[currentRole])}
          onSignOut={handleSignOut}
        />
      );
    }

    // --- Student Screens (15 + Exam Simulator) ---
    if (currentRole === ROLES.STUDENT) {
      switch (activeScreen) {
        case 'dashboard':
          return <StudentDashboard onNavigate={(screen) => setActiveScreen(screen)} />;
        case 'test-library':
          return <TestLibrary onStartTest={() => setActiveScreen('exam-taking')} />;
        case 'exam-taking':
          return (
            <ExamTakingSession 
              onCancel={() => setActiveScreen('test-library')}
              onExamSubmitted={(newResult) => {
                showToast(`Mock exam submitted! AI evaluated your overall score at Band ${newResult.overallBand}.`);
                setActiveScreen('my-results');
              }}
            />
          );
        case 'my-results':
          return <MyResultsList onNavigate={(screen) => setActiveScreen(screen)} />;
        case 'listening-detail':
          return <ListeningResultDetail onBack={() => setActiveScreen('my-results')} onReviewAnswers={() => setActiveScreen('answer-review')} />;
        case 'reading-detail':
          return <ReadingResultDetail onBack={() => setActiveScreen('my-results')} onReviewAnswers={() => setActiveScreen('answer-review')} />;
        case 'writing-detail':
          return <WritingResultDetail onBack={() => setActiveScreen('my-results')} />;
        case 'speaking-detail':
          return <SpeakingResultDetail onBack={() => setActiveScreen('my-results')} />;
        case 'answer-review':
          return <AnswerReview onBack={() => setActiveScreen('my-results')} />;
        case 'progress-analytics':
          return <ProgressAnalytics />;
        case 'speaking-booking':
          return <SpeakingBooking />;
        case 'profile':
          return <StudentProfile />;
        case 'notifications':
          return <NotificationSettings />;
        case 'subscription':
          return <SubscriptionBilling onNavigate={(screen) => setActiveScreen(screen)} />;
        case 'invoices':
          return <InvoicesList onBack={() => setActiveScreen('subscription')} />;
        case 'help':
          return <StudentHelp />;
        default:
          return <StudentDashboard onNavigate={(screen) => setActiveScreen(screen)} />;
      }
    }

    // --- Teacher Screens (7) ---
    if (currentRole === ROLES.TEACHER) {
      switch (activeScreen) {
        case 'teacher-dashboard':
          return <TeacherDashboard onNavigate={(screen) => setActiveScreen(screen)} />;
        case 'speaking-interview':
          return (
            <SpeakingInterviewConsole 
              onFinish={() => {
                showToast("Live Speaking Interview evaluated and published to student queue!");
                setActiveScreen('teacher-dashboard');
              }} 
            />
          );
        case 'my-batches':
          return <TeacherBatches onSelectBatch={() => setActiveScreen('batch-detail')} onAssignTest={() => setActiveScreen('assign-test')} />;
        case 'batch-detail':
          return <BatchDetail onBack={() => setActiveScreen('my-batches')} onSelectStudent={() => setActiveScreen('student-detail')} onAssignTest={() => setActiveScreen('assign-test')} />;
        case 'student-detail':
          return <StudentDetailView onBack={() => setActiveScreen('batch-detail')} onAssignTest={() => setActiveScreen('assign-test')} />;
        case 'assign-test':
          return (
            <AssignTestModal 
              onBack={() => setActiveScreen('my-batches')} 
              onComplete={() => {
                showToast("Test paper distributed to cohort students with access rules.");
                setActiveScreen('my-batches');
              }} 
            />
          );
        case 'teacher-reports':
          return <TeacherReports />;
        default:
          return <TeacherDashboard onNavigate={(screen) => setActiveScreen(screen)} />;
      }
    }

    // --- Manager Screens (14) ---
    if (currentRole === ROLES.MANAGER) {
      switch (activeScreen) {
        case 'institute-dashboard':
          return <InstituteDashboard onNavigate={(screen) => setActiveScreen(screen)} />;
        case 'branches':
          return <BranchesList onBack={() => setActiveScreen('institute-dashboard')} />;
        case 'staff-list':
          return <StaffList onSelectStaff={() => setActiveScreen('staff-detail')} />;
        case 'staff-detail':
          return <StaffDetailView onBack={() => setActiveScreen('staff-list')} />;
        case 'batch-list':
          return <BatchList onCreateBatch={() => setActiveScreen('batch-create')} onSelectBatch={() => setActiveScreen('batch-list')} />;
        case 'batch-create':
          return (
            <BatchCreateWizard 
              onBack={() => setActiveScreen('batch-list')} 
              onComplete={() => {
                showToast("New cohort launched and open for candidate enrollment!");
                setActiveScreen('batch-list');
              }} 
            />
          );
        case 'exam-session-create':
          return (
            <ExamSessionCreate 
              onBack={() => setActiveScreen('institute-dashboard')} 
              onComplete={() => {
                showToast("Exam session scheduled with access PIN!");
                setActiveScreen('institute-dashboard');
              }} 
            />
          );
        case 'publish-results':
          return <PublishResultsModal onBack={() => setActiveScreen('institute-dashboard')} />;
        case 'question-bank':
          return <QuestionBank onOpenEditor={() => setActiveScreen('question-editor')} onCreateTest={() => setActiveScreen('test-builder')} />;
        case 'question-editor':
          return (
            <QuestionEditor 
              onBack={() => setActiveScreen('question-bank')} 
              onComplete={() => {
                showToast("Question asset saved to Private Institute Bank!");
                setActiveScreen('question-bank');
              }} 
            />
          );
        case 'test-builder':
          return (
            <TestBuilder 
              onBack={() => setActiveScreen('question-bank')} 
              onComplete={() => {
                showToast("Exam paper assembled and verified!");
                setActiveScreen('question-bank');
              }} 
            />
          );
        case 'branding':
          return <BrandingSettings />;
        case 'institute-billing':
          return <InstituteBilling />;
        case 'institute-reports':
          return <InstituteReports />;
        default:
          return <InstituteDashboard onNavigate={(screen) => setActiveScreen(screen)} />;
      }
    }

    // --- Platform Admin Screens (10) ---
    if (currentRole === ROLES.PLATFORM_ADMIN) {
      switch (activeScreen) {
        case 'tenant-list':
          return <TenantList onSelectTenant={() => setActiveScreen('tenant-detail')} />;
        case 'tenant-detail':
          return <TenantDetailView onBack={() => setActiveScreen('tenant-list')} />;
        case 'global-users':
          return <GlobalUsers />;
        case 'content-library':
          return <ContentLibrary />;
        case 'plan-editor':
          return <PlanEditor />;
        case 'coupons':
          return <CouponsManager />;
        case 'feature-flags':
          return <FeatureFlags />;
        case 'system-health':
          return <SystemHealth />;
        case 'support-inbox':
          return <SupportInbox />;
        case 'revenue-dashboard':
          return <RevenueDashboard />;
        default:
          return <TenantList onSelectTenant={() => setActiveScreen('tenant-detail')} />;
      }
    }

    return <StudentDashboard onNavigate={(screen) => setActiveScreen(screen)} />;
  };

  // If not authenticated, render the dedicated AuthPage with Google & LinkedIn social login
  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="ambient-glow" />
        <AuthPage onLoginSuccess={handleLoginSuccess} />
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ message: '', type: 'success' })} 
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Background Ambient Mesh Glow */}
      <div className="ambient-glow" />

      {/* Global Left Navigation Sidebar with responsive drawer support */}
      <Sidebar 
        currentRole={currentRole} 
        activeScreen={activeScreen} 
        setActiveScreen={(s) => {
          setActiveScreen(s);
          setMobileMenuOpen(false);
        }} 
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main App Canvas */}
      <div className="main-wrapper">
        <Navbar 
          currentRole={currentRole}
          activeScreen={activeScreen}
          onOpenSearch={() => setSearchOpen(true)}
          onSignOut={handleSignOut}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          notificationCount={notificationCount}
        />

        <main className="content-area">
          {renderCurrentScreen()}
        </main>
      </div>

      {/* Global Quick Search (⌘K) Modal - Role Isolated */}
      <GlobalSearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        onSelectScreen={handleSelectScreenFromSearch}
        currentRole={currentRole}
      />

      {/* Toast Alert Feedback */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
}
