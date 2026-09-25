import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SearchCommand } from "@/components/SearchCommand";
import { routes } from "@/lib/routes";

function renderSearch() {
  return render(
    <BrowserRouter>
      <SearchCommand />
    </BrowserRouter>
  );
}

const getInput = () => screen.getByRole("combobox", { name: /search/i });

describe("SearchCommand", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("exposes combobox semantics", () => {
    renderSearch();
    const input = getInput();
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-controls", "search-results-list");
  });

  it("shows all navigation routes in results (no drift)", async () => {
    const user = userEvent.setup();
    renderSearch();
    await user.type(getInput(), "chart");
    // All four chart routes must be findable via search
    for (const title of ["Bar Chart", "Pie Chart", "Line Chart", "Geography"]) {
      expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("finds previously missing routes", async () => {
    const user = userEvent.setup();
    renderSearch();
    for (const query of ["E-Commerce", "Email", "Support Tickets", "Performance", "Team Feed"]) {
      await user.clear(getInput());
      await user.type(getInput(), query);
      expect(
        screen.getAllByText(routes.find((i) => i.title === query)!.title).length
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it("navigates with arrow keys and Enter", async () => {
    const user = userEvent.setup();
    renderSearch();
    const input = getInput();
    await user.type(input, "invoice");

    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(0);
    expect(options[0]).toHaveAttribute("aria-selected", "false");

    await user.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Enter}");
    expect(window.location.pathname).toBe("/invoices");
  });

  it("shows a no-results message", async () => {
    const user = userEvent.setup();
    renderSearch();
    await user.type(getInput(), "zzzznotfound");
    expect(screen.getByText(/No results found/)).toBeInTheDocument();
  });
});
