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
    immer((set) => ({
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

      // FIXED: Delete existing session before creating new one
      login: async (email, password) => {
        try {
          // First, check if there's an existing session and delete it
          try {
            await account.deleteSession("current");
          } catch (error) {
            // If there's no session to delete, that's fine, continue
          }

          // Now create the new session
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

      // FIXED: Delete existing session before creating account
      createAccount: async (name, email, password) => {
        try {
          // First, check if there's an existing session and delete it
          try {
            await account.deleteSession("current");
          } catch (error) {
            // If there's no session to delete, that's fine, continue
          }

          // Create the user account (this automatically logs them in)
          await account.create(ID.unique(), email, password, name);

          // Get the session and user data
          const sessionData = await account.getSession("current");
          const accountDetails = await account.get<UserPrefs>();

          // Save to state
          set({ session: sessionData, user: accountDetails });
        } catch (error: any) {
          throw new Error(error.message);
        }
      },

      logout: async () => {
        try {
          await account.deleteSession("current");
          set({ session: null, user: null });
        } catch (error: any) {
          throw new Error(error.message);
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
