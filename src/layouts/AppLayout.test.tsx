import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { AppLayout } from "@/layouts/AppLayout";

function renderLayout() {
  return render(
    <ThemeProvider>
      <AuthProvider>
        <NotificationsProvider>
          <MemoryRouter>
            <AppLayout />
          </MemoryRouter>
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

describe("AppLayout", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the authenticated shell with skip link", () => {
    renderLayout();
    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
    expect(screen.getByText("ADMINIS")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the signed-out screen and lets the user sign back in", async () => {
    const user = userEvent.setup();
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: false }));
    renderLayout();

    expect(screen.getByText("Signed out")).toBeInTheDocument();
    expect(screen.queryByText("ADMINIS")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /sign back in/i }));
    expect(screen.getByText("ADMINIS")).toBeInTheDocument();
    expect(screen.queryByText("Signed out")).not.toBeInTheDocument();
  });
});
