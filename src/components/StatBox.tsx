import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ProgressCircle";
import { Sparkline } from "@/components/charts/Sparkline";
import { cn } from "@/lib/utils";

interface StatBoxProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
  increase: string;
  sparklineData?: number[];
}

export const StatBox = memo(function StatBox({
  title,
  subtitle,
  icon,
  progress,
  increase,
  sparklineData,
}: StatBoxProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-md bg-success/10 p-2 text-success">{icon}</div>
              <div className="min-w-0">
                <p className="truncate text-2xl font-bold text-foreground">{title}</p>
                <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {sparklineData && (
              <div role="img" aria-label="Trend sparkline" className="hidden w-16 sm:block">
                <Sparkline data={sparklineData} height={28} />
              </div>
            )}
            <ProgressCircle progress={progress} size={46} />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="w-16 sm:hidden">
            {sparklineData && <Sparkline data={sparklineData} height={24} />}
          </div>
          <p
            className={cn(
              "text-sm font-semibold ml-auto",
              increase.startsWith("+") ? "text-success" : "text-destructive"
            )}
          >
            {increase}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
