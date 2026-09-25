import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadingState, ErrorState } from "@/components/DataState";

describe("LoadingState", () => {
  it("renders an accessible status with default skeleton rows", () => {
    render(<LoadingState />);
    const status = screen.getByRole("status", { name: /loading data/i });
    expect(within(status).getAllByRole("presentation")).toHaveLength(5);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders a custom number of rows", () => {
    render(<LoadingState rows={2} />);
    const status = screen.getByRole("status", { name: /loading data/i });
    expect(within(status).getAllByRole("presentation")).toHaveLength(2);
  });
});

describe("ErrorState", () => {
  it("shows the message and invokes retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorState message="Could not reach the server" onRetry={onRetry} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
    expect(screen.getByText("Could not reach the server")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
