import type { DropResult } from "@hello-pangea/dnd";
import type { KanbanColumn } from "@/types";

export function applyDrag(columns: KanbanColumn[], result: DropResult): KanbanColumn[] {
  const { source, destination } = result;

  if (!destination) return columns;
  if (source.droppableId === destination.droppableId && source.index === destination.index)
    return columns;

  const newColumns = columns.map((col) => ({
    ...col,
    tasks: [...col.tasks],
  }));

  const sourceCol = newColumns.find((col) => col.id === source.droppableId);
  const destCol = newColumns.find((col) => col.id === destination.droppableId);

  if (!sourceCol || !destCol) return columns;

  const movedTasks = sourceCol.tasks.splice(source.index, 1);
  const movedTask = movedTasks[0];
  if (movedTask) {
    destCol.tasks.splice(destination.index, 0, movedTask);
  }

  return newColumns;
}
