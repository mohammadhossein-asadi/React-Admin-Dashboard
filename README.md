<div align="center">

# React Admin Dashboard

### Feature-Rich Admin Panel — Charts, Tables, Calendar & Forms

A comprehensive admin dashboard built with React 19, Vite 8, Recharts, FullCalendar, TanStack Table, and shadcn/ui — featuring 19 page views, dark/light theming, multilingual UI (i18next), global search, and a responsive collapsible sidebar.

[![Live Demo](https://img.shields.io/badge/Live_Demo-react--admin--dashboard--p.vercel.app-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=3b82f6)](https://react-admin-dashboard-p.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](LICENSE)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## Overview

React Admin Dashboard is a full-featured back-office panel designed for data visualization, team management, contact/invoice tracking, calendar scheduling, form creation, and multi-format chart analytics. It demonstrates a complete admin UI with production-quality components, responsive layouts, and a sophisticated theming system.

---

## Features

| Feature                | Description                                                                            |
| :--------------------- | :------------------------------------------------------------------------------------- |
| **Dashboard**          | KPI stat cards, revenue chart, recent transactions, campaign progress, sales bar chart |
| **Team Management**    | Sortable/filterable data table with access level badges                                |
| **Contacts**           | Contact directory with search, pagination, and detailed columns                        |
| **Invoices**           | Invoice management with formatted costs and date tracking                              |
| **Calendar**           | FullCalendar integration with month/week/day/list views and event CRUD                 |
| **Forms**              | React Hook Form + Zod validated profile forms                                          |
| **Charts**             | Bar, Line, Pie (donut), and Geography chart pages                                      |
| **FAQ**                | Accordion-based FAQ with Radix UI                                                      |
| **Global Search**      | Search across pages, team, contacts, and invoices                                      |
| **Dark/Light Theme**   | HSL CSS variable system with localStorage persistence                                  |
| **Multilingual UI**    | i18next wiring for 10 languages (incl. RTL Arabic/Persian)                             |
| **Responsive Sidebar** | Collapsible sidebar with tooltip-only collapsed mode                                   |
| **Testing**            | Vitest + React Testing Library                                                         |

---

## Tech Stack

| Layer          | Technologies                                        |
| :------------- | :-------------------------------------------------- |
| **Framework**  | React 19.3, Vite 8.3                                |
| **Language**   | TypeScript 6.0 (strict mode)                        |
| **Routing**    | React Router DOM 7.18                               |
| **Styling**    | Tailwind CSS 4.3 (CSS-first config), tw-animate-css |
| **UI**         | shadcn/ui (Radix UI primitives)                     |
| **Charts**     | Recharts 3.10                                       |
| **Table**      | TanStack React Table 9.2 (legacy compat API)        |
| **Calendar**   | FullCalendar 6.1 (4 plugins)                        |
| **Forms**      | React Hook Form 7.88, Zod 4.6                       |
| **i18n**       | i18next 26, react-i18next 17                        |
| **Testing**    | Vitest 5.0, React Testing Library 16, jsdom         |
| **Linting**    | ESLint 9, typescript-eslint 8, react-hooks 7        |
| **Formatting** | Prettier 3.3                                        |

---

## Project Structure

```
React-Admin-Dashboard/
├── src/
│   ├── components/
│   │   ├── charts/              # Bar, Line, Pie, Geography, Treemap charts
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── DataTable.tsx        # TanStack Table wrapper (legacy API)
│   │   ├── DataState.tsx        # Loading / error state components
│   │   ├── Header.tsx           # Reusable page header
│   │   ├── ListPage.tsx         # Async list page (loading/error/table)
│   │   ├── PageHeader.tsx       # Unified page heading
│   │   ├── ProgressCircle.tsx   # SVG circular progress
│   │   ├── RouteError.tsx       # Route-level error boundary
│   │   ├── SearchCommand.tsx    # Global search popover
│   │   ├── Sidebar.tsx          # Collapsible navigation
│   │   ├── StatBox.tsx          # Dashboard stat card
│   │   └── TopBar.tsx           # Top navigation bar
│   ├── contexts/                # auth, notifications, settings, theme
│   ├── data/
│   │   ├── dashboard-data.ts    # Dashboard KPI/trend data
│   │   └── mock-data.ts         # All mock data
│   ├── hooks/
│   │   └── useAsyncData.ts      # Async loading hook (live API or mock)
│   ├── i18n/                    # i18next init + translations (9 languages)
│   ├── layouts/
│   │   └── AppLayout.tsx        # Main layout with Outlet + mobile menu
│   ├── lib/                     # nav-config, constants, utils, theme.css
│   ├── pages/                   # 19 page views + settings/ tabs
│   ├── services/                # Swappable data layer (mock ⇄ live API)
│   ├── test/                    # Vitest setup
│   ├── App.tsx                  # Router + providers + Suspense
│   └── main.tsx                 # Entry point
├── vite.config.ts               # Vite + Tailwind 4 + Vitest config
├── index.html
├── tsconfig.json
└── package.json
```

---

## Pages

| Page            | Route          | Description                                          |
| :-------------- | :------------- | :--------------------------------------------------- |
| Dashboard       | `/`            | KPIs, revenue chart, transactions, campaign progress |
| Team            | `/team`        | Team member table with access levels                 |
| Contacts        | `/contacts`    | Contact directory                                    |
| Invoices        | `/invoices`    | Invoice management                                   |
| Calendar        | `/calendar`    | FullCalendar with event CRUD                         |
| Form            | `/form`        | Validated profile form                               |
| FAQ             | `/faq`         | Accordion FAQ                                        |
| Bar Chart       | `/bar`         | Grouped bar chart                                    |
| Line Chart      | `/line`        | Multi-series line chart                              |
| Pie Chart       | `/pie`         | Donut chart                                          |
| Geography       | `/geography`   | Country-based horizontal bar chart                   |
| Settings        | `/settings`    | Profile, appearance, notifications, security tabs    |
| Analytics       | `/analytics`   | Analytics dashboard                                  |
| Kanban          | `/kanban`      | Drag-style task board with task creation             |
| E-Commerce      | `/ecommerce`   | Product overview                                     |
| Email           | `/email`       | Inbox with star / mark-read actions                  |
| Support Tickets | `/tickets`     | Customer support queue                               |
| Performance     | `/performance` | System performance metrics                           |
| Team Feed       | `/social`      | Team activity feed                                   |

---

## Quick Start

### Prerequisites

- **Node.js** >= 20.19.0 (Vite 8 requirement)

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/React-Admin-Dashboard.git
cd React-Admin-Dashboard
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run preview
```

### End-to-End Testing

```bash
npm run build
npm run test:e2e
```

Runs 12 Playwright E2E tests against a local preview server covering dashboard navigation, team search/sort, form validation, language switching, global search, and Kanban task creation.

---

## Scripts

| Command                 | Description                    |
| :---------------------- | :----------------------------- |
| `npm run dev`           | Start Vite dev server          |
| `npm run build`         | Type-check + production build  |
| `npm run preview`       | Preview production build       |
| `npm run test:e2e`      | Playwright E2E tests (local)   |
| `npm run test`          | Vitest watch mode              |
| `npm run test:run`      | Vitest single run              |
| `npm run test:coverage` | Vitest with coverage report    |
| `npm run lint`          | ESLint                         |
| `npm run typecheck`     | TypeScript project build check |
| `npm run format`        | Prettier format                |

---

## Key Architecture Decisions

### Unified Theme System

HSL-based CSS variables mapped into Tailwind 4 via `@theme inline`, with `tw-animate-css` for motion. Theme, accent color, and language preferences persist in `localStorage`; accent colors are applied as runtime CSS variables.

### Swappable Data Services

`src/services/` abstracts data fetching: pages call `getTeam` / `getContacts` / `getInvoices`, which serve mock data by default and switch to a live REST API when `VITE_API_BASE_URL` is configured. `useAsyncData` + `DataState` components standardize loading and error handling.

### Reusable Data Table

`DataTable.tsx` wraps TanStack Table (v9 legacy compat API) with built-in sorting, filtering, pagination, and column visibility — reducing boilerplate across Team, Contacts, and Invoices pages.

### Global Search

`SearchCommand.tsx` provides a `⌘K`-style command palette that indexes all mock data and routes, enabling instant navigation. Nav labels are translated through i18next, and unmatched keys fall back to English.

### Internationalization

`src/i18n/` initializes i18next with key strings (navigation, categories, settings) translated into 9 languages. The Settings language picker drives `changeLanguage` and sets `lang`/`dir` on the document root (RTL for Arabic and Persian). Untranslated strings fall back to English automatically.

### Component-First Charts

Each chart type lives in its own component under `components/charts/`, making it trivial to reuse or extend.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Mohammadhossein Asadi** — Frontend & Full-Stack Engineer

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>
