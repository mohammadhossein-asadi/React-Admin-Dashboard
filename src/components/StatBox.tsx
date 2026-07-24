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

export const StatBox = memo(function StatBox({ title, subtitle, icon, progress, increase, sparklineData }: StatBoxProps) {
  return (
    <Card className="flex items-center justify-between p-4">
      <CardContent className="flex flex-1 items-center gap-4 p-0">
        <div className="rounded-md bg-success/10 p-2 text-success">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
      <div className="flex items-center gap-3">
        {sparklineData && (
          <div className="w-16">
            <Sparkline data={sparklineData} height={28} />
          </div>
        )}
        <ProgressCircle progress={progress} size={50} />
        <div className="text-right">
          <p className={cn("text-sm font-semibold", increase.startsWith("+") ? "text-success" : "text-destructive")}>
            {increase}
          </p>
        </div>
      </div>
    </Card>
  );
});
