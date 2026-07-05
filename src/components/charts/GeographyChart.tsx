import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";
import { mockGeographyData } from "@/data/mock-data";

interface GeographyChartProps {
  isDashboard?: boolean;
}

export function GeographyChart({ isDashboard = false }: GeographyChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#e2e8f0" : "#1e293b";
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0";

  const data = mockGeographyData.slice(0, isDashboard ? 8 : undefined);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis type="number" tick={{ fill: textColor, fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="country"
          tick={{ fill: textColor, fontSize: 12 }}
          width={80}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            color: textColor,
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 30}, 70%, 50%)`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
