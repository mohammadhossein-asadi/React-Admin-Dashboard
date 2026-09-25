import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { AuthProvider } from "@/contexts/auth-context";
import SettingsPage from "@/pages/SettingsPage";

function renderSettings() {
  return render(
    <MemoryRouter initialEntries={["/settings"]}>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <SettingsPage />
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe("SettingsPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders all setting tabs", () => {
    renderSettings();
    for (const tab of ["Profile", "Account", "Appearance", "Notifications", "Security"]) {
      expect(screen.getByRole("tab", { name: new RegExp(tab) })).toBeInTheDocument();
    }
  });

  it("saves profile changes to persisted auth state", async () => {
    const user = userEvent.setup();
    renderSettings();

    const firstName = screen.getByLabelText("First Name");
    await user.clear(firstName);
    await user.type(firstName, "Arya");
    await user.click(screen.getByRole("button", { name: /Save Changes/ }));

    expect(screen.getByRole("button", { name: /Saved!/ })).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem("auth")!);
    expect(stored.user.firstName).toBe("Arya");
  });

  it("toggles dark mode via an accessible switch", async () => {
    const user = userEvent.setup();
    renderSettings();
    await user.click(screen.getByRole("tab", { name: /Appearance/ }));

    const darkSwitch = screen.getByRole("switch", { name: "Dark mode" });
    expect(darkSwitch).toHaveAttribute("aria-checked", "true");

    await user.click(darkSwitch);
    expect(darkSwitch).toHaveAttribute("aria-checked", "false");
    expect(document.documentElement.classList).toContain("light");
  });

  it("applies an accent color selection", async () => {
    const user = userEvent.setup();
    renderSettings();
    await user.click(screen.getByRole("tab", { name: /Appearance/ }));

    const blueSwatch = screen.getByRole("button", { name: "Blue accent" });
    await user.click(blueSwatch);

    expect(blueSwatch).toHaveAttribute("aria-pressed", "true");
    // Dark theme accent value for blue
    expect(document.documentElement.style.getPropertyValue("--primary")).toBe("217 91% 65%");
    expect(JSON.parse(localStorage.getItem("settings")!).accent).toBe("blue");
  });

  it("changes the document language and UI strings", async () => {
    const user = userEvent.setup();
    renderSettings();
    await user.click(screen.getByRole("tab", { name: /Appearance/ }));

    const languageSelect = screen.getByLabelText("Preferred language");
    await user.selectOptions(languageSelect, "es");

    expect(document.documentElement.lang).toBe("es");
    await waitFor(() => expect(document.body).toBeInTheDocument());
    console.log("Document text:", document.body.innerText);
    // Check if any tab has Apariencia
    const allTabs = screen.getAllByRole("tab");
    console.log(
      "All tabs:",
      allTabs.map((t) => t.textContent)
    );
    expect(screen.getAllByText("Apariencia").length).toBeGreaterThanOrEqual(1);
    expect(JSON.parse(localStorage.getItem("settings")!).language).toBe("es");

    await user.selectOptions(languageSelect, "en");
    expect(
      await screen.findByText("Customize the look and feel of your dashboard.")
    ).toBeInTheDocument();
  });

  it("persists notification preferences", async () => {
    const user = userEvent.setup();
    renderSettings();
    await user.click(screen.getByRole("tab", { name: /Notifications/ }));

    const marketingSwitch = screen.getByRole("switch", { name: "Marketing Emails" });
    expect(marketingSwitch).toHaveAttribute("aria-checked", "false");

    await user.click(marketingSwitch);
    expect(marketingSwitch).toHaveAttribute("aria-checked", "true");
    expect(JSON.parse(localStorage.getItem("settings")!).notifications.marketingEmails).toBe(true);
  });
});
