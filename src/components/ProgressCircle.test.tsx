import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressCircle } from "@/components/ProgressCircle";

describe("ProgressCircle", () => {
  it("renders with default progress", () => {
    const { container } = render(<ProgressCircle />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    const { container } = render(<ProgressCircle size={100} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "100");
    expect(svg).toHaveAttribute("height", "100");
  });

  it("shows label when showLabel is true", () => {
    render(<ProgressCircle progress={0.75} showLabel />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
