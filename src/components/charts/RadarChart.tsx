import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";
import type { RadarDataItem } from "@/types";

interface RadarChartProps {
  data: RadarDataItem[];
  dataKey1?: string;
  dataKey2?: string;
  label1?: string;
  label2?: string;
}

export function RadarChartComponent({
  data,
  dataKey1 = "A",
  dataKey2 = "B",
  label1 = "Current",
  label2 = "Target",
}: RadarChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";
  const gridColor = theme === "dark" ? "#27272a" : "#e4e4e7";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadar cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: textColor }} />
        <PolarRadiusAxis tick={{ fontSize: 10, fill: textColor }} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e1e2e" : "#ffffff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend />
        <Radar name={label1} dataKey={dataKey1} stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} />
        <Radar name={label2} dataKey={dataKey2} stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
