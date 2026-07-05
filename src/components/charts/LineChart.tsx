import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";
import { mockLineData } from "@/data/mock-data";

interface LineChartProps {
  isDashboard?: boolean;
}

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export function LineChart({ isDashboard = false }: LineChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#e2e8f0" : "#1e293b";
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={mockLineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="name"
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
        <Line type="monotone" dataKey="cost" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="profit" stroke={COLORS[1]} strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="loss" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
