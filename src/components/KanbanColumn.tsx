import { memo } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { KanbanCard } from "./KanbanCard";
import { cn } from "@/lib/utils";
import type { KanbanColumn as KanbanColumnType } from "@/types";

interface KanbanColumnProps {
  column: KanbanColumnType;
}

export const KanbanColumnComponent = memo(function KanbanColumnComponent({ column }: KanbanColumnProps) {
  return (
    <div className="flex flex-col rounded-lg bg-muted/50 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{column.title}</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {column.tasks.length}
        </span>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex flex-1 flex-col gap-2 overflow-y-auto min-h-[200px] transition-colors rounded-md p-1",
              snapshot.isDraggingOver && "bg-success/5"
            )}
          >
            {column.tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});
