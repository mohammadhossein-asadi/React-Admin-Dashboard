import { memo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";
import { mockBarData } from "@/data/mock-data";
import { BAR_CHART_COLORS } from "@/lib/chart-colors";

interface BarChartProps {
  isDashboard?: boolean;
}

export const BarChart = memo(function BarChart({ isDashboard = false }: BarChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#e2e8f0" : "#1e293b";
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={mockBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="country"
          tick={{ fill: textColor, fontSize: 12 }}
          axisLine={{ stroke: gridColor }}
        />
        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            color: textColor,
          }}
        />
        {!isDashboard && <Legend />}
        <Bar dataKey="hot dog" fill={BAR_CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="burger" fill={BAR_CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="sandwich" fill={BAR_CHART_COLORS[2]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="kebab" fill={BAR_CHART_COLORS[3]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="fries" fill={BAR_CHART_COLORS[4]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="donut" fill={BAR_CHART_COLORS[5]} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
});
