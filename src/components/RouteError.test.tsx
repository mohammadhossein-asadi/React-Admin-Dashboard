import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router-dom";
import { RouteError } from "@/components/RouteError";

function Boom({ error }: { error: unknown }): never {
  throw error;
}

function renderRouteError(error: unknown) {
  const router = createMemoryRouter(
    [
      { path: "/", element: <div>dashboard home</div> },
      { path: "/boom", element: <Boom error={error} />, errorElement: <RouteError /> },
    ],
    { initialEntries: ["/boom"] }
  );
  return render(<RouterProvider router={router} />);
}

describe("RouteError", () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it("shows the message of an Error", () => {
    renderRouteError(new Error("chunk failed to load"));
    expect(screen.getByText("Page failed to load")).toBeInTheDocument();
    expect(screen.getByText("chunk failed to load")).toBeInTheDocument();
  });

  it("shows status and statusText for route error responses", () => {
    renderRouteError({
      status: 500,
      statusText: "Internal Server Error",
      internal: false,
      data: null,
    });
    expect(screen.getByText("500 Internal Server Error")).toBeInTheDocument();
  });

  it("falls back to a default message for unknown throw values", () => {
    renderRouteError("just a string");
    expect(screen.getByText("Something went wrong while loading this page.")).toBeInTheDocument();
  });

  it("links back to the dashboard", async () => {
    const user = userEvent.setup();
    renderRouteError(new Error("boom"));
    await user.click(screen.getByRole("link", { name: /back to dashboard/i }));
    expect(await screen.findByText("dashboard home")).toBeInTheDocument();
  });

  it("catches child route errors with a parent layout errorElement", () => {
    const router = createMemoryRouter(
      [
        {
          element: (
            <div>
              <nav>app chrome</nav>
              <Outlet />
            </div>
          ),
          errorElement: <RouteError />,
          children: [{ path: "/broken", element: <Boom error={new Error("child exploded")} /> }],
        },
      ],
      { initialEntries: ["/broken"] }
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByText("child exploded")).toBeInTheDocument();
    expect(screen.queryByText("app chrome")).not.toBeInTheDocument();
  });
});
