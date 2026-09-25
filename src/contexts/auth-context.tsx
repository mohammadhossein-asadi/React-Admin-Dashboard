import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PROFILE_AVATAR_URL } from "@/lib/constants";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

interface AuthState {
  user: User;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const STORAGE_KEY = "auth";

const DEFAULT_USER: User = {
  firstName: "Mohammadhossein",
  lastName: "Asadi",
  email: "mohammadhossein@example.com",
  bio: "VP Fancy Admin",
  avatarUrl: PROFILE_AVATAR_URL,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AuthState>;
      return {
        user: { ...DEFAULT_USER, ...parsed.user },
        isAuthenticated: parsed.isAuthenticated ?? true,
      };
    }
  } catch {
    // Ignore corrupted state and fall back to defaults
  }
  return { user: DEFAULT_USER, isAuthenticated: true };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadAuth);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const login = useCallback(() => {
    setAuth((prev) => ({ ...prev, isAuthenticated: true }));
  }, []);

  const logout = useCallback(() => {
    setAuth((prev) => ({ ...prev, isAuthenticated: false }));
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setAuth((prev) => ({ ...prev, user: { ...prev.user, ...patch } }));
  }, []);

  const value = useMemo(
    () => ({ user: auth.user, isAuthenticated: auth.isAuthenticated, login, logout, updateUser }),
    [auth, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
