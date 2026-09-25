import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { KanbanBoard } from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { initialColumns } from "@/data/kanban-data";
import type { KanbanColumn, KanbanTask } from "@/types";

export default function KanbanPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = () => {
    if (!title.trim()) {
      setError(t("Title is required."));
      return;
    }
    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      priority: "medium",
      assignee: assignee.trim() || "Unassigned",
    };
    setColumns((prev) =>
      prev.map((col) => (col.id === "todo" ? { ...col, tasks: [...col.tasks, newTask] } : col))
    );
    setTitle("");
    setDescription("");
    setAssignee("");
    setError(null);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        subtitle={t("Manage your tasks with drag and drop")}
        actions={
          <Dialog
            open={open}
            onOpenChange={(next) => {
              setOpen(next);
              if (!next) setError(null);
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("Add Task")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("Create New Task")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">{t("Title")}</Label>
                  <Input
                    id="task-title"
                    placeholder={t("Enter task title")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreate();
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-desc">{t("Description")}</Label>
                  <Input
                    id="task-desc"
                    placeholder={t("Enter task description")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-assignee">{t("Assignee")}</Label>
                  <Input
                    id="task-assignee"
                    placeholder={t("Enter assignee name")}
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleCreate} className="w-full sm:w-auto">
                  {t("Create Task")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <KanbanBoard columns={columns} onColumnsChange={setColumns} />
    </div>
  );
}
