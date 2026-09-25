import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationsProvider, useNotifications } from "@/contexts/notifications-context";

function TestComponent() {
  const { notifications, unreadCount, markRead, markAllRead, clearAll } = useNotifications();
  return (
    <div>
      <span data-testid="unread">{unreadCount}</span>
      <span data-testid="total">{notifications.length}</span>
      <button onClick={() => markRead("n1")}>read-first</button>
      <button onClick={markAllRead}>read-all</button>
      <button onClick={clearAll}>clear</button>
    </div>
  );
}

function renderProvider() {
  return render(
    <NotificationsProvider>
      <TestComponent />
    </NotificationsProvider>
  );
}

describe("NotificationsProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reports unread count from mock data", () => {
    renderProvider();
    expect(screen.getByTestId("unread")).toHaveTextContent("3");
    expect(screen.getByTestId("total")).toHaveTextContent("8");
  });

  it("marks a single notification as read", async () => {
    const user = userEvent.setup();
    renderProvider();
    await user.click(screen.getByText("read-first"));
    expect(screen.getByTestId("unread")).toHaveTextContent("2");
  });

  it("marks all notifications as read", async () => {
    const user = userEvent.setup();
    renderProvider();
    await user.click(screen.getByText("read-all"));
    expect(screen.getByTestId("unread")).toHaveTextContent("0");
  });

  it("clears all notifications", async () => {
    const user = userEvent.setup();
    renderProvider();
    await user.click(screen.getByText("clear"));
    expect(screen.getByTestId("total")).toHaveTextContent("0");
    expect(screen.getByTestId("unread")).toHaveTextContent("0");
  });

  it("persists read/cleared state across remounts", async () => {
    const user = userEvent.setup();
    const { unmount } = renderProvider();
    await user.click(screen.getByText("read-first"));
    unmount();

    renderProvider();
    expect(screen.getByTestId("unread")).toHaveTextContent("2");
  });
});
