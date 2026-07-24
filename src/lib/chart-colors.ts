export const CHART_COLORS = {
  primary: "#2563eb",
  success: "#16a34a",
  warning: "#f59e0b",
  destructive: "#dc2626",
  purple: "#8b5cf6",
  pink: "#ec4899",
  cyan: "#06b6d4",
  lime: "#84cc16",
} as const;

export const BAR_CHART_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.destructive,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
] as const;

export const LINE_CHART_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.destructive,
] as const;

export const PIE_CHART_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.destructive,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.cyan,
  CHART_COLORS.lime,
] as const;
