---
name: playwright-e2e
description: Automated end-to-end browser testing and feature flow verification for Edumax SaaS using Playwright and macOS native Google Chrome.
---

# Playwright E2E Skill: Edumax SaaS

This skill orchestrates end-to-end browser testing for the Edumax IELTS learning SaaS platform across all 4 user roles (Student, Teacher, Manager, and Platform Admin). It directly leverages macOS Google Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`) for zero-dependency execution.

## Supported Verification Flows

1. **Authentication & Session Lifecycle**:
   - Gating: Verify unauthenticated users are forced to `/login`.
   - Social Sign-In: Validate Google Login (Candidates / Students) and LinkedIn Login (Examiners / Tutors).
   - In-App Switcher Elimination: Assert complete absence of "Switch Portal" and "Switch Role Account" inside authenticated sessions.
   - Clean Logout: Validate session termination, token clearance from `localStorage`, and redirection back to `/login`.

2. **Enterprise RBAC Gating**:
   - Ensure students cannot access `/manager/*` or `/admin/*` routes.
   - Ensure teachers cannot access `/admin/*` routes.
   - Confirm HTTP 403 `Restricted Portal View` renders with recovery actions.

3. **URL Routing & Browser History**:
   - Deep linking: Direct access to any authorized screen (e.g., `/student/progress-analytics`, `/teacher/speaking-interview`, `/manager/branches`).
   - Browser navigation: Back and Forward buttons correctly change active workspace state without losing session.

4. **Visual UI & Charts Verification**:
   - Verify SVG charts render without clipping:
     - 4-Skill IELTS Spider/Radar Chart (`SpiderChart.jsx`)
     - Modulix Track Bar Chart (`TrackBarChart.jsx`)
     - Inline Metric Sparklines (`Sparkline.jsx`)
     - Multi-Segment Donut Pie Charts (`DonutPieChart.jsx`)
     - 40-Question Item-by-Item Dot Matrix (`DotBarChart.jsx`)
     - Radial Band Attainment Gauge (`RoundCirclePie.jsx`)

5. **Transactional Business Flows**:
   - Exam simulator: Answer input, timer countdown, submission to `/api/exams/submit`.
   - Oral speaking reservation: Atomic slot booking with backend mutex lock against race conditions.
   - Speaking interview console: Real-time rubric grading (FC, LR, GRA, PR) and score publishing.
   - Cohort provisioning: Batch creation wizard submitting to `/api/batches/create`.

## Executing the Test Runner

From the project root:

```bash
# Run complete E2E test suite
npm run test:e2e

# Run all test layers (RBAC + Concurrency + E2E)
npm run test
```

Or via direct script invocation:

```bash
node e2e/runner.js
```

## Key Configuration

- **Browser Executable**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Default Viewport**: 1440x900 (High-DPI Desktop)
- **Base URL**: `http://localhost:5173`
- **Headless Mode**: Default `true` (set `headless: false` in `e2e/runner.js` for visual debugging)
