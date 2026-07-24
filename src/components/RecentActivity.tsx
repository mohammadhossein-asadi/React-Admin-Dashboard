import { mockActivityLog } from "@/data/mock-data";

export function RecentActivity() {
  return (
    <div className="space-y-3">
      {mockActivityLog.map((entry) => {
        const Icon = entry.icon;
        return (
          <div key={entry.id} className="flex items-center gap-3">
            <div className="rounded-md bg-muted p-1.5">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium text-success">{entry.user}</span>{" "}
                <span className="text-muted-foreground">{entry.action}</span>{" "}
                <span className="font-medium">{entry.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
