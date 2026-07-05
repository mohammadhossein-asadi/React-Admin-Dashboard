import { type ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { mockDataContacts } from "@/data/mock-data";
import type { Contact } from "@/types";

const columns: ColumnDef<Contact, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "registrarId", header: "Registrar ID" },
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
  { accessorKey: "phone", header: "Phone Number" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "zipCode", header: "Zip Code" },
];

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />
      <DataTable columns={columns} data={mockDataContacts} searchColumn="name" searchPlaceholder="Search by name..." />
    </div>
  );
}
