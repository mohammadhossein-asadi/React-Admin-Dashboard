import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, ShoppingCart, Server } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  change: number;
  icon: "users" | "dollar" | "shopping" | "server";
  prefix?: string;
  suffix?: string;
}

const iconMap = {
  users: Users,
  dollar: DollarSign,
  shopping: ShoppingCart,
  server: Server,
};

export function RealtimeMetrics({ metrics }: { metrics: Metric[] }) {
  const [values, setValues] = useState(metrics.map((m) => m.value));

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((prev) =>
        prev.map((v) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(0, v + delta);
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon];
        return (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-md bg-success/10 p-2 text-success">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    metric.change >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {metric.change >= 0 ? "+" : ""}
                  {metric.change}%
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold tabular-nums">
                  {metric.prefix || ""}
                  {values[index]?.toLocaleString() ?? metric.value}
                  {metric.suffix || ""}
                </p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
