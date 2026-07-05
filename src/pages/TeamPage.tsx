import { type ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { mockDataTeam } from "@/data/mock-data";
import type { TeamMember } from "@/types";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

const accessConfig = {
  admin: { label: "Admin", variant: "success" as const, icon: ShieldCheck },
  manager: { label: "Manager", variant: "secondary" as const, icon: Shield },
  user: { label: "User", variant: "outline" as const, icon: ShieldAlert },
};

const columns: ColumnDef<TeamMember, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium text-success">{row.original.name}</span>,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <span>{row.original.age}</span>,
  },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "access",
    header: "Access Level",
    cell: ({ row }) => {
      const access = row.original.access;
      const config = accessConfig[access];
      const Icon = config.icon;
      return (
        <Badge variant={config.variant} className="flex w-fit items-center gap-1">
          <Icon className="h-3 w-3" />
          {config.label}
        </Badge>
      );
    },
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <DataTable columns={columns} data={mockDataTeam} searchColumn="name" searchPlaceholder="Search by name..." />
    </div>
  );
}
