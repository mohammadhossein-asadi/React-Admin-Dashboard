import { memo } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";
import { mockPieData } from "@/data/mock-data";
import { PIE_CHART_COLORS } from "@/lib/chart-colors";

export const PieChart = memo(function PieChart() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#e2e8f0" : "#1e293b";
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={mockPieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {mockPieData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            color: textColor,
          }}
        />
        <Legend
          wrapperStyle={{ color: textColor }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
});
