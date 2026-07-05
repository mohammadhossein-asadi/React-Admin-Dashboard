import { type ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { mockDataInvoices } from "@/data/mock-data";
import type { Invoice } from "@/types";

const columns: ColumnDef<Invoice, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium text-success">{row.original.name}</span>,
  },
  { accessorKey: "phone", header: "Phone Number" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => (
      <span className="font-medium text-success">${row.original.cost.toLocaleString()}</span>
    ),
  },
  { accessorKey: "date", header: "Date" },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <DataTable columns={columns} data={mockDataInvoices} searchColumn="name" searchPlaceholder="Search by name..." />
    </div>
  );
}
