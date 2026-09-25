import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Contact,
  Receipt,
  UserPlus,
  Calendar,
  HelpCircle,
  BarChart3,
  PieChart,
  LineChart,
  Map,
  Settings,
  BarChart,
  LayoutGrid,
  ShoppingCart,
  Mail,
  MessageSquare,
  Activity,
  Rss,
} from "lucide-react";

export type NavCategory = "Main" | "Data" | "Pages" | "Charts";

export interface RouteDef {
  href: string;
  heading: string;
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  category: NavCategory;
  component: LazyExoticComponent<ComponentType>;
}

export const routes: RouteDef[] = [
  {
    href: "/",
    heading: "DASHBOARD",
    title: "Dashboard",
    subtitle: "Main dashboard",
    icon: LayoutDashboard,
    category: "Main",
    component: lazy(() => import("@/pages/DashboardPage")),
  },
  {
    href: "/team",
    heading: "TEAM",
    title: "Manage Team",
    subtitle: "Team management",
    icon: Users,
    category: "Data",
    component: lazy(() => import("@/pages/TeamPage")),
  },
  {
    href: "/contacts",
    heading: "CONTACTS",
    title: "Contacts",
    subtitle: "Contact list",
    icon: Contact,
    category: "Data",
    component: lazy(() => import("@/pages/ContactsPage")),
  },
  {
    href: "/invoices",
    heading: "INVOICES",
    title: "Invoices",
    subtitle: "Invoice balances",
    icon: Receipt,
    category: "Data",
    component: lazy(() => import("@/pages/InvoicesPage")),
  },
  {
    href: "/form",
    heading: "CREATE USER",
    title: "Profile Form",
    subtitle: "Create user profile",
    icon: UserPlus,
    category: "Pages",
    component: lazy(() => import("@/pages/FormPage")),
  },
  {
    href: "/calendar",
    heading: "Calendar",
    title: "Calendar",
    subtitle: "Event calendar",
    icon: Calendar,
    category: "Pages",
    component: lazy(() => import("@/pages/CalendarPage")),
  },
  {
    href: "/faq",
    heading: "FAQ",
    title: "FAQ",
    subtitle: "Frequently asked questions",
    icon: HelpCircle,
    category: "Pages",
    component: lazy(() => import("@/pages/FAQPage")),
  },
  {
    href: "/ecommerce",
    heading: "E-COMMERCE",
    title: "E-Commerce",
    subtitle: "Store overview",
    icon: ShoppingCart,
    category: "Pages",
    component: lazy(() => import("@/pages/EcommercePage")),
  },
  {
    href: "/email",
    heading: "EMAIL",
    title: "Email",
    subtitle: "Inbox and messages",
    icon: Mail,
    category: "Pages",
    component: lazy(() => import("@/pages/EmailPage")),
  },
  {
    href: "/tickets",
    heading: "SUPPORT TICKETS",
    title: "Support Tickets",
    subtitle: "Customer support queue",
    icon: MessageSquare,
    category: "Pages",
    component: lazy(() => import("@/pages/TicketsPage")),
  },
  {
    href: "/performance",
    heading: "PERFORMANCE",
    title: "Performance",
    subtitle: "System performance metrics",
    icon: Activity,
    category: "Pages",
    component: lazy(() => import("@/pages/PerformancePage")),
  },
  {
    href: "/social",
    heading: "TEAM FEED",
    title: "Team Feed",
    subtitle: "Team activity feed",
    icon: Rss,
    category: "Pages",
    component: lazy(() => import("@/pages/SocialPage")),
  },
  {
    href: "/analytics",
    heading: "ANALYTICS",
    title: "Analytics",
    subtitle: "Analytics dashboard",
    icon: BarChart,
    category: "Pages",
    component: lazy(() => import("@/pages/AnalyticsPage")),
  },
  {
    href: "/kanban",
    heading: "KANBAN",
    title: "Kanban",
    subtitle: "Task management board",
    icon: LayoutGrid,
    category: "Pages",
    component: lazy(() => import("@/pages/KanbanPage")),
  },
  {
    href: "/settings",
    heading: "SETTINGS",
    title: "Settings",
    subtitle: "Account settings",
    icon: Settings,
    category: "Pages",
    component: lazy(() => import("@/pages/SettingsPage")),
  },
  {
    href: "/bar",
    heading: "Bar Chart",
    title: "Bar Chart",
    subtitle: "Bar chart view",
    icon: BarChart3,
    category: "Charts",
    component: lazy(() => import("@/pages/BarChartPage")),
  },
  {
    href: "/pie",
    heading: "Pie Chart",
    title: "Pie Chart",
    subtitle: "Pie chart view",
    icon: PieChart,
    category: "Charts",
    component: lazy(() => import("@/pages/PieChartPage")),
  },
  {
    href: "/line",
    heading: "Line Chart",
    title: "Line Chart",
    subtitle: "Line chart view",
    icon: LineChart,
    category: "Charts",
    component: lazy(() => import("@/pages/LineChartPage")),
  },
  {
    href: "/geography",
    heading: "Geography Chart",
    title: "Geography",
    subtitle: "Geography chart view",
    icon: Map,
    category: "Charts",
    component: lazy(() => import("@/pages/GeographyPage")),
  },
];

export function routeByHref(href: string): RouteDef | undefined {
  return routes.find((route) => route.href === href);
}

export function usePageHeading(): string | undefined {
  const { pathname } = useLocation();
  return routeByHref(pathname)?.heading;
}

export function groupNavItemsByCategory(items: RouteDef[] = routes): Record<string, RouteDef[]> {
  return items.reduce<Record<string, RouteDef[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}
