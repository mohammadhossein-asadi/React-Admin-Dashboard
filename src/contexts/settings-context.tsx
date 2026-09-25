import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "@/contexts/theme-context";
import i18n, { RTL_LANGUAGES } from "@/i18n";

export type AccentName = "green" | "blue" | "purple" | "orange" | "pink";

export interface NotificationPrefs {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

interface Settings {
  accent: AccentName;
  language: string;
  notifications: NotificationPrefs;
  twoFactorEnabled: boolean;
}

interface SettingsContextType extends Settings {
  setAccent: (accent: AccentName) => void;
  setLanguage: (language: string) => void;
  setNotificationPref: <K extends keyof NotificationPrefs>(
    key: K,
    value: NotificationPrefs[K]
  ) => void;
  setTwoFactorEnabled: (enabled: boolean) => void;
}

const STORAGE_KEY = "settings";

const ACCENT_VARS: Record<AccentName, { light: string; dark: string }> = {
  green: { light: "142 76% 36%", dark: "142 71% 55%" },
  blue: { light: "217 83% 48%", dark: "217 91% 65%" },
  purple: { light: "262 83% 50%", dark: "263 85% 66%" },
  orange: { light: "24 95% 44%", dark: "25 95% 60%" },
  pink: { light: "330 81% 46%", dark: "330 85% 64%" },
};

const DEFAULT_SETTINGS: Settings = {
  accent: "green",
  language: "en",
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
  },
  twoFactorEnabled: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Settings>;
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        notifications: { ...DEFAULT_SETTINGS.notifications, ...parsed.notifications },
      };
    }
  } catch {
    // Ignore corrupted state and fall back to defaults
  }
  return DEFAULT_SETTINGS;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    const accent = ACCENT_VARS[settings.accent][theme];
    root.style.setProperty("--primary", accent);
    root.style.setProperty("--ring", accent);
    root.style.setProperty(
      "--primary-foreground",
      theme === "dark" ? "222.2 47.4% 11.2%" : "210 40% 98%"
    );
  }, [settings.accent, theme]);

  useEffect(() => {
    document.documentElement.lang = settings.language;
    document.documentElement.dir = RTL_LANGUAGES.has(settings.language) ? "rtl" : "ltr";
    void i18n.changeLanguage(settings.language);
  }, [settings.language]);

  const setAccent = useCallback((accent: AccentName) => {
    setSettings((prev) => ({ ...prev, accent }));
  }, []);

  const setLanguage = useCallback((language: string) => {
    setSettings((prev) => ({ ...prev, language }));
  }, []);

  const setNotificationPref = useCallback(
    <K extends keyof NotificationPrefs>(key: K, value: NotificationPrefs[K]) => {
      setSettings((prev) => ({ ...prev, notifications: { ...prev.notifications, [key]: value } }));
    },
    []
  );

  const setTwoFactorEnabled = useCallback((twoFactorEnabled: boolean) => {
    setSettings((prev) => ({ ...prev, twoFactorEnabled }));
  }, []);

  const value = useMemo(
    () => ({ ...settings, setAccent, setLanguage, setNotificationPref, setTwoFactorEnabled }),
    [settings, setAccent, setLanguage, setNotificationPref, setTwoFactorEnabled]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
