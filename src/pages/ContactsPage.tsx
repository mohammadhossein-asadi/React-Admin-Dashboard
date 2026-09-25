import { useMemo } from "react";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { useTranslation } from "react-i18next";
import { ListPage } from "@/components/ListPage";
import { getContacts } from "@/services";
import type { Contact } from "@/types";

export default function ContactsPage() {
  const { t } = useTranslation();

  const columns = useMemo<LegacyColumnDef<Contact, unknown>[]>(
    () => [
      { accessorKey: "id", header: t("ID") },
      { accessorKey: "registrarId", header: t("Registrar ID") },
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
      { accessorKey: "phone", header: t("Phone Number") },
      { accessorKey: "email", header: t("Email") },
      { accessorKey: "address", header: t("Address") },
      { accessorKey: "city", header: t("City") },
      { accessorKey: "zipCode", header: t("Zip Code") },
    ],
    [t]
  );

  return (
    <ListPage
      subtitle={t("List of Contacts for Future Reference")}
      loader={getContacts}
      columns={columns}
      searchColumn="name"
      searchPlaceholder={t("Search by name...")}
    />
  );
}
