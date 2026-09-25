import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "@/components/DataTable";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";

interface TestItem {
  id: number;
  name: string;
  email: string;
}

const testColumns: LegacyColumnDef<TestItem, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const testData: TestItem[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

describe("DataTable", () => {
  it("renders table with data", () => {
    render(<DataTable columns={testColumns} data={testData} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
  });

  it("shows 'No results' for empty data", () => {
    render(<DataTable columns={testColumns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("renders search input when searchColumn is provided", () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        searchColumn="name"
        searchPlaceholder="Search by name"
      />
    );
    expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
  });

  it("does not render search input when searchColumn is not provided", () => {
    render(<DataTable columns={testColumns} data={testData} />);
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("filters data based on search input", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        searchColumn="name"
        searchPlaceholder="Search by name"
      />
    );

    const searchInput = screen.getByPlaceholderText("Search by name");
    await user.type(searchInput, "Alice");

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
    expect(screen.queryByText("Charlie Brown")).not.toBeInTheDocument();
  });

  it("shows pagination controls", () => {
    render(<DataTable columns={testColumns} data={testData} />);
    expect(screen.getByText(/Page/)).toBeInTheDocument();
  });
});
