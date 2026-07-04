import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  name: string;
  phone: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

type AuthResult = { ok: true } | { ok: false; error: "phone_exists" | "invalid_credentials" };

interface AuthState {
  users: StoredUser[];
  currentUser: AuthUser | null;
  signup: (name: string, phone: string, password: string) => AuthResult;
  login: (phone: string, password: string) => AuthResult;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      signup: (name, phone, password) => {
        const { users } = get();
        if (users.some((u) => u.phone === phone)) {
          return { ok: false, error: "phone_exists" };
        }
        set({
          users: [...users, { name, phone, password }],
          currentUser: { name, phone },
        });
        return { ok: true };
      },
      login: (phone, password) => {
        const found = get().users.find((u) => u.phone === phone && u.password === password);
        if (!found) {
          return { ok: false, error: "invalid_credentials" };
        }
        set({ currentUser: { name: found.name, phone: found.phone } });
        return { ok: true };
      },
      logout: () => set({ currentUser: null }),
    }),
    { name: "quickbite-auth" }
  )
);
