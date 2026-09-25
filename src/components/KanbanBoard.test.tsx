import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { DropResult } from "@hello-pangea/dnd";
import { KanbanBoard } from "@/components/KanbanBoard";
import { applyDrag } from "@/lib/kanban-drag";
import type { KanbanColumn } from "@/types";

function makeColumns(): KanbanColumn[] {
  return [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "t1", title: "Design review", description: "", priority: "high", assignee: "A" },
        { id: "t2", title: "Write specs", description: "", priority: "low", assignee: "B" },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [{ id: "t3", title: "Ship it", description: "", priority: "medium", assignee: "C" }],
    },
  ];
}

function drop(partial: Partial<DropResult>): DropResult {
  return {
    draggableId: "t1",
    type: "DEFAULT",
    reason: "DROP",
    combine: null,
    mode: "SNAP",
    source: { droppableId: "todo", index: 0 },
    destination: { droppableId: "done", index: 0 },
    ...partial,
  };
}

describe("applyDrag", () => {
  it("returns the same reference when there is no destination", () => {
    const columns = makeColumns();
    expect(applyDrag(columns, drop({ destination: null }))).toBe(columns);
  });

  it("returns the same reference when the drop position is unchanged", () => {
    const columns = makeColumns();
    expect(
      applyDrag(
        columns,
        drop({
          source: { droppableId: "todo", index: 1 },
          destination: { droppableId: "todo", index: 1 },
        })
      )
    ).toBe(columns);
  });

  it("returns the same reference for unknown droppable ids", () => {
    const columns = makeColumns();
    expect(
      applyDrag(
        columns,
        drop({
          source: { droppableId: "ghost", index: 0 },
          destination: { droppableId: "done", index: 0 },
        })
      )
    ).toBe(columns);
  });

  it("moves a task to another column without mutating the input", () => {
    const columns = makeColumns();
    const snapshot = JSON.parse(JSON.stringify(columns));

    const next = applyDrag(
      columns,
      drop({
        source: { droppableId: "todo", index: 0 },
        destination: { droppableId: "done", index: 1 },
      })
    );

    expect(next).not.toBe(columns);
    expect(next.find((c) => c.id === "todo")!.tasks.map((t) => t.id)).toEqual(["t2"]);
    expect(next.find((c) => c.id === "done")!.tasks.map((t) => t.id)).toEqual(["t3", "t1"]);
    expect(columns).toEqual(snapshot);
  });

  it("reorders within the same column", () => {
    const columns = makeColumns();

    const next = applyDrag(
      columns,
      drop({
        source: { droppableId: "todo", index: 0 },
        destination: { droppableId: "todo", index: 1 },
      })
    );

    expect(next.find((c) => c.id === "todo")!.tasks.map((t) => t.id)).toEqual(["t2", "t1"]);
  });

  it("handles an out-of-range source index without dropping anything", () => {
    const columns = makeColumns();

    const next = applyDrag(
      columns,
      drop({
        source: { droppableId: "todo", index: 99 },
        destination: { droppableId: "done", index: 0 },
      })
    );

    expect(next.find((c) => c.id === "todo")!.tasks).toHaveLength(2);
    expect(next.find((c) => c.id === "done")!.tasks.map((t) => t.id)).toEqual(["t3"]);
  });
});

describe("KanbanBoard", () => {
  it("renders columns with their tasks", () => {
    const onColumnsChange = vi.fn();
    render(<KanbanBoard columns={makeColumns()} onColumnsChange={onColumnsChange} />);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Design review")).toBeInTheDocument();
    expect(screen.getByText("Ship it")).toBeInTheDocument();
    expect(onColumnsChange).not.toHaveBeenCalled();
  });
});
