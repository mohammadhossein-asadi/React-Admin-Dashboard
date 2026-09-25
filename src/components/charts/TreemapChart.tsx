import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "@/contexts/theme-context";

interface TreemapData {
  name: string;
  size: number;
  color?: string;
}

interface TreemapChartProps {
  data: TreemapData[];
}

const COLORS = [
  "#16a34a",
  "#2563eb",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#14b8a6",
];

function CustomContent(props: Record<string, unknown>) {
  const { x, y, width, height, name, color, index } = props as {
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    color: string;
    index: number;
  };
  const fill = color || COLORS[(index ?? 0) % COLORS.length];

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.85}
        stroke="#fff"
        strokeWidth={2}
        rx={4}
      />
      {width > 60 && height > 30 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 8}
            textAnchor="middle"
            fill="#fff"
            fontSize={13}
            fontWeight={600}
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 12}
            textAnchor="middle"
            fill="#ffffffcc"
            fontSize={11}
          >
            {width > 80 ? `${((width * height) / 1000).toFixed(0)}k` : ""}
          </text>
        </>
      )}
    </g>
  );
}

export function TreemapChart({ data }: TreemapChartProps) {
  const { theme } = useTheme();
  const gridColor = theme === "dark" ? "#27272a" : "#e4e4e7";

  const coloredData = data.map((item, i) => ({
    ...item,
    color: item.color || COLORS[i % COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={coloredData}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke={gridColor}
        content={<CustomContent />}
      >
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e1e2e" : "#ffffff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value, name) => [
            typeof value === "number" ? value.toLocaleString() : String(value),
            String(name),
          ]}
        />
      </Treemap>
    </ResponsiveContainer>
  );
}
