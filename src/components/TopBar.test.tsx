import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { TopBar } from "@/components/TopBar";

function renderTopBar() {
  return render(
    <ThemeProvider>
      <AuthProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <TopBar />
          </BrowserRouter>
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

describe("TopBar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders search, notifications, and settings controls", () => {
    renderTopBar();
    expect(screen.getByRole("combobox", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Profile menu" })).toBeInTheDocument();
  });

  it("announces the real unread notification count", () => {
    renderTopBar();
    const bell = screen.getByRole("button", { name: /3 unread/i });
    expect(bell).toBeInTheDocument();
  });

  it("toggles the theme", async () => {
    const user = userEvent.setup();
    renderTopBar();
    const toggle = screen.getByRole("button", { name: /switch to light mode/i });
    await user.click(toggle);
    expect(document.documentElement.classList).toContain("light");
    expect(screen.getByRole("button", { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it("opens the notifications panel from the bell", async () => {
    const user = userEvent.setup();
    renderTopBar();
    await user.click(screen.getByRole("button", { name: /notifications/i }));
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("3 new")).toBeInTheDocument();
  });

  it("navigates to settings from the profile dropdown", async () => {
    window.history.replaceState({}, "", "/");
    const user = userEvent.setup();
    renderTopBar();

    await user.click(screen.getByRole("button", { name: "Profile menu" }));
    await user.click(screen.getByRole("menuitem", { name: /profile/i }));

    expect(window.location.pathname).toBe("/settings");
  });

  it("logs out from the profile dropdown", async () => {
    const user = userEvent.setup();
    renderTopBar();

    await user.click(screen.getByRole("button", { name: "Profile menu" }));
    await user.click(screen.getByRole("menuitem", { name: /log out/i }));

    const stored = JSON.parse(localStorage.getItem("auth")!);
    expect(stored.isAuthenticated).toBe(false);
  });

  it("opens mobile menu only when an opener is provided", async () => {
    const user = userEvent.setup();
    const onOpenMenu = vi.fn();
    render(
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
            <BrowserRouter>
              <TopBar onOpenMenu={onOpenMenu} />
            </BrowserRouter>
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    );

    const openMenu = screen.getByRole("button", { name: "Open menu" });
    await user.click(openMenu);
    expect(onOpenMenu).toHaveBeenCalledTimes(1);
  });
});
