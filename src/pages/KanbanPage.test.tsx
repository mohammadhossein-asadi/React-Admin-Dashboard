import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import KanbanPage from "@/pages/KanbanPage";

function renderKanban() {
  return render(
    <MemoryRouter initialEntries={["/kanban"]}>
      <KanbanPage />
    </MemoryRouter>
  );
}

describe("KanbanPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the board with its columns", () => {
    renderKanban();
    expect(screen.getByText("KANBAN")).toBeInTheDocument();
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  it("requires a title before creating a task", async () => {
    const user = userEvent.setup();
    renderKanban();

    await user.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByText("Create New Task")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^create task$/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Title is required.");
  });

  it("creates a task and closes the dialog", async () => {
    const user = userEvent.setup();
    renderKanban();

    await user.click(screen.getByRole("button", { name: /add task/i }));
    await user.type(screen.getByLabelText("Title"), "Write release notes");
    await user.type(screen.getByLabelText("Description"), "Summarize the changelog");
    await user.type(screen.getByLabelText("Assignee"), "Arya");
    await user.click(screen.getByRole("button", { name: /^create task$/i }));

    expect(screen.queryByText("Create New Task")).not.toBeInTheDocument();
    expect(screen.getByText("Write release notes")).toBeInTheDocument();
  });

  it("creates a task from the Enter key", async () => {
    const user = userEvent.setup();
    renderKanban();

    await user.click(screen.getByRole("button", { name: /add task/i }));
    const title = screen.getByLabelText("Title");
    await user.type(title, "Review PR{Enter}");

    expect(screen.queryByText("Create New Task")).not.toBeInTheDocument();
    expect(screen.getByText("Review PR")).toBeInTheDocument();
  });

  it("clears the validation error when the dialog is closed", async () => {
    const user = userEvent.setup();
    renderKanban();

    await user.click(screen.getByRole("button", { name: /add task/i }));
    await user.click(screen.getByRole("button", { name: /^create task$/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
