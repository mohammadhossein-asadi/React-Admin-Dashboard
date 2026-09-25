import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { mockNotifications } from "@/data/notifications";

const STORAGE_KEY = "notifications-state";

function renderPanel(onClose = vi.fn()) {
  const utils = render(
    <MemoryRouter initialEntries={["/"]}>
      <NotificationsProvider>
        <NotificationsPanel onClose={onClose} />
        <Routes>
          <Route path="/" element={<div>home page</div>} />
          <Route path="/team" element={<div>team page</div>} />
        </Routes>
      </NotificationsProvider>
    </MemoryRouter>
  );
  return { ...utils, onClose };
}

describe("NotificationsPanel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("lists notifications with an unread badge and actions", () => {
    renderPanel();

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("3 new")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mark all read/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();

    const first = screen.getByRole("button", { name: /New team member joined \(unread\)/ });
    expect(
      within(first).getByText("Naruto Uzumaki has been added to the team.")
    ).toBeInTheDocument();
  });

  it("marks every notification read from the header action", async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(screen.getByRole("button", { name: /mark all read/i }));

    expect(screen.queryByText(/new/)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /mark all read/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("clears all notifications and shows the empty state", async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(screen.getByRole("button", { name: /clear/i }));

    expect(screen.getByText("No notifications")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("marks a notification read, navigates to its href, and closes", async () => {
    const user = userEvent.setup();
    const { onClose } = renderPanel();

    await user.click(screen.getByRole("button", { name: /New team member joined \(unread\)/ }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("team page")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /New team member joined \(unread\)/ })
    ).not.toBeInTheDocument();
  });

  it("renders the empty state when everything was previously cleared", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ readIds: [], clearedIds: mockNotifications.map((n) => n.id) })
    );
    renderPanel();
    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("hides the unread badge for previously read notifications", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ readIds: mockNotifications.map((n) => n.id), clearedIds: [] })
    );
    renderPanel();
    expect(screen.queryByText(/new/)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /mark all read/i })).not.toBeInTheDocument();
  });
});
