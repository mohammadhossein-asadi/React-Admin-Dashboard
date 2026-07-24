import type { KanbanColumn } from "@/types";

export const initialColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Redesign login page",
        description: "Update the login page with new branding and improve accessibility.",
        priority: "high",
        assignee: "Jon Snow",
      },
      {
        id: "task-2",
        title: "Write API documentation",
        description: "Document all REST API endpoints with examples and schemas.",
        priority: "medium",
        assignee: "Samwell Tarly",
      },
      {
        id: "task-3",
        title: "Fix mobile navigation",
        description: "Sidebar doesn't close properly on mobile after selecting a link.",
        priority: "high",
        assignee: "Anya Stark",
      },
      {
        id: "task-4",
        title: "Add dark mode to charts",
        description: "Ensure all chart components respect the current theme.",
        priority: "low",
        assignee: "Tyrion Lannister",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-5",
        title: "Build analytics dashboard",
        description: "Create KPI cards, traffic charts, and conversion funnel.",
        priority: "high",
        assignee: "Daenerys Targaryen",
      },
      {
        id: "task-6",
        title: "Implement notifications",
        description: "Add real-time notification panel with read/unread states.",
        priority: "medium",
        assignee: "Sansa Stark",
      },
      {
        id: "task-7",
        title: "Optimize bundle size",
        description: "Code-split routes and lazy-load heavy chart components.",
        priority: "medium",
        assignee: "Bran Stark",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "task-8",
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment.",
        priority: "medium",
        assignee: "Naruto Uzumaki",
      },
      {
        id: "task-9",
        title: "Create data table component",
        description: "Reusable table with search, sort, and pagination using TanStack Table.",
        priority: "high",
        assignee: "Cersei Lannister",
      },
      {
        id: "task-10",
        title: "Add theme support",
        description: "Implement dark/light mode toggle with CSS variables.",
        priority: "low",
        assignee: "Jaime Lannister",
      },
    ],
  },
];
