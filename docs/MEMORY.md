# Edumax SaaS — Persistent Codebase Memory & Deployment Ledger

> **Last Updated**: 2026-10-05
> **Status**: Active & Evergreen

## 1. Project Identity & Philosophy
- **Mission**: Enterprise IELTS mock examination, live speaking evaluation, AI writing diagnostics, batch cohort analytics, and multi-tenant institute management cloud platform.
- **Architectural Tenets**:
  - Zero AI slop: no useless decorative pills or redundant narrative text.
  - 60/30/10 visual balance: 60% clean canvas surfaces, 30% structural hierarchy and typography, 10% intentional brand accent (Edumax Crimson `#C81E2E`).
  - Strict RBAC: Student, Teacher, Manager, and Platform Admin boundaries with client + backend gating.
  - Concurrency safety: Mutex locking on speaking slots, exam sessions, and seat provisioning.

## 2. Process Topology & Runtime Ports
| Service | Runtime / Host | Port / Route | Responsibility |
| :--- | :--- | :--- | :--- |
| **Vite Dev Server** | Node.js (Vite 8) | `http://localhost:5173/` | Local frontend dev & hot module replacement |
| **Express Backend** | Node.js / Express 5 | `http://localhost:5001/` | Local REST API, RBAC middleware & mutex concurrency |
| **FuncHole Gateway** | Edge / CDN | `https://5zyu0p.funchole.dev/edumax/` | Production cloud deployment & static asset delivery |

## 3. Design System & Craft Foundation
- **Design Inspiration**: shadcn/ui minimal aesthetic combined with Emil Kowalski & Jakub Krehel interaction polish.
- **Iconography**: Complete Lucide React icon set with precise stroke widths (`1.5px` - `1.75px`) and optical alignment.
- **Installed Skills**:
  - `emilkowalski/skill` (14 skills): `emil-design-eng`, `animate`, `animate-expo`, `apple-design`, `ask-sonner`, `break-ui`, etc.
  - `jakubkrehel/skills` (11 skills): `better-ui`, `better-layout`, `better-colors`, `better-typography`, `better-accessibility`, etc.
- **Micro-Interactions**:
  - Emil motion spring curve: `cubic-bezier(0.2, 0, 0, 1)`
  - Tactile physical press states: `scale(0.97)` on buttons, `scale(0.99)` on interactive cards
  - High-precision concentric border radius hierarchy: `8px`, `12px`, `14px`, `20px`
  - Tabular numeric figures across metrics and tables: `font-variant-numeric: tabular-nums`

## 4. Cloud Deployment (FuncHole)
- **Host**: `https://5zyu0p.funchole.dev/`
- **Subpath Route**: `https://5zyu0p.funchole.dev/edumax/`
- **Gateway ID**: `cad6c072-f4a3-4d63-8a9e-3a211218d99e`
- **Function Key**: `fn_edumax` (`8190758a-9565-45a1-ba86-602cb2ad91bf`)
- **Runtime**: `STATIC`
- **Active FunctionVersion**: `c154c9da-2157-4fc1-8ee6-5ea6c3bb1736` (READY)
- **Flow Key**: `flw_edumax` (`930b98a8-0b70-494e-8099-9899518c0d87`)
- **Active FlowVersion**: `f0b7f043-d2d8-42e1-a9f0-1d0f968394db` (ADOPTED)
- **Deployment Script**: `scripts/deploy-funchole.js` (`npm run deploy`)

## 5. Verification Suite
- **RBAC Security Boundaries**: `npm run test:rbac` (4/4 passed)
- **Atomic Mutex Concurrency**: `npm run test:concurrency` (50 simultaneous requests, 1 granted, 49 prevented)
- **Playwright E2E Suite**: `npm run test:e2e` (12/12 flows passed, 33/33 assertions)
- **Live Cloud E2E Verification**: Chrome Playwright test on `https://5zyu0p.funchole.dev/edumax/` verified Google auth, LinkedIn examiner auth, clean sign out, and manager portal routing.
- **Production Build**: `npm run build` (Clean client bundle in <200ms)

## 6. Evolution & Decision Log
- **2026-10-05**: Added `emilkowalski/skill` and `jakubkrehel/skills` packages. Refactored styling into a minimal shadcn-inspired design system with Lucide icons. Provisioned FuncHole Function `fn_edumax` and Flow `flw_edumax` at `/edumax/*`. Built automated deployment pipeline (`scripts/deploy-funchole.js`). Verified live application on FuncHole edge.
