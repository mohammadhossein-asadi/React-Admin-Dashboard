export interface TeamMember {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  access: "admin" | "manager" | "user";
}

export interface Contact {
  id: number;
  registrarId: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Invoice {
  id: number;
  name: string;
  phone: string;
  email: string;
  cost: number;
  date: string;
}

export interface Transaction {
  txId: string;
  user: string;
  cost: string;
  date: string;
}

export interface BarDataItem {
  country: string;
  "hot dog": number;
  burger: number;
  sandwich: number;
  kebab: number;
  fries: number;
  donut: number;
}

export interface LineDataItem {
  name: string;
  cost: number;
  profit: number;
  loss: number;
}

export interface PieDataItem {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface GeographyDataItem {
  id: string;
  value: number;
  country: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  timestamp: string;
  read: boolean;
  href?: string;
}

export interface Product {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface AnalyticsKpi {
  label: string;
  value: string;
  change: number;
  sparkline: number[];
}

export interface TrafficDataItem {
  date: string;
  visitors: number;
  pageViews: number;
}

export interface TopPageItem {
  page: string;
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
}

export interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

export interface RadarDataItem {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

export interface TreemapDataItem {
  name: string;
  size: number;
  children?: TreemapDataItem[];
  color?: string;
}

export interface ScatterDataItem {
  x: number;
  y: number;
  z: number;
}

export interface GaugeDataItem {
  label: string;
  value: number;
  target: number;
  unit?: string;
}

export interface EcommerceProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  image: string;
}

export interface EcommerceOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

export interface EmailMessage {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  folder: "inbox" | "sent" | "drafts" | "trash";
}

export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  customerEmail: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  category: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isAgent: boolean;
}

export interface SocialPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  image?: string;
}

export interface TeamPerformance {
  id: number;
  name: string;
  avatar: string;
  role: string;
  tasksCompleted: number;
  satisfaction: number;
  efficiency: number;
  streak: number;
}

export interface GoalItem {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  color: string;
}

export interface ComparisonRow {
  metric: string;
  current: string;
  previous: string;
  change: number;
  trend: "up" | "down" | "flat";
}

export interface StackedAreaDataItem {
  name: string;
  series1: number;
  series2: number;
  series3: number;
  series4: number;
}
