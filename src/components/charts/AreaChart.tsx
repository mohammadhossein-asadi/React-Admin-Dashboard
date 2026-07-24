import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";

interface AreaChartProps {
  data: object[];
  dataKey1: string;
  dataKey2: string;
  xAxisKey: string;
  color1?: string;
  color2?: string;
  label1?: string;
  label2?: string;
  isDashboard?: boolean;
}

export function AreaChart({
  data,
  dataKey1,
  dataKey2,
  xAxisKey,
  color1 = "#16a34a",
  color2 = "#2563eb",
  label1,
  label2,
}: AreaChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";
  const gridColor = theme === "dark" ? "#27272a" : "#e4e4e7";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`gradient-${dataKey1}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color1} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color1} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`gradient-${dataKey2}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color2} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color2} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey={xAxisKey}
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
        <Area
          type="monotone"
          dataKey={dataKey1}
          stroke={color1}
          fillOpacity={1}
          fill={`url(#gradient-${dataKey1})`}
          name={label1 || dataKey1}
        />
        <Area
          type="monotone"
          dataKey={dataKey2}
          stroke={color2}
          fillOpacity={1}
          fill={`url(#gradient-${dataKey2})`}
          name={label2 || dataKey2}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
