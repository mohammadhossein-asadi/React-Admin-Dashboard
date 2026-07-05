import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

describe("Header", () => {
  it("renders title and subtitle", () => {
    render(<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />);
    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
    expect(screen.getByText("Welcome to your dashboard")).toBeInTheDocument();
  });
});
