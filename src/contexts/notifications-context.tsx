import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { mockNotifications } from "@/data/notifications";
import type { Notification } from "@/types";

interface NotificationsState {
  readIds: string[];
  clearedIds: string[];
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const STORAGE_KEY = "notifications-state";
const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

function loadState(): NotificationsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<NotificationsState>;
      return {
        readIds: Array.isArray(parsed.readIds) ? parsed.readIds : [],
        clearedIds: Array.isArray(parsed.clearedIds) ? parsed.clearedIds : [],
      };
    }
  } catch {
    // Ignore corrupted state and fall back to defaults
  }
  return { readIds: [], clearedIds: [] };
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NotificationsState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const notifications = useMemo(
    () =>
      mockNotifications
        .filter((n) => !state.clearedIds.includes(n.id))
        .map((n) => ({ ...n, read: n.read || state.readIds.includes(n.id) })),
    [state]
  );

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const markRead = useCallback((id: string) => {
    setState((prev) =>
      prev.readIds.includes(id) ? prev : { ...prev, readIds: [...prev.readIds, id] }
    );
  }, []);

  const markAllRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      readIds: mockNotifications.map((n) => n.id),
    }));
  }, []);

  const clearAll = useCallback(() => {
    setState((prev) => ({
      ...prev,
      clearedIds: mockNotifications.map((n) => n.id),
    }));
  }, []);

  const value = useMemo(
    () => ({ notifications, unreadCount, markRead, markAllRead, clearAll }),
    [notifications, unreadCount, markRead, markAllRead, clearAll]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}
