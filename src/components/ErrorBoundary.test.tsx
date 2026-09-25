import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Errors logged by React in tests are expected here
const originalError = console.error;
beforeAll(() => {
  console.error = () => {};
});
afterAll(() => {
  console.error = originalError;
});

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("boom");
  return <p>All good</p>;
}

describe("ErrorBoundary", () => {
  it("renders children when nothing throws", () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("renders fallback UI with error details when a child throws", () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("boom")).toBeInTheDocument();
  });

  it("recovers when 'Try Again' remounts children that no longer throw", async () => {
    const user = userEvent.setup();
    let shouldThrow = true;
    function Flaky() {
      if (shouldThrow) throw new Error("transient");
      return <p>Recovered content</p>;
    }

    render(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    shouldThrow = false;
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(screen.getByText("Recovered content")).toBeInTheDocument();
  });
});
