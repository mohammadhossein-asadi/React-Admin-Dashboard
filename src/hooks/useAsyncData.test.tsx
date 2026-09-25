import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAsyncData } from "@/hooks/useAsyncData";

describe("useAsyncData", () => {
  it("starts in loading state and resolves data", async () => {
    let resolve!: (value: string[]) => void;
    const loader = vi.fn(
      () =>
        new Promise<string[]>((r) => {
          resolve = r;
        })
    );

    const { result } = renderHook(() => useAsyncData(loader));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    resolve(["a"]);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(["a"]);
    expect(result.current.error).toBeNull();
  });

  it("captures Error messages from failed loads", async () => {
    const loader = vi.fn(() => Promise.reject(new Error("boom")));

    const { result } = renderHook(() => useAsyncData(loader));

    await waitFor(() => expect(result.current.error).toBe("boom"));
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("stringifies non-Error rejections", async () => {
    const loader = vi.fn(() => Promise.reject("plain failure"));

    const { result } = renderHook(() => useAsyncData(loader));

    await waitFor(() => expect(result.current.error).toBe("plain failure"));
  });

  it("reloads and refetches when reload() is called", async () => {
    const loader = vi
      .fn<() => Promise<string>>()
      .mockResolvedValueOnce("first")
      .mockResolvedValueOnce("second");

    const { result } = renderHook(() => useAsyncData(loader));
    await waitFor(() => expect(result.current.data).toBe("first"));

    act(() => result.current.reload());
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.data).toBe("second"));
    expect(loader).toHaveBeenCalledTimes(2);
    expect(result.current.loading).toBe(false);
  });

  it("ignores late results after unmount", async () => {
    let resolve!: (value: string) => void;
    const loader = vi.fn(
      () =>
        new Promise<string>((r) => {
          resolve = r;
        })
    );

    const { unmount } = renderHook(() => useAsyncData(loader));
    unmount();

    resolve("late");
    await new Promise((r) => setTimeout(r, 0));
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it("recovers from a failure on reload", async () => {
    const loader = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("first fail"))
      .mockResolvedValueOnce("recovered");

    const { result } = renderHook(() => useAsyncData(loader));
    await waitFor(() => expect(result.current.error).toBe("first fail"));

    act(() => result.current.reload());
    await waitFor(() => expect(result.current.data).toBe("recovered"));
    expect(result.current.error).toBeNull();
  });
});
