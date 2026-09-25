import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressCircle } from "@/components/ProgressCircle";

describe("ProgressCircle", () => {
  it("renders with default progress", () => {
    render(<ProgressCircle />);
    expect(screen.getByRole("img", { name: /progress/i })).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    render(<ProgressCircle size={100} />);
    const svg = screen.getByRole("img", { name: /progress/i });
    expect(svg).toHaveAttribute("width", "100");
    expect(svg).toHaveAttribute("height", "100");
  });

  it("shows label when showLabel is true", () => {
    render(<ProgressCircle progress={0.75} showLabel />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
