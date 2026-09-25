import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/contexts/theme-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { SecurityTab } from "@/pages/settings/SecurityTab";

function renderTab() {
  return render(
    <ThemeProvider>
      <SettingsProvider>
        <SecurityTab />
      </SettingsProvider>
    </ThemeProvider>
  );
}

describe("SecurityTab", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows two-factor as disabled by default", () => {
    renderTab();
    expect(screen.getByText("Disabled")).toBeInTheDocument();
    expect(screen.getByText("Session")).toBeInTheDocument();
  });

  it("toggles two-factor authentication on and off", async () => {
    const user = userEvent.setup();
    renderTab();

    const toggle = screen.getByRole("switch", { name: "Two-factor authentication" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("Enabled")).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });
});
