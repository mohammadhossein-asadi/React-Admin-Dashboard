import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "@/contexts/auth-context";

function LogoutProbe() {
  const { user, isAuthenticated, logout, login, updateUser } = useAuth();
  return (
    <div>
      <span data-testid="status">{isAuthenticated ? "signed-in" : "signed-out"}</span>
      <span data-testid="name">{`${user.firstName} ${user.lastName}`}</span>
      <button onClick={logout}>logout</button>
      <button onClick={login}>login</button>
      <button onClick={() => updateUser({ firstName: "Arya" })}>rename</button>
    </div>
  );
}

function renderAuth() {
  return render(
    <AuthProvider>
      <LogoutProbe />
    </AuthProvider>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("is signed in by default with a default user", () => {
    renderAuth();
    expect(screen.getByTestId("status")).toHaveTextContent("signed-in");
    expect(screen.getByTestId("name")).toHaveTextContent("Mohammadhossein Asadi");
  });

  it("logs out and logs back in", async () => {
    const user = userEvent.setup();
    renderAuth();
    await user.click(screen.getByText("logout"));
    expect(screen.getByTestId("status")).toHaveTextContent("signed-out");
    await user.click(screen.getByText("login"));
    expect(screen.getByTestId("status")).toHaveTextContent("signed-in");
  });

  it("persists sign-out state across remounts", async () => {
    const user = userEvent.setup();
    const { unmount } = renderAuth();
    await user.click(screen.getByText("logout"));
    unmount();

    renderAuth();
    expect(screen.getByTestId("status")).toHaveTextContent("signed-out");
  });

  it("updates the user profile", async () => {
    const user = userEvent.setup();
    renderAuth();
    await user.click(screen.getByText("rename"));
    expect(screen.getByTestId("name")).toHaveTextContent("Arya Asadi");
    expect(JSON.parse(localStorage.getItem("auth")!).user.firstName).toBe("Arya");
  });
});
