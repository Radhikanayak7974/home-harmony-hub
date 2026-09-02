import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UserType = "Home Seeker" | "Property Owner" | "Service Professional";

export type SessionUser = {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
};

type Store = {
  user: SessionUser | null;
  hydrated: boolean;
  signIn: (u: SessionUser) => void;
  signOut: () => void;
  saved: string[];
  toggleSaved: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  readNotifications: string[];
  markRead: (id: string) => void;
  markAllRead: (ids: string[]) => void;
};

const StoreContext = createContext<Store | null>(null);

const KEY_USER = "grihacare.user";
const KEY_SAVED = "grihacare.saved";
const KEY_READ = "grihacare.read";

const demoUser: SessionUser = {
  name: "Radhika Nayak",
  email: "radhika@example.com",
  phone: "+91 98450 22110",
  userType: "Home Seeker",
};

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [readNotifications, setRead] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem(KEY_USER);
      if (u) setUser(JSON.parse(u) as SessionUser);
      const s = localStorage.getItem(KEY_SAVED);
      if (s) setSaved(JSON.parse(s) as string[]);
      const r = localStorage.getItem(KEY_READ);
      if (r) setRead(JSON.parse(r) as string[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  const signIn = useCallback((u: SessionUser) => {
    setUser(u);
    localStorage.setItem(KEY_USER, JSON.stringify(u));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(KEY_USER);
  }, []);

  const toggleSaved = useCallback((id: string) => {
    let nowSaved = false;
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      nowSaved = next.includes(id);
      localStorage.setItem(KEY_SAVED, JSON.stringify(next));
      return next;
    });
    return !saved.includes(id);
  }, [saved]);

  const markRead = useCallback((id: string) => {
    setRead((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem(KEY_READ, JSON.stringify(next));
      return next;
    });
  }, []);

  const markAllRead = useCallback((ids: string[]) => {
    setRead(() => {
      localStorage.setItem(KEY_READ, JSON.stringify(ids));
      return ids;
    });
  }, []);

  const value = useMemo<Store>(
    () => ({
      user,
      hydrated,
      signIn,
      signOut,
      saved,
      toggleSaved,
      isSaved: (id: string) => saved.includes(id),
      readNotifications,
      markRead,
      markAllRead,
    }),
    [user, hydrated, signIn, signOut, saved, toggleSaved, readNotifications, markRead, markAllRead],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside AppStoreProvider");
  return ctx;
}

export { demoUser };
