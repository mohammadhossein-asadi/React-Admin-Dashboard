import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBox } from "@/components/StatBox";

function renderStat(overrides: Partial<React.ComponentProps<typeof StatBox>> = {}) {
  return render(
    <StatBox
      title="128"
      subtitle="Emails Sent"
      icon={<span aria-hidden="true" />}
      progress={72}
      increase="+12%"
      {...overrides}
    />
  );
}

describe("StatBox", () => {
  it("renders the title, subtitle, and increase", () => {
    renderStat();
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("Emails Sent")).toBeInTheDocument();
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });

  it("colors positive increases with success", () => {
    renderStat();
    expect(screen.getByText("+12%")).toHaveClass("text-success");
  });

  it("colors negative increases with destructive", () => {
    renderStat({ increase: "-4%" });
    expect(screen.getByText("-4%")).toHaveClass("text-destructive");
  });

  it("renders a sparkline when data is provided", () => {
    renderStat({ sparklineData: [1, 2, 3] });
    expect(screen.getByRole("img", { name: "Trend sparkline" })).toBeInTheDocument();
  });

  it("omits the sparkline when no data is provided", () => {
    renderStat({ sparklineData: undefined });
    expect(screen.queryByRole("img", { name: "Trend sparkline" })).not.toBeInTheDocument();
  });
});
