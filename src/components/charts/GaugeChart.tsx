import { useTheme } from "@/contexts/theme-context";

interface GaugeChartProps {
  value: number;
  target?: number;
  max?: number;
  label?: string;
  size?: number;
  unit?: string;
}

export function GaugeChart({
  value,
  target = 100,
  max = 100,
  label,
  size = 200,
  unit = "%",
}: GaugeChartProps) {
  const { theme } = useTheme();
  const percentage = Math.min((value / max) * 100, 100);
  const targetPercentage = Math.min((target / max) * 100, 100);

  const radius = size * 0.38;
  const strokeWidth = size * 0.08;
  const center = size / 2;
  const startAngle = -225;
  const endAngle = 45;
  const totalAngle = 270;
  const currentAngle = startAngle + (totalAngle * percentage) / 100;
  const targetAngle = startAngle + (totalAngle * targetPercentage) / 100;

  const getArcPath = (start: number, end: number, r: number) => {
    const startRad = (start * Math.PI) / 180;
    const endRad = (end * Math.PI) / 180;
    const x1 = center + r * Math.cos(startRad);
    const y1 = center + r * Math.sin(startRad);
    const x2 = center + r * Math.cos(endRad);
    const y2 = center + r * Math.sin(endRad);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const getColor = (pct: number) => {
    if (pct >= 80) return "#16a34a";
    if (pct >= 60) return "#f59e0b";
    if (pct >= 40) return "#f97316";
    return "#ef4444";
  };

  const bgColor = theme === "dark" ? "#27272a" : "#e4e4e7";
  const textColor = theme === "dark" ? "#fafafa" : "#18181b";
  const subtextColor = theme === "dark" ? "#a1a1aa" : "#71717a";

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.75}`}>
        {/* Background arc */}
        <path
          d={getArcPath(startAngle, endAngle, radius)}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={getArcPath(startAngle, currentAngle, radius)}
          fill="none"
          stroke={getColor(percentage)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        {/* Target marker */}
        {targetPercentage < 100 && (
          <circle
            cx={center + radius * Math.cos((targetAngle * Math.PI) / 180)}
            cy={center + radius * Math.sin((targetAngle * Math.PI) / 180)}
            r={strokeWidth * 0.6}
            fill="#fff"
            stroke={subtextColor}
            strokeWidth={2}
          />
        )}
        {/* Value text */}
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          fill={textColor}
          fontSize={size * 0.16}
          fontWeight={700}
        >
          {typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value}{unit}
        </text>
        {label && (
          <text
            x={center}
            y={center + size * 0.1}
            textAnchor="middle"
            fill={subtextColor}
            fontSize={size * 0.07}
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}
