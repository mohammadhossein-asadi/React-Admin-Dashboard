import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Draggable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { KanbanTask } from "@/types";

interface KanbanCardProps {
  task: KanbanTask;
  index: number;
}

const priorityConfig = {
  high: { label: "High", variant: "destructive" as const },
  medium: { label: "Medium", variant: "secondary" as const },
  low: { label: "Low", variant: "outline" as const },
};

export const KanbanCard = memo(function KanbanCard({ task, index }: KanbanCardProps) {
  const { t } = useTranslation();
  const config = priorityConfig[task.priority];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "rounded-lg border bg-card p-3 shadow-sm transition-shadow",
            snapshot.isDragging && "shadow-md ring-2 ring-success/20"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium leading-snug">{task.title}</h4>
            <Badge variant={config.variant} className="shrink-0 text-xs">
              {t(config.label)}
            </Badge>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-[10px] font-medium text-success">
              {task.assignee
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="text-xs text-muted-foreground">{task.assignee}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
});
