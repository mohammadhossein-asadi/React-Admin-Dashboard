import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";

function TestComponent() {
  const { theme } = useTheme();
  return <span>{theme}</span>;
}

describe("ThemeProvider", () => {
  it("provides default dark theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByText("dark")).toBeInTheDocument();
  });
});
