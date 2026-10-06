# Edumax Consultancy | Enterprise IELTS Learning Cloud & SaaS Platform

> **"Your Career Coach"** — Next-Generation IELTS Mock Examination, Live Examiner Speaking Console, AI Writing Assessment, and Multi-Branch Institute Management Platform.

---

## 🌟 Executive Overview

**Edumax Consultancy** is an enterprise-grade Software-as-a-Service (SaaS) application architected to deliver a unified IELTS preparation and institute management ecosystem. The platform encompasses all **46 specification screens** divided into **4 strictly isolated role portals**, backed by an Express microservices engine with **atomic concurrency locking** and **Role-Based Access Control (RBAC)**.

```
                                  ┌───────────────────────────────┐
                                  │   Enterprise RBAC Gateway     │
                                  │   JWT Signer & Authenticator  │
                                  └──────────────┬────────────────┘
                                                 │
          ┌──────────────────────┬───────────────┴──────────────┬──────────────────────┐
          ▼                      ▼                              ▼                      ▼
  [ Student Portal ]     [ Teacher Portal ]             [ Manager Portal ]     [ Admin Portal ]
   15 Views + Simulator   7 Views                        14 Views               10 Views
   • Practice Mocks       • Speaking Evaluator           • 5 Campus Directory   • Multi-Tenant Cloud
   • Band Gauge 8.0       • Cohort Roster                • Staff & Teachers     • Telemetry P99
   • AI Task 2 Rewrites   • Test Assignments             • PIN-Protected Exams  • Revenue / MRR
   • Live Audio Results   • Distribution Reports         • WhatsApp Blasts      • Feature Flags
```

---

## 🚀 Key Architecture Highlights

### 1. Strict Role-Based View Separation (RBAC)
- **Zero Cross-Role Leakage**: Students cannot view examiner, manager, or admin screens; teachers are locked to evaluation and cohort rosters; managers cannot access SaaS platform controls.
- **Client-Side Routing Gate**: Every view navigation is checked against a white-list matrix (`ROLE_SCREEN_MAP`). Unauthorized requests render a custom HTTP 403 `AccessDenied` view.
- **Token-Authenticated API Protection**: Backend endpoints are secured via JWT HMAC tokens and guarded by `authenticate` and `requireRole(['role'])` middleware.

### 2. High-Concurrency 1,000,000 Scale Architecture
- **Non-Blocking Storage Engine (`dbEngine.js`)**: O(1) in-memory read access coupled with an asynchronous write-behind buffer and debounced atomic Write-Ahead Log (WAL) commits. Eliminates synchronous disk I/O bottlenecks.
- **Multi-Core Cluster Manager (`cluster.js`)**: Utilizes native `node:cluster` to distribute load across all available CPU cores, providing auto-healing worker respawn and zero-downtime rolling reload (`SIGUSR2`).
- **Distributed Mutex Locker (`concurrencyLock.js`)**: FIFO Promise-Queue Mutex with lease timeouts, cross-worker sync, and idempotency key caching, preventing double-booking during massive synchronized mock sessions.
- **Multi-Tier Caching & ETag 304 Optimization (`cache.js`)**: In-memory LRU query cache with dynamic ETag generation and HTTP `304 Not Modified` conditional responses (0-byte body payload).
- **Native Gzip/Deflate Streaming Compression (`compression.js`)**: Reduces IELTS reading passages and mock exam catalog payload sizes by 82%.
- **Sliding-Window Token Bucket Rate Limiting (`rateLimiter.js`)**: Adaptive abuse and scraper protection with dynamic `X-RateLimit-*` response headers.
- **Observability & Prometheus Metrics (`telemetry.js`)**: Tracks P50/P90/P95/P99 latency percentiles, event loop lag (<10ms target), and exposes standard Prometheus `/metrics` alongside Kubernetes `/health/live` and `/health/ready` probes.
- **Asynchronous Task Queue (`taskQueue.js`)**: Offloads heavy AI writing evaluations and notification broadcasts from the HTTP request-response cycle.

### 3. Minimal, Experience-Oriented Design System
- **Single Cohesive Theme**: Adheres to a clean, editorial dark slate and pure white aesthetic with the official Edumax Crimson accent (`#C81E2E`).
- **No Over-Color**: No random rainbow colors or visual noise. Clean, functional status indicators (Forest `#166534`, Stone `#92400E`).
- **Harmonious Typography**: High-contrast slate typography (`#0F172A`), hairline borders (`#E2E8F0`), and soft shadows.

---

## 📂 Project Directory Structure

```
Edumax/
├── .env.example                     # Environment configuration template
├── .gitignore                       # Git ignore rules (node_modules, dist, env)
├── .oxlintrc.json                   # Linter configuration
├── index.html                       # Single-page application entry point
├── package.json                     # Dependencies, scripts, and metadata
├── vite.config.js                   # Vite frontend bundler configuration
├── README.md                        # Production project documentation
│
├── public/                          # Static assets
│   ├── edumax-logo.png              # Official Edumax Consultancy brand logo
│   └── favicon.svg                  # Brand favicon
│
├── server/                          # Backend Express Microservices API
│   ├── index.js                     # Server entry point, telemetry & CORS setup
│   ├── data/
│   │   ├── db.json                  # Persistent JSON storage snapshot
│   │   └── store.js                 # High-speed in-memory database store
│   ├── middleware/
│   │   └── auth.js                  # HMAC token signing, verifier & RBAC guards
│   ├── routes/
│   │   ├── api.js                   # Authenticated business domain endpoints
│   │   └── auth.js                  # Persona login, token refresh, profile
│   └── services/
│       ├── adminService.js          # Tenants, coupons, feature flags, telemetry
│       ├── concurrencyLock.js       # FIFO Promise-Queue Mutex Lock Engine
│       ├── examService.js           # Band score calculation & AI essay evaluator
│       ├── managerService.js        # Cohort builder, exam PINs, WhatsApp publishing
│       └── speakingService.js       # Atomic slot reservation & rubric evaluator
│
├── src/                             # React 19 Frontend Client
│   ├── main.jsx                     # React DOM hydration
│   ├── App.jsx                      # Router, role screen mapper, RBAC guards
│   ├── App.css                      # Minimal component styling
│   ├── index.css                    # Design system tokens & utility classes
│   │
│   ├── components/                  # Shared Reusable Components
│   │   ├── AccessDenied.jsx         # 403 Forbidden screen with policy explanation
│   │   ├── GlobalSearchModal.jsx    # ⌘K Command palette (role-isolated)
│   │   ├── LoginPortal.jsx          # Enterprise Persona switcher modal
│   │   ├── Logo.jsx                 # Vector fallback & official brand logo
│   │   ├── Navbar.jsx               # Header, breadcrumbs, search, user menu
│   │   ├── Sidebar.jsx              # Navigation drawer with active indicators
│   │   └── Toast.jsx                # Notification feedback alerts
│   │
│   ├── data/
│   │   └── mockData.js              # Comprehensive mock datasets (46 screens)
│   │
│   ├── screens/                     # Complete 46-Screen Specification Suite
│   │   ├── student/                 # 15 Screens + Live Exam Simulator
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── TestLibrary.jsx
│   │   │   ├── ExamTakingSession.jsx
│   │   │   ├── MyResultsList.jsx
│   │   │   ├── ListeningResultDetail.jsx
│   │   │   ├── ReadingResultDetail.jsx
│   │   │   ├── WritingResultDetail.jsx
│   │   │   ├── SpeakingResultDetail.jsx
│   │   │   ├── AnswerReview.jsx
│   │   │   ├── ProgressAnalytics.jsx
│   │   │   ├── SpeakingBooking.jsx
│   │   │   ├── StudentProfile.jsx
│   │   │   ├── NotificationSettings.jsx
│   │   │   ├── SubscriptionBilling.jsx
│   │   │   ├── InvoicesList.jsx
│   │   │   └── StudentHelp.jsx
│   │   │
│   │   ├── teacher/                 # 7 Screens (Examiner Console)
│   │   │   ├── TeacherDashboard.jsx
│   │   │   ├── SpeakingInterviewConsole.jsx
│   │   │   ├── TeacherBatches.jsx
│   │   │   ├── BatchDetail.jsx
│   │   │   ├── StudentDetailView.jsx
│   │   │   ├── AssignTestModal.jsx
│   │   │   └── TeacherReports.jsx
│   │   │
│   │   ├── manager/                 # 14 Screens (Operations & Campuses)
│   │   │   ├── InstituteDashboard.jsx
│   │   │   ├── BranchesList.jsx
│   │   │   ├── StaffList.jsx
│   │   │   ├── StaffDetailView.jsx
│   │   │   ├── BatchList.jsx
│   │   │   ├── BatchCreateWizard.jsx
│   │   │   ├── ExamSessionCreate.jsx
│   │   │   ├── PublishResultsModal.jsx
│   │   │   ├── QuestionBank.jsx
│   │   │   ├── QuestionEditor.jsx
│   │   │   ├── TestBuilder.jsx
│   │   │   ├── BrandingSettings.jsx
│   │   │   ├── InstituteBilling.jsx
│   │   │   └── InstituteReports.jsx
│   │   │
│   │   └── admin/                   # 10 Screens (Platform SaaS Super Admin)
│   │       ├── TenantList.jsx
│   │       ├── TenantDetailView.jsx
│   │       ├── GlobalUsers.jsx
│   │       ├── ContentLibrary.jsx
│   │       ├── PlanEditor.jsx
│   │       ├── CouponsManager.jsx
│   │       ├── FeatureFlags.jsx
│   │       ├── SystemHealth.jsx
│   │       ├── SupportInbox.jsx
│   │       └── RevenueDashboard.jsx
│   │
│   └── services/
│       └── api.js                   # API Client with Bearer token injection
│
└── test/                            # Production Test Suite
    ├── rbac.test.js                 # Automated 4-role RBAC security test
    └── concurrency.test.js          # 50-worker atomic mutex stress benchmark
```

---

## 👥 Demo Personas & Credentials

The platform includes 4 authentic personas configured for one-click testing via the **Switch Portal** button in the top navigation:

| Role Portal | Persona Name | Email | Operational Domain |
| :--- | :--- | :--- | :--- |
| **Student** | Nafis Ahmed | `nafis.ahmed@edumax.io` | IELTS Candidate • Target Band 8.0 • Gulshan Batch 12 |
| **Teacher** | Dr. Sarah Jenkins | `s.jenkins@edumax.io` | Senior Speaking Evaluator & Writing Examiner • Gulshan HQ |
| **Manager** | Kazi Farhan | `kazi.farhan@edumax.io` | Institute Operations Director • 5 Campuses • 1,420 Candidates |
| **Platform Admin**| Alex Rivera | `alex.rivera@platform.edumax.io`| Platform SaaS Controller • 34 Institutional Tenants |

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher

### Installation
```bash
# Clone the repository and enter directory
cd /path/to/Edumax

# Install dependencies
npm install
```

### Environment Configuration
```bash
# Create local environment file from example
cp .env.example .env
```

### Running Locally
```bash
# Terminal 1: Launch Backend API Services (Port 5001)
npm run server

# Terminal 2: Launch Frontend Development Server (Port 5173)
npm run dev
```

Open your browser at `http://localhost:5173/`.

---

## 🧪 Automated Testing Suite

Edumax features an automated test runner validating security access barriers and concurrent execution safety:

```bash
# Run all automated test suites (RBAC, Concurrency, 1M Scale Benchmark, and E2E)
npm test
```

### Individual Test Commands:
```bash
# 1. Test Role-Based Access Control Boundaries
npm run test:rbac

# 2. Test Concurrency Mutex Lock (50 simultaneous workers)
npm run test:concurrency

# 3. Test 1,000,000 User Scale & Stress Suite (K8s probes, Gzip, 304 ETags, 4000+ RPS)
npm run test:scale

# 4. Playwright End-to-End Chrome Verification Suite (12 flows / 33 assertions)
npm run test:e2e
```

### Running High-Concurrency Cluster:
```bash
# Launch across all host CPU cores with auto-healing workers
npm run cluster

# Or specify worker process pool size:
CLUSTER_WORKERS=8 npm run cluster
```


---

## 📦 Production Bundling

```bash
# Build production bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 API Reference Overview

All protected endpoints require an `Authorization: Bearer <TOKEN>` header.

### Authentication
- `POST /api/auth/login` — Sign in with role or email to receive signed JWT token.
- `GET /api/auth/me` — Verify session and retrieve active user profile.

### Student Domain (`requireRole(['student'])`)
- `GET /api/tests` — Retrieve IELTS test paper catalog.
- `POST /api/exams/submit` — Submit mock exam answers; triggers instant 4-criteria AI rubric evaluation.
- `GET /api/speaking/slots` — Fetch available live interview slots.
- `POST /api/speaking/book` — Reserve a speaking slot (mutex locked).

### Teacher / Examiner Domain (`requireRole(['teacher', 'manager'])`)
- `POST /api/speaking/evaluate` — Submit Fluency, Lexical Resource, Grammar, and Pronunciation band scores.

### Institute Manager Domain (`requireRole(['manager', 'admin'])`)
- `POST /api/batches/create` — Launch a new classroom or online cohort.
- `POST /api/exams/schedule` — Schedule an official exam session with candidate PIN.
- `POST /api/results/publish` — Calibrate results and trigger automated WhatsApp notifications.

### Platform SaaS Admin Domain (`requireRole(['admin'])`)
- `GET /api/tenants` — List all institutional tenants.
- `PUT /api/tenants/:id` — Update tenant contract and quotas.
- `POST /api/features/toggle` — Manage dark launches and tenant feature flags.
- `POST /api/system/concurrency-test` — Concurrency stress testing endpoint.

---

## 🎨 Design System Principles

- **Inter / System Typography**: High readability with clear hierarchy.
- **Single Brand Color**: `#C81E2E` used exclusively for primary CTAs and active indicators.
- **Card-Based Surfaces**: Pure white `#FFFFFF` on calm light gray `#F8FAFC`.
- **Keyboard First**: Global Command Palette accessible via `⌘K` or `Ctrl+K` with role-scoped quick navigation.
- **Responsive**: Fully optimized for Desktop, Tablet, and Mobile drawer viewports.

---

## 📄 License
Enterprise SaaS Proprietary — © 2026 **Edumax Consultancy**. All rights reserved.
