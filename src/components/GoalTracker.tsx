import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import type { GoalItem } from "@/types";

interface GoalTrackerProps {
  goals: GoalItem[];
}

export function GoalTracker({ goals }: GoalTrackerProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("Goal Tracker")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {goals.map((goal) => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const isComplete = pct >= 100;
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{goal.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("Deadline")}: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {goal.unit === "$" ? "$" : ""}
                    {goal.current.toLocaleString()}
                    {goal.unit !== "$" ? ` ${goal.unit}` : ""} / {goal.unit === "$" ? "$" : ""}
                    {goal.target.toLocaleString()}
                    {goal.unit !== "$" ? ` ${goal.unit}` : ""}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      isComplete
                        ? "text-success"
                        : pct >= 70
                          ? "text-orange-500"
                          : "text-muted-foreground"
                    }`}
                  >
                    {pct.toFixed(1)}% {isComplete ? "- Complete!" : ""}
                  </p>
                </div>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: goal.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
