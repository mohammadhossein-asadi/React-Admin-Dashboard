import { describe, it, expect, vi, afterEach } from "vitest";
import { mockDataTeam, mockDataContacts, mockDataInvoices } from "@/data/mock-data";

describe("services/index", () => {
  const fetchMock = vi.fn();

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("serves mock data when no live API is configured", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");
    vi.resetModules();
    const { getTeam, getContacts, getInvoices } = await import("@/services");

    expect(await getTeam()).toEqual(mockDataTeam);
    expect(await getContacts()).toEqual(mockDataContacts);
    expect(await getInvoices()).toEqual(mockDataInvoices);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("routes every resource through the live API when configured", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.resetModules();
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] });
    vi.stubGlobal("fetch", fetchMock);
    const { getTeam, getContacts, getInvoices } = await import("@/services");

    await getTeam();
    await getContacts();
    await getInvoices();

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "https://api.example.com/team", {
      headers: { Accept: "application/json" },
    });
    expect(fetchMock).toHaveBeenNthCalledWith(2, "https://api.example.com/contacts", {
      headers: { Accept: "application/json" },
    });
    expect(fetchMock).toHaveBeenNthCalledWith(3, "https://api.example.com/invoices", {
      headers: { Accept: "application/json" },
    });
  });

  it("propagates API failures to callers", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.resetModules();
    fetchMock.mockResolvedValue({ ok: false, status: 404, statusText: "Not Found" });
    vi.stubGlobal("fetch", fetchMock);
    const { getTeam } = await import("@/services");

    await expect(getTeam()).rejects.toThrow("Request failed: 404 Not Found");
  });
});
