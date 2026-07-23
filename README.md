<div align="center">

# React Admin Dashboard

### Feature-Rich Admin Panel — Charts, Tables, Calendar & Forms

A comprehensive admin dashboard built with React 18, Vite, Recharts, FullCalendar, TanStack Table, and shadcn/ui — featuring 11 page views, dark/light theming, global search, and a responsive collapsible sidebar.

[![Live Demo](https://img.shields.io/badge/Live_Demo-react--admin--dashboard--p.vercel.app-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=3b82f6)](https://react-admin-dashboard-p.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](#)

</div>

---

## Overview

React Admin Dashboard is a full-featured back-office panel designed for data visualization, team management, contact/invoice tracking, calendar scheduling, form creation, and multi-format chart analytics. It demonstrates a complete admin UI with production-quality components, responsive layouts, and a sophisticated theming system.

---

## Features

| Feature | Description |
|:--------|:------------|
| **Dashboard** | KPI stat cards, revenue chart, recent transactions, campaign progress, sales bar chart |
| **Team Management** | Sortable/filterable data table with access level badges |
| **Contacts** | Contact directory with search, pagination, and detailed columns |
| **Invoices** | Invoice management with formatted costs and date tracking |
| **Calendar** | FullCalendar integration with month/week/day/list views and event CRUD |
| **Forms** | React Hook Form + Zod validated profile forms |
| **Charts** | Bar, Line, Pie (donut), and Geography chart pages |
| **FAQ** | Accordion-based FAQ with Radix UI |
| **Global Search** | Search across pages, team, contacts, and invoices |
| **Dark/Light Theme** | HSL CSS variable system with localStorage persistence |
| **Responsive Sidebar** | Collapsible sidebar with tooltip-only collapsed mode |
| **Testing** | Vitest + React Testing Library |

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Framework** | React 18, Vite 5.4 |
| **Language** | TypeScript 5.6 |
| **Routing** | React Router DOM 6.26 |
| **Styling** | Tailwind CSS 3.4, tailwindcss-animate |
| **UI** | shadcn/ui (10 Radix UI primitives) |
| **Charts** | Recharts 2.12 |
| **Table** | TanStack React Table 8.20 |
| **Calendar** | FullCalendar 6.17 (4 plugins) |
| **Forms** | React Hook Form 7.53, Zod 3.23 |
| **Testing** | Vitest 2.1, React Testing Library 16, jsdom |
| **Formatting** | Prettier 3.3 |

---

## Project Structure

```
React-Admin-Dashboard/
├── src/
│   ├── components/
│   │   ├── charts/              # Bar, Line, Pie, Geography charts
│   │   ├── ui/                  # 15 shadcn/ui components
│   │   ├── DataTable.tsx        # Reusable TanStack Table wrapper
│   │   ├── Header.tsx           # Reusable page header
│   │   ├── ProgressCircle.tsx   # SVG circular progress
│   │   ├── SearchCommand.tsx    # Global search popover
│   │   ├── Sidebar.tsx          # Collapsible navigation
│   │   ├── StatBox.tsx          # Dashboard stat card
│   │   └── TopBar.tsx           # Top navigation bar
│   ├── contexts/
│   │   └── theme-context.tsx    # Theme provider + hook
│   ├── data/
│   │   └── mock-data.ts         # All mock data
│   ├── layouts/
│   │   └── AppLayout.tsx        # Main layout with Outlet
│   ├── pages/                   # 11 page views
│   │   ├── DashboardPage.tsx
│   │   ├── TeamPage.tsx
│   │   ├── ContactsPage.tsx
│   │   ├── InvoicesPage.tsx
│   │   ├── CalendarPage.tsx
│   │   ├── FormPage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── BarChartPage.tsx
│   │   ├── LineChartPage.tsx
│   │   ├── PieChartPage.tsx
│   │   └── GeographyPage.tsx
│   ├── test/                    # Vitest setup + tests
│   ├── App.tsx                  # Router + providers
│   └── main.tsx                 # Entry point
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages

| Page | Route | Description |
|:-----|:------|:------------|
| Dashboard | `/` | KPIs, revenue chart, transactions, campaign progress |
| Team | `/team` | Team member table with access levels |
| Contacts | `/contacts` | Contact directory |
| Invoices | `/invoices` | Invoice management |
| Calendar | `/calendar` | FullCalendar with event CRUD |
| Form | `/form` | Validated profile form |
| FAQ | `/faq` | Accordion FAQ |
| Bar Chart | `/bar` | Grouped bar chart |
| Line Chart | `/line` | Multi-series line chart |
| Pie Chart | `/pie` | Donut chart |
| Geography | `/geography` | Country-based horizontal bar chart |

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0

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

### Testing

```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

---

## Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run test` | Vitest watch mode |
| `npm run test:run` | Vitest single run |
| `npm run lint` | ESLint |
| `npm run format` | Prettier format |

---

## Author

**Mohammadhossein Asadi** — Frontend & Full-Stack Engineer

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

---

## License

This project is licensed under the [MIT License](LICENSE).
