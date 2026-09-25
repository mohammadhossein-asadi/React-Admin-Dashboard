import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("services/client", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("throws when VITE_API_BASE_URL is not configured", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");
    vi.resetModules();
    const { apiFetch, isLiveApiConfigured } = await import("@/services/client");

    expect(isLiveApiConfigured).toBe(false);
    await expect(apiFetch("/team")).rejects.toThrow("VITE_API_BASE_URL is not configured");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches JSON from the configured base URL with headers", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.resetModules();
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });
    vi.stubGlobal("fetch", fetchMock);
    const { apiFetch, isLiveApiConfigured } = await import("@/services/client");

    expect(isLiveApiConfigured).toBe(true);
    const result = await apiFetch<{ id: number }>("/team");

    expect(result).toEqual({ id: 1 });
    expect(fetchMock).toHaveBeenCalledWith("https://api.example.com/team", {
      headers: { Accept: "application/json" },
    });
  });

  it("throws with status details on non-ok responses", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.resetModules();
    fetchMock.mockResolvedValue({ ok: false, status: 500, statusText: "Server Error" });
    vi.stubGlobal("fetch", fetchMock);
    const { apiFetch } = await import("@/services/client");

    await expect(apiFetch("/team")).rejects.toThrow("Request failed: 500 Server Error");
  });

  it("propagates network failures from fetch", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.resetModules();
    fetchMock.mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);
    const { apiFetch } = await import("@/services/client");

    await expect(apiFetch("/team")).rejects.toThrow("network down");
  });
});
