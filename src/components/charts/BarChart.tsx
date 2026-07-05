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

interface BarChartProps {
  isDashboard?: boolean;
}

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#8b5cf6", "#ec4899"];

export function BarChart({ isDashboard = false }: BarChartProps) {
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
        <Bar dataKey="hot dog" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="burger" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="sandwich" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="kebab" fill={COLORS[3]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="fries" fill={COLORS[4]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="donut" fill={COLORS[5]} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
