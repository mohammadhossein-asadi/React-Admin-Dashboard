import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";
import type { StackedAreaDataItem } from "@/types";

interface StackedAreaChartProps {
  data: StackedAreaDataItem[];
  series?: { key: string; color: string; label: string }[];
}

const defaultSeries = [
  { key: "series1", color: "#16a34a", label: "Series 1" },
  { key: "series2", color: "#2563eb", label: "Series 2" },
  { key: "series3", color: "#f59e0b", label: "Series 3" },
  { key: "series4", color: "#8b5cf6", label: "Series 4" },
];

export function StackedAreaChart({
  data,
  series = defaultSeries,
}: StackedAreaChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";
  const gridColor = theme === "dark" ? "#27272a" : "#e4e4e7";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: textColor }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: textColor }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e1e2e" : "#ffffff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend />
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stackId="1"
            stroke={s.color}
            fill={`url(#grad-${s.key})`}
            name={s.label}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
