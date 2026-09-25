import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";
import { routes } from "@/lib/routes";

const routeCases = routes.map((route) => ({ path: route.href, heading: route.heading }));

function renderAt(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("App routing", () => {
  it.each(routeCases)("renders $heading at $path", async ({ path, heading }) => {
    renderAt(path);
    expect(
      (await screen.findAllByText(heading, {}, { timeout: 15000 })).length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("Page Not Found")).not.toBeInTheDocument();
  });

  it("renders 404 page for unknown routes", async () => {
    renderAt("/nonexistent");
    expect(await screen.findByText("Page Not Found", {}, { timeout: 15000 })).toBeInTheDocument();
  });
});
