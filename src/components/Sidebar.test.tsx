import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/contexts/auth-context";

function renderWithRouter(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );
}

describe("Sidebar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the logo text", () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText("ADMINIS")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Manage Team")).toBeInTheDocument();
    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Invoices")).toBeInTheDocument();
    expect(screen.getByText("Profile Form")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Bar Chart")).toBeInTheDocument();
    expect(screen.getByText("Pie Chart")).toBeInTheDocument();
    expect(screen.getByText("Line Chart")).toBeInTheDocument();
    expect(screen.getByText("Geography")).toBeInTheDocument();
  });

  it("renders category labels", () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Pages")).toBeInTheDocument();
    expect(screen.getByText("Charts")).toBeInTheDocument();
  });

  it("renders profile info when not collapsed", () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText("Mohammadhossein")).toBeInTheDocument();
    expect(screen.getByText("VP Fancy Admin")).toBeInTheDocument();
  });

  it("collapses and persists the state", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Sidebar />);

    await user.click(screen.getByRole("button", { name: "Collapse sidebar" }));

    expect(localStorage.getItem("sidebar-collapsed")).toBe("true");
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeInTheDocument();
    expect(screen.queryByText("Mohammadhossein")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Expand sidebar" }));
    expect(localStorage.getItem("sidebar-collapsed")).toBe("false");
    expect(screen.getByText("Mohammadhossein")).toBeInTheDocument();
  });

  it("renders without the desktop aside in mobile mode", () => {
    renderWithRouter(<Sidebar isMobile />);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(screen.getByText("ADMINIS")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
