import type { AnalyticsKpi, TrafficDataItem, TopPageItem, FunnelStep } from "@/types";

export const kpiData: AnalyticsKpi[] = [
  {
    label: "Total Revenue",
    value: "$59,342",
    change: 14.2,
    sparkline: [3200, 3800, 3500, 4200, 4000, 4500, 5100, 4800, 5300, 5600, 5200, 5900],
  },
  {
    label: "Active Users",
    value: "24,521",
    change: 8.7,
    sparkline: [18000, 19500, 19000, 20500, 21000, 20000, 22000, 21500, 23000, 24000, 23500, 24500],
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: -1.3,
    sparkline: [3.1, 3.3, 3.2, 3.4, 3.3, 3.1, 3.2, 3.3, 3.4, 3.2, 3.1, 3.24],
  },
  {
    label: "Bounce Rate",
    value: "42.8%",
    change: -5.1,
    sparkline: [48, 46, 47, 45, 44, 46, 43, 44, 42, 43, 41, 42.8],
  },
];

export const trafficData7Days: TrafficDataItem[] = [
  { date: "Mon", visitors: 1200, pageViews: 3400 },
  { date: "Tue", visitors: 1500, pageViews: 4100 },
  { date: "Wed", visitors: 1350, pageViews: 3800 },
  { date: "Thu", visitors: 1800, pageViews: 5000 },
  { date: "Fri", visitors: 1600, pageViews: 4400 },
  { date: "Sat", visitors: 900, pageViews: 2200 },
  { date: "Sun", visitors: 800, pageViews: 1900 },
];

export const trafficData30Days: TrafficDataItem[] = [
  { date: "Week 1", visitors: 8500, pageViews: 23000 },
  { date: "Week 2", visitors: 9200, pageViews: 25500 },
  { date: "Week 3", visitors: 8800, pageViews: 24200 },
  { date: "Week 4", visitors: 10100, pageViews: 28000 },
];

export const trafficData90Days: TrafficDataItem[] = [
  { date: "Jan", visitors: 32000, pageViews: 88000 },
  { date: "Feb", visitors: 28000, pageViews: 76000 },
  { date: "Mar", visitors: 35000, pageViews: 95000 },
];

export const topPages: TopPageItem[] = [
  { page: "/dashboard", views: 12450, uniqueVisitors: 8900, bounceRate: 12.3 },
  { page: "/products", views: 8920, uniqueVisitors: 6200, bounceRate: 24.1 },
  { page: "/pricing", views: 6340, uniqueVisitors: 4800, bounceRate: 31.5 },
  { page: "/blog", views: 5120, uniqueVisitors: 3900, bounceRate: 38.2 },
  { page: "/contact", views: 3280, uniqueVisitors: 2600, bounceRate: 18.7 },
];

export const funnelData: FunnelStep[] = [
  { label: "Visitors", value: 24521, percentage: 100 },
  { label: "Leads", value: 8430, percentage: 34.4 },
  { label: "Qualified", value: 3210, percentage: 13.1 },
  { label: "Proposals", value: 1450, percentage: 5.9 },
  { label: "Closed Won", value: 795, percentage: 3.24 },
];
