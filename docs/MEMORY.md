# Edumax SaaS — System Memory & Deployment Ledger

## 1. Overview
Edumax SaaS is an enterprise IELTS mock examination, live speaking evaluation, AI writing diagnostic, cohort analytics, and multi-tenant institute management cloud platform.

## 2. Design System & Craft Foundation
- **Design Inspiration**: shadcn/ui minimal aesthetic combined with Emil Kowalski & Jakub Krehel interaction polish.
- **Iconography**: Complete Lucide React icon set with precise stroke widths (`1.5px` - `1.75px`) and optical alignment.
- **Color System (60/30/10 Rule)**:
  - 60% Canvas / Structural Surface: `#FFFFFF` / `#F8FAFC`
  - 30% Architectural Neutrals & Typography: `#0F172A`, `#334155`, `#64748B`, `#E2E8F0`
  - 10% Purposeful Brand Accents: Edumax Crimson (`#C81E2E`) & Supporting Feedback Signals (Emerald `#10B981`, Amber `#F59E0B`)
- **Micro-Interactions**:
  - Emil motion spring curve: `cubic-bezier(0.2, 0, 0, 1)`
  - Tactile physical press states: `scale(0.97)` on buttons, `scale(0.99)` on interactive cards
  - High-precision concentric border radius hierarchy: `8px`, `12px`, `14px`, `20px`
  - Tabular numeric figures across metrics and tables: `font-variant-numeric: tabular-nums`

## 3. Cloud Deployment (FuncHole)
- **Host**: `https://5zyu0p.funchole.dev/`
- **Subpath Route**: `https://5zyu0p.funchole.dev/edumax/`
- **Gateway ID**: `cad6c072-f4a3-4d63-8a9e-3a211218d99e`
- **Function Key**: `fn_edumax` (`8190758a-9565-45a1-ba86-602cb2ad91bf`)
- **Runtime**: `STATIC`
- **Active FunctionVersion**: `e158d12b-4982-486b-8669-0fb99398a6c2`
- **Flow Key**: `flw_edumax` (`930b98a8-0b70-494e-8099-9899518c0d87`)
- **Active FlowVersion**: `e8c67e62-4652-4024-b36d-a69199c86ce8` (ADOPTED)
- **Deployment Script**: `scripts/deploy-funchole.js` (`npm run deploy`)

## 4. Verification Suite
- **RBAC Security Boundaries**: `npm run test:rbac` (4/4 passed)
- **Atomic Mutex Concurrency**: `npm run test:concurrency` (50 simultaneous requests, 1 granted, 49 prevented)
- **Playwright E2E Suite**: `npm run test:e2e` (12/12 flows passed, 33/33 assertions)
- **Production Build**: `npm run build` (Clean client bundle in <200ms)
