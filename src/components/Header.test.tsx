import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/Header";

describe("Header", () => {
  it("renders title and subtitle", () => {
    render(
      <MemoryRouter>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </MemoryRouter>
    );
    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
    expect(screen.getByText("Welcome to your dashboard")).toBeInTheDocument();
  });

  it("derives its heading from the route registry when title is omitted", () => {
    render(
      <MemoryRouter initialEntries={["/form"]}>
        <Header subtitle="Create a New User Profile" />
      </MemoryRouter>
    );
    expect(screen.getByText("CREATE USER")).toBeInTheDocument();
    expect(screen.getByText("Create a New User Profile")).toBeInTheDocument();
  });
});
