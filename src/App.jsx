import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

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

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [notificationCount, setNotificationCount] = useState(3);

  // Parse current route: e.g. /student/test-library or /login
  const pathParts = location.pathname.split('/').filter(Boolean);
  const routePrefix = pathParts[0]; // 'student' | 'teacher' | 'manager' | 'admin' | 'login'
  const routeScreen = pathParts[1] || DEFAULT_SCREENS[currentRole] || 'dashboard';

  // Active screen identifier for sidebar and rendering
  const activeScreen = (routePrefix === currentRole && routeScreen) ? routeScreen : (DEFAULT_SCREENS[currentRole] || 'dashboard');

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

  // Handle URL route synchronization and redirects
  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
      return;
    }

    // If authenticated and on /login or root /, redirect to user's authorized home
    if (location.pathname === '/login' || location.pathname === '/' || pathParts.length === 0) {
      navigate(`/${currentRole}/${DEFAULT_SCREENS[currentRole]}`, { replace: true });
    }
  }, [isAuthenticated, location.pathname, currentRole]);

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
  }, [location.pathname, isAuthenticated]);

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

  // Navigation handler pushing URL to browser history
  const handleNavigate = (screen) => {
    navigate(`/${currentRole}/${screen}`);
    setMobileMenuOpen(false);
  };

  // Handle Login (Email or Social Auth - Google / LinkedIn)
  const handleLoginSuccess = (user, token) => {
    setCurrentRole(user.role);
    setCurrentUser(user);
    setAuthToken(token);
    try {
      localStorage.setItem('edumax_user', JSON.stringify(user));
    } catch (e) {}
    setIsAuthenticated(true);
    setMobileMenuOpen(false);
    navigate(`/${user.role}/${DEFAULT_SCREENS[user.role] || 'dashboard'}`);
    showToast(`Access granted! Signed in as ${user.name} (${user.role.toUpperCase()}).`);
  };

  // Sign out - completely terminates session and directs to /login
  const handleSignOut = () => {
    api.logout();
    setAuthToken('');
    try {
      localStorage.removeItem('edumax_user');
    } catch (e) {}
    setIsAuthenticated(false);
    navigate('/login');
    showToast('Signed out of Edumax Cloud successfully.', 'info');
  };

  const handleSelectScreenFromSearch = (role, screen) => {
    if (role === currentRole) {
      handleNavigate(screen);
    }
  };

  // RBAC Access Guard: Returns false if screen or route role doesn't belong to current role
  const isAuthorized = () => {
    // Check if visiting another role's route prefix
    if (routePrefix && routePrefix !== currentRole && Object.values(ROLES).includes(routePrefix)) {
      return false;
    }
    const allowed = ROLE_SCREEN_MAP[currentRole];
    return allowed ? allowed.has(activeScreen) : false;
  };

  // Render the appropriate screen
  const renderCurrentScreen = () => {
    // Strict RBAC Enforcement: Check authorization
    if (!isAuthorized()) {
      return (
        <AccessDenied 
          currentRole={currentRole}
          attemptedScreen={location.pathname}
          onReturnHome={() => handleNavigate(DEFAULT_SCREENS[currentRole])}
          onSignOut={handleSignOut}
        />
      );
    }

    // --- Student Screens (15 + Exam Simulator) ---
    if (currentRole === ROLES.STUDENT) {
      switch (activeScreen) {
        case 'dashboard':
          return <StudentDashboard onNavigate={handleNavigate} />;
        case 'test-library':
          return <TestLibrary onStartTest={() => handleNavigate('exam-taking')} />;
        case 'exam-taking':
          return (
            <ExamTakingSession 
              onCancel={() => handleNavigate('test-library')}
              onExamSubmitted={(newResult) => {
                showToast(`Mock exam submitted! AI evaluated your overall score at Band ${newResult?.overallBand || '7.5'}.`);
                handleNavigate('my-results');
              }}
            />
          );
        case 'my-results':
          return <MyResultsList onNavigate={handleNavigate} />;
        case 'listening-detail':
          return <ListeningResultDetail onBack={() => handleNavigate('my-results')} onReviewAnswers={() => handleNavigate('answer-review')} />;
        case 'reading-detail':
          return <ReadingResultDetail onBack={() => handleNavigate('my-results')} onReviewAnswers={() => handleNavigate('answer-review')} />;
        case 'writing-detail':
          return <WritingResultDetail onBack={() => handleNavigate('my-results')} />;
        case 'speaking-detail':
          return <SpeakingResultDetail onBack={() => handleNavigate('my-results')} onBookSlot={() => handleNavigate('speaking-booking')} />;
        case 'answer-review':
          return <AnswerReview onBack={() => handleNavigate('my-results')} />;
        case 'progress-analytics':
          return <ProgressAnalytics onNavigate={handleNavigate} />;
        case 'speaking-booking':
          return <SpeakingBooking onNavigate={handleNavigate} />;
        case 'profile':
          return <StudentProfile />;
        case 'notifications':
          return <NotificationSettings />;
        case 'subscription':
          return <SubscriptionBilling onNavigate={handleNavigate} />;
        case 'invoices':
          return <InvoicesList onNavigate={handleNavigate} />;
        case 'help':
          return <StudentHelp />;
        default:
          return <StudentDashboard onNavigate={handleNavigate} />;
      }
    }

    // --- Teacher Screens (7) ---
    if (currentRole === ROLES.TEACHER) {
      switch (activeScreen) {
        case 'teacher-dashboard':
          return <TeacherDashboard onNavigate={handleNavigate} />;
        case 'speaking-interview':
          return (
            <SpeakingInterviewConsole 
              onFinish={() => {
                showToast('Speaking score certified and locked!');
                handleNavigate('teacher-dashboard');
              }} 
            />
          );
        case 'my-batches':
          return <TeacherBatches onSelectBatch={() => handleNavigate('batch-detail')} />;
        case 'batch-detail':
          return <BatchDetail onBack={() => handleNavigate('my-batches')} onSelectStudent={() => handleNavigate('student-detail')} />;
        case 'student-detail':
          return <StudentDetailView onBack={() => handleNavigate('batch-detail')} onAssignTest={() => handleNavigate('assign-test')} />;
        case 'assign-test':
          return <AssignTestModal onClose={() => handleNavigate('teacher-dashboard')} onAssigned={() => handleNavigate('teacher-dashboard')} />;
        case 'teacher-reports':
          return <TeacherReports />;
        default:
          return <TeacherDashboard onNavigate={handleNavigate} />;
      }
    }

    // --- Institute Manager Screens (14) ---
    if (currentRole === ROLES.MANAGER) {
      switch (activeScreen) {
        case 'institute-dashboard':
          return <InstituteDashboard onNavigate={handleNavigate} />;
        case 'branches':
          return <BranchesList onSelectBranch={() => handleNavigate('staff-list')} />;
        case 'staff-list':
          return <StaffList onSelectStaff={() => handleNavigate('staff-detail')} />;
        case 'staff-detail':
          return <StaffDetailView onBack={() => handleNavigate('staff-list')} />;
        case 'batch-list':
          return <BatchList onSelectBatch={() => handleNavigate('batch-create')} />;
        case 'batch-create':
          return <BatchCreateWizard onBack={() => handleNavigate('batch-list')} onComplete={() => handleNavigate('batch-list')} />;
        case 'exam-session-create':
          return <ExamSessionCreate onBack={() => handleNavigate('institute-dashboard')} onCreated={() => handleNavigate('institute-dashboard')} />;
        case 'publish-results':
          return <PublishResultsModal onClose={() => handleNavigate('institute-dashboard')} onPublished={() => handleNavigate('institute-dashboard')} />;
        case 'question-bank':
          return <QuestionBank onEditQuestion={() => handleNavigate('question-editor')} onNewQuestion={() => handleNavigate('question-editor')} />;
        case 'question-editor':
          return <QuestionEditor onBack={() => handleNavigate('question-bank')} onSaved={() => handleNavigate('question-bank')} />;
        case 'test-builder':
          return <TestBuilder onBack={() => handleNavigate('question-bank')} />;
        case 'branding':
          return <BrandingSettings />;
        case 'institute-billing':
          return <InstituteBilling />;
        case 'institute-reports':
          return <InstituteReports />;
        default:
          return <InstituteDashboard onNavigate={handleNavigate} />;
      }
    }

    // --- Platform Admin Screens (10) ---
    if (currentRole === ROLES.PLATFORM_ADMIN) {
      switch (activeScreen) {
        case 'tenant-list':
          return <TenantList onSelectTenant={() => handleNavigate('tenant-detail')} />;
        case 'tenant-detail':
          return <TenantDetailView onBack={() => handleNavigate('tenant-list')} />;
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
          return <TenantList onSelectTenant={() => handleNavigate('tenant-detail')} />;
      }
    }

    return <StudentDashboard onNavigate={handleNavigate} />;
  };

  // If on /login or not authenticated, render the dedicated AuthPage with Google & LinkedIn social login
  if (!isAuthenticated || location.pathname === '/login') {
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
        setActiveScreen={handleNavigate} 
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
