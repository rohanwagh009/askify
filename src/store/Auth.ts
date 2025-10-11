import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(email: string, password: string): Promise<void>;
  createAccount(name: string, email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set, get) => ({
      // <-- Add `get` here to access state
      session: null,
      user: null,
      hydrated: false,

      setHydrated: () => {
        set({ hydrated: true });
      },

      verifySession: async () => {
        try {
          const session = await account.getSession("current");
          const user = await account.get<UserPrefs>();
          set({ session, user });
        } catch (error) {
          set({ session: null, user: null });
        }
      },

      login: async (email, password) => {
        try {
          try {
            await account.deleteSession("current");
          } catch (error) {
            // No session to delete, continue
          }
          const sessionData = await account.createEmailPasswordSession(
            email,
            password
          );
          const accountDetails = await account.get<UserPrefs>();
          set({ session: sessionData, user: accountDetails });
        } catch (error: any) {
          throw new Error(error.message);
        }
      },

      createAccount: async (name, email, password) => {
        try {
          try {
            await account.deleteSession("current");
          } catch (error) {
            // No session to delete, continue
          }
          await account.create(ID.unique(), email, password, name);
          const sessionData = await account.createEmailPasswordSession(
            email,
            password
          );
          const accountDetails = await account.get<UserPrefs>();
          set({ session: sessionData, user: accountDetails });
        } catch (error: any) {
          throw new Error(error.message);
        }
      },

      // --- FIXED LOGOUT FUNCTION ---
      logout: async () => {
        // 1. First line of defense: Don't make an API call if we know we're logged out.
        if (!get().session) {
          console.log("No local session found. State is already clean.");
          set({ session: null, user: null });
          return;
        }

        try {
          // 2. Attempt to delete the session on the server.
          await account.deleteSession("current");
        } catch (error: any) {
          // 3. Second line of defense: Smartly handle API errors.
          // Check if it's the specific error for an already-logged-out user.
          // Appwrite often uses code 401 for this.
          if (error.code === 401 || error.message.includes("missing scopes")) {
            // This is an expected situation, not a bug.
            // Silently proceed without logging an error.
            console.log(
              "Session was already expired on the server. State cleaned up."
            );
          } else {
            // This is a different, unexpected error (like a network failure),
            // so we should log it.
            console.error("An unexpected error occurred during logout:", error);
          }
        } finally {
          // 4. In ALL cases, whether success or failure, ensure the final state is clean.
          set({ session: null, user: null });
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
