import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "@/contexts/auth-context";
import { AccountTab } from "@/pages/settings/AccountTab";

function renderTab() {
  return render(
    <AuthProvider>
      <AccountTab />
    </AuthProvider>
  );
}

describe("AccountTab", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders email and password sections", () => {
    renderTab();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Current Password")).toBeInTheDocument();
  });

  it("validates the email form", async () => {
    const user = userEvent.setup();
    renderTab();

    await user.clear(screen.getByLabelText("Email"));
    await user.click(screen.getByRole("button", { name: /update email/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Email is required.");

    await user.type(screen.getByLabelText("Email"), "arya@example.com");
    await user.click(screen.getByRole("button", { name: /update email/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Email addresses do not match.");
  });

  it("updates the email in persisted auth state", async () => {
    const user = userEvent.setup();
    renderTab();

    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "arya@example.com");
    await user.clear(screen.getByLabelText("Confirm Email"));
    await user.type(screen.getByLabelText("Confirm Email"), "arya@example.com");
    await user.click(screen.getByRole("button", { name: /update email/i }));

    expect(screen.getByRole("status")).toHaveTextContent("Email updated.");
    const stored = JSON.parse(localStorage.getItem("auth")!);
    expect(stored.user.email).toBe("arya@example.com");
  });

  it("validates the password form", async () => {
    const user = userEvent.setup();
    renderTab();

    await user.click(screen.getByRole("button", { name: /update password/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Current password is required.");

    await user.type(screen.getByLabelText("Current Password"), "old-secret");
    await user.type(screen.getByLabelText("New Password"), "short");
    await user.click(screen.getByRole("button", { name: /update password/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "New password must be at least 8 characters."
    );

    await user.clear(screen.getByLabelText("New Password"));
    await user.type(screen.getByLabelText("New Password"), "longenough1");
    await user.type(screen.getByLabelText("Confirm New Password"), "different1");
    await user.click(screen.getByRole("button", { name: /update password/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Passwords do not match.");
  });

  it("accepts a valid password change and clears the fields", async () => {
    const user = userEvent.setup();
    renderTab();

    await user.type(screen.getByLabelText("Current Password"), "old-secret");
    await user.type(screen.getByLabelText("New Password"), "longenough1");
    await user.type(screen.getByLabelText("Confirm New Password"), "longenough1");
    await user.click(screen.getByRole("button", { name: /update password/i }));

    expect(screen.getByRole("status")).toHaveTextContent("Password updated.");
    expect(screen.getByLabelText("Current Password")).toHaveValue("");
    expect(screen.getByLabelText("New Password")).toHaveValue("");
    expect(screen.getByLabelText("Confirm New Password")).toHaveValue("");
  });
});
