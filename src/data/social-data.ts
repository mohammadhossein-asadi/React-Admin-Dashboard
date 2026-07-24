import type { SocialPost, TeamPerformance, GoalItem, ComparisonRow } from "@/types";

export const socialPosts: SocialPost[] = [
  {
    id: "p1",
    author: "Jon Snow",
    authorAvatar: "JS",
    content: "Just shipped the new analytics dashboard! Real-time metrics, advanced charts, and a completely redesigned UX. Check it out!",
    timestamp: "2 hours ago",
    likes: 42,
    comments: 8,
    shares: 3,
    liked: false,
  },
  {
    id: "p2",
    author: "Daenerys Targaryen",
    authorAvatar: "DT",
    content: "Team outing was a blast! Nothing like an escape room to build team cohesion. We escaped with 5 minutes to spare!",
    timestamp: "5 hours ago",
    likes: 67,
    comments: 12,
    shares: 5,
    liked: true,
    image: "🎉",
  },
  {
    id: "p3",
    author: "Tyrion Lannister",
    authorAvatar: "TL",
    content: "Published a new blog post on \"Building Scalable Dashboards with React and Recharts\". Link in bio!",
    timestamp: "1 day ago",
    likes: 89,
    comments: 15,
    shares: 24,
    liked: false,
  },
  {
    id: "p4",
    author: "Sansa Stark",
    authorAvatar: "SS",
    content: "Excited to announce our new design system is live! 50+ components, full dark mode support, and accessibility-first approach.",
    timestamp: "2 days ago",
    likes: 156,
    comments: 28,
    shares: 41,
    liked: true,
  },
  {
    id: "p5",
    author: "Arya Stark",
    authorAvatar: "AS",
    content: "Security audit complete - zero critical vulnerabilities found. Our commitment to security pays off!",
    timestamp: "3 days ago",
    likes: 73,
    comments: 9,
    shares: 12,
    liked: false,
  },
  {
    id: "p6",
    author: "Bran Stark",
    authorAvatar: "BS",
    content: "Working on something exciting with WebSockets for real-time data streaming. Stay tuned!",
    timestamp: "4 days ago",
    likes: 34,
    comments: 6,
    shares: 2,
    liked: false,
  },
];

export const teamPerformanceData: TeamPerformance[] = [
  { id: 1, name: "Jon Snow", avatar: "JS", role: "Lead Engineer", tasksCompleted: 142, satisfaction: 96, efficiency: 94, streak: 12 },
  { id: 2, name: "Daenerys Targaryen", avatar: "DT", role: "Product Manager", tasksCompleted: 128, satisfaction: 98, efficiency: 91, streak: 8 },
  { id: 3, name: "Tyrion Lannister", avatar: "TL", role: "Senior Developer", tasksCompleted: 156, satisfaction: 94, efficiency: 97, streak: 15 },
  { id: 4, name: "Sansa Stark", avatar: "SS", role: "UI/UX Designer", tasksCompleted: 112, satisfaction: 97, efficiency: 89, streak: 6 },
  { id: 5, name: "Arya Stark", avatar: "AS", role: "Security Engineer", tasksCompleted: 98, satisfaction: 95, efficiency: 92, streak: 10 },
  { id: 6, name: "Bran Stark", avatar: "BS", role: "DevOps Engineer", tasksCompleted: 134, satisfaction: 93, efficiency: 95, streak: 9 },
];

export const goalsData: GoalItem[] = [
  { id: "g1", title: "Monthly Revenue", target: 100000, current: 82500, unit: "$", deadline: "2024-01-31", color: "#16a34a" },
  { id: "g2", title: "New User Signups", target: 5000, current: 3840, unit: "", deadline: "2024-01-31", color: "#2563eb" },
  { id: "g3", title: "Customer Satisfaction", target: 100, current: 94, unit: "%", deadline: "2024-03-31", color: "#f59e0b" },
  { id: "g4", title: "Sprint Velocity", target: 200, current: 178, unit: "pts", deadline: "2024-02-28", color: "#8b5cf6" },
  { id: "g5", title: "API Uptime", target: 100, current: 99.97, unit: "%", deadline: "2024-12-31", color: "#06b6d4" },
  { id: "g6", title: "Team Training Hours", target: 120, current: 87, unit: "hrs", deadline: "2024-06-30", color: "#ef4444" },
];

export const comparisonData: ComparisonRow[] = [
  { metric: "Total Revenue", current: "$2,450,000", previous: "$2,120,000", change: 15.6, trend: "up" },
  { metric: "Active Users", current: "24,521", previous: "21,340", change: 14.9, trend: "up" },
  { metric: "Conversion Rate", current: "3.24%", previous: "2.98%", change: 8.7, trend: "up" },
  { metric: "Avg. Session Duration", current: "4m 32s", previous: "5m 10s", change: -12.2, trend: "down" },
  { metric: "Bounce Rate", current: "42.8%", previous: "47.2%", change: -9.3, trend: "up" },
  { metric: "Pages per Session", current: "6.8", previous: "5.9", change: 15.3, trend: "up" },
  { metric: "Cart Abandonment", current: "68.2%", previous: "72.1%", change: -5.4, trend: "up" },
  { metric: "Customer LTV", current: "$1,240", previous: "$1,080", change: 14.8, trend: "up" },
];

export const realtimeMetrics = [
  { label: "Online Users", value: 1847, change: 12.3, icon: "users" as const },
  { label: "Revenue Today", value: 12450, change: 8.7, icon: "dollar" as const, prefix: "$" },
  { label: "Orders", value: 234, change: 15.2, icon: "shopping" as const },
  { label: "Server Load", value: 67, change: -3.1, icon: "server" as const, suffix: "%" },
];
