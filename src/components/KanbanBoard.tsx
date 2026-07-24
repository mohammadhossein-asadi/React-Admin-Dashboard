import { useState, useCallback } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { KanbanColumnComponent } from "./KanbanColumn";
import { initialColumns } from "@/data/kanban-data";
import type { KanbanColumn } from "@/types";

export function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));

      const sourceCol = newColumns.find((col) => col.id === source.droppableId);
      const destCol = newColumns.find((col) => col.id === destination.droppableId);

      if (!sourceCol || !destCol) return prev;

      const movedTasks = sourceCol.tasks.splice(source.index, 1);
      const movedTask = movedTasks[0];
      if (movedTask) {
        destCol.tasks.splice(destination.index, 0, movedTask);
      }

      return newColumns;
    });
  }, []);

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
