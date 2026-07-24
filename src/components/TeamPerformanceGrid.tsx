import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkline } from "@/components/charts/Sparkline";
import type { TeamPerformance } from "@/types";
import { Award, Zap, TrendingUp } from "lucide-react";

interface TeamPerformanceGridProps {
  team: TeamPerformance[];
}

export function TeamPerformanceGrid({ team }: TeamPerformanceGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-success/10 text-success text-sm">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Award className="h-3 w-3" /> Tasks
                  </span>
                  <span className="font-medium">{member.tasksCompleted}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-3 w-3" /> Efficiency
                  </span>
                  <span className="font-medium">{member.efficiency}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Zap className="h-3 w-3" /> Streak
                  </span>
                  <span className="font-medium text-success">{member.streak} days</span>
                </div>
              </div>
              <div className="mt-3">
                <Sparkline
                  data={[
                    member.efficiency - 5,
                    member.efficiency - 2,
                    member.efficiency + 1,
                    member.efficiency - 1,
                    member.efficiency + 3,
                    member.efficiency,
                    member.efficiency + 2,
                  ]}
                  height={28}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
