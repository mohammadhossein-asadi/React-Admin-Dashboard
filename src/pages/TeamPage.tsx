import { useMemo } from "react";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { useTranslation } from "react-i18next";
import { ListPage } from "@/components/ListPage";
import { Badge } from "@/components/ui/badge";
import { getTeam } from "@/services";
import type { TeamMember } from "@/types";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

const accessConfig = {
  admin: { variant: "success" as const, icon: ShieldCheck },
  manager: { variant: "secondary" as const, icon: Shield },
  user: { variant: "outline" as const, icon: ShieldAlert },
};

export default function TeamPage() {
  const { t } = useTranslation();
  const accessLabels: Record<TeamMember["access"], string> = {
    admin: t("Admin"),
    manager: t("Manager"),
    user: t("User"),
  };

  const columns = useMemo<LegacyColumnDef<TeamMember, unknown>[]>(
    () => [
      { accessorKey: "id", header: t("ID") },
      {
        accessorKey: "name",
        header: t("Name"),
        cell: ({ row }) => <span className="font-medium text-success">{row.original.name}</span>,
      },
      {
        accessorKey: "age",
        header: t("Age"),
        cell: ({ row }) => <span>{row.original.age}</span>,
      },
      { accessorKey: "phone", header: t("Phone") },
      { accessorKey: "email", header: t("Email") },
      {
        accessorKey: "access",
        header: t("Access Level"),
        cell: ({ row }) => {
          const access = row.original.access;
          const config = accessConfig[access];
          const Icon = config.icon;
          return (
            <Badge variant={config.variant} className="flex w-fit items-center gap-1">
              <Icon className="h-3 w-3" />
              {accessLabels[access]}
            </Badge>
          );
        },
      },
    ],
    [t]
  );

  return (
    <ListPage
      subtitle={t("Managing the Team Members")}
      loader={getTeam}
      columns={columns}
      searchColumn="name"
      searchPlaceholder={t("Search by name...")}
    />
  );
}
