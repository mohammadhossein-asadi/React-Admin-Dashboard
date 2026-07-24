import {
  ScatterChart as RechartsScatter,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/contexts/theme-context";
import type { ScatterDataItem } from "@/types";

interface ScatterChartProps {
  data1: ScatterDataItem[];
  data2?: ScatterDataItem[];
  label1?: string;
  label2?: string;
  xLabel?: string;
  yLabel?: string;
}

export function ScatterChartComponent({
  data1,
  data2,
  label1 = "Series A",
  label2 = "Series B",
  xLabel = "X Axis",
  yLabel = "Y Axis",
}: ScatterChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";
  const gridColor = theme === "dark" ? "#27272a" : "#e4e4e7";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsScatter margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          type="number"
          dataKey="x"
          name={xLabel}
          tick={{ fontSize: 12, fill: textColor }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yLabel}
          tick={{ fontSize: 12, fill: textColor }}
          tickLine={false}
          axisLine={false}
        />
        <ZAxis type="number" dataKey="z" range={[60, 400]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e1e2e" : "#ffffff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend />
        <Scatter name={label1} data={data1} fill="#16a34a" fillOpacity={0.7} />
        {data2 && <Scatter name={label2} data={data2} fill="#2563eb" fillOpacity={0.7} />}
      </RechartsScatter>
    </ResponsiveContainer>
  );
}
