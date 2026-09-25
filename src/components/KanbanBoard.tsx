import { useCallback } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { KanbanColumnComponent } from "./KanbanColumn";
import { applyDrag } from "@/lib/kanban-drag";
import type { KanbanColumn } from "@/types";

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onColumnsChange: React.Dispatch<React.SetStateAction<KanbanColumn[]>>;
}

export function KanbanBoard({ columns, onColumnsChange }: KanbanBoardProps) {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      onColumnsChange((prev) => applyDrag(prev, result));
    },
    [onColumnsChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((column) => (
          <KanbanColumnComponent key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
}
