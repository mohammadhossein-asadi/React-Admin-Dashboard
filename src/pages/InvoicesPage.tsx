import { useMemo } from "react";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { useTranslation } from "react-i18next";
import { ListPage } from "@/components/ListPage";
import { getInvoices } from "@/services";
import type { Invoice } from "@/types";

export default function InvoicesPage() {
  const { t } = useTranslation();

  const columns = useMemo<LegacyColumnDef<Invoice, unknown>[]>(
    () => [
      { accessorKey: "id", header: t("ID") },
      {
        accessorKey: "name",
        header: t("Name"),
        cell: ({ row }) => <span className="font-medium text-success">{row.original.name}</span>,
      },
      { accessorKey: "phone", header: t("Phone Number") },
      { accessorKey: "email", header: t("Email") },
      {
        accessorKey: "cost",
        header: t("Cost"),
        cell: ({ row }) => (
          <span className="font-medium text-success">${row.original.cost.toLocaleString()}</span>
        ),
      },
      { accessorKey: "date", header: t("Date") },
    ],
    [t]
  );

  return (
    <ListPage
      subtitle={t("List of Invoice Balances")}
      loader={getInvoices}
      columns={columns}
      searchColumn="name"
      searchPlaceholder={t("Search by name...")}
    />
  );
}
