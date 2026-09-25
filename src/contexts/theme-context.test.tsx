import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides default dark theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("toggles between light and dark", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("persists theme to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    await user.click(screen.getByText("toggle"));
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("restores a stored theme on mount", () => {
    localStorage.setItem("theme", "light");
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("applies the theme class to the document root", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(document.documentElement.classList).toContain("dark");
  });
});
