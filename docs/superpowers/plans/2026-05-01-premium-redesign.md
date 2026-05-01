# PropMetrics Premium Redesign — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task.

**Goal:** Transform PropMetrics into a premium dark fintech SaaS to impress Reity.cl

**Architecture:** Option B — sequential: design system → dashboard charts → projects page → landing overhaul

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Shadcn UI, Recharts, next-themes

---

## Phase 1 — Design System + Dark Mode (feature/premium-design-system)

### Task 1: Install dependencies
- [ ] Run: `npm install recharts next-themes`
- [ ] Commit: `chore: install recharts and next-themes`

### Task 2: Update globals.css with premium fintech tokens
- [ ] Modify: `app/globals.css`
  - Add emerald/slate dark palette with chroma
  - Add Google Font (Inter) import
  - Override primary/chart colors with fintech palette
- [ ] Commit: `style: premium fintech design tokens`

### Task 3: Add ThemeProvider + dark mode toggle
- [ ] Modify: `app/layout.tsx` — wrap with ThemeProvider from next-themes
- [ ] Modify: `app/(dashboard)/layout.tsx` — add dark mode toggle button in header
- [ ] Commit: `feat: add dark mode toggle`

---

## Phase 2 — Dashboard Charts (feature/dashboard-charts)

### Task 4: Portfolio area chart
- [ ] Create: `components/charts/PortfolioChart.tsx`
  - Recharts AreaChart with mock monthly data
  - Gradient fill, responsive, dark-mode compatible
- [ ] Modify: `app/(dashboard)/portfolio/page.tsx` — import and display chart
- [ ] Commit: `feat: add portfolio area chart`

### Task 5: Dividends bar chart + donut distribution
- [ ] Create: `components/charts/DividendsChart.tsx` — BarChart monthly
- [ ] Create: `components/charts/DistributionChart.tsx` — PieChart by token type
- [ ] Modify: `app/(dashboard)/portfolio/page.tsx` — add both charts in grid
- [ ] Commit: `feat: add dividends and distribution charts`

### Task 6: Simulator line chart
- [ ] Create: `components/charts/ProjectionChart.tsx` — LineChart year-by-year
- [ ] Modify: `app/(dashboard)/simulator/page.tsx` — replace bar progress with LineChart
- [ ] Commit: `feat: upgrade simulator with recharts projection`

---

## Phase 3 — Projects Marketplace (feature/projects-page)

### Task 7: Projects page with token cards
- [ ] Create: `app/(dashboard)/projects/page.tsx`
  - Grid of project cards: image placeholder, name, type badge, TIR%, progress bar
  - Filter tabs: Todos / Renta / Desarrollo / Socio Preferente
- [ ] Add route to sidebar in `app/(dashboard)/layout.tsx`
- [ ] Commit: `feat: add tokenized projects marketplace page`

---

## Phase 4 — Landing Overhaul (feature/landing-premium)

### Task 8: Premium landing page
- [ ] Modify: `app/page.tsx`
  - Dark hero with gradient animated background
  - Animated stat counters
  - Features section with icons
  - CTA targeting tokenization platforms
- [ ] Commit: `feat: premium landing page redesign`

---

## Branch Strategy (Git Flow)

```
develop
  └── feature/premium-design-system  (Tasks 1-3)
  └── feature/dashboard-charts       (Tasks 4-6)
  └── feature/projects-page          (Task 7)
  └── feature/landing-premium        (Task 8)
```

Each feature merges to develop via PR. Final merge develop→main for LinkedIn deploy.
