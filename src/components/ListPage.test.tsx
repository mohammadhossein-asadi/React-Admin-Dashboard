import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { ListPage } from "@/components/ListPage";

interface Row {
  name: string;
}

const columns: LegacyColumnDef<Row, unknown>[] = [{ header: "Name", accessorKey: "name" }];

function renderList(loader: () => Promise<Row[]>) {
  return render(
    <MemoryRouter>
      <ListPage subtitle="List of members" loader={loader} columns={columns} searchColumn="name" />
    </MemoryRouter>
  );
}

describe("ListPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows the loading skeleton while the loader is pending", async () => {
    let resolve!: (value: Row[]) => void;
    const loader = vi.fn(
      () =>
        new Promise<Row[]>((r) => {
          resolve = r;
        })
    );

    renderList(loader);
    expect(screen.getByRole("status", { name: /loading data/i })).toBeInTheDocument();
    expect(screen.getByText("List of members")).toBeInTheDocument();

    resolve([{ name: "Arya" }]);
    expect(await screen.findByText("Arya")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows the error state and recovers through retry", async () => {
    const user = userEvent.setup();
    const loader = vi
      .fn<() => Promise<Row[]>>()
      .mockRejectedValueOnce(new Error("db offline"))
      .mockResolvedValueOnce([{ name: "Arya" }]);

    renderList(loader);
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("db offline");

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(await screen.findByText("Arya")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it("derives its heading from the route registry", async () => {
    const loader = vi.fn(() => Promise.resolve<Row[]>([]));
    render(
      <MemoryRouter initialEntries={["/contacts"]}>
        <ListPage
          subtitle="List of Contacts for Future Reference"
          loader={loader}
          columns={columns}
        />
      </MemoryRouter>
    );
    expect(await screen.findByText("CONTACTS")).toBeInTheDocument();
  });
});
