import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("Sidebar", () => {
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
});
