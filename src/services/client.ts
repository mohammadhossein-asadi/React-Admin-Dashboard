const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const isLiveApiConfigured = Boolean(API_BASE);

export async function apiFetch<T>(path: string): Promise<T> {
  if (!API_BASE) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}
