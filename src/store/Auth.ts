import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number;
}

// 1. UPDATED THE INTERFACE: All functions now correctly return Promise<void>
interface IAuthStore {
  session: Models.Session | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>; // <-- Fixed typo here
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
        // <-- Fixed typo here
        try {
          const session = await account.getSession("current");
          const user = await account.get<UserPrefs>();
          set({ session, user });
        } catch (error) {
          set({ session: null, user: null });
        }
      },

      // 2. CORRECTED LOGIN FUNCTION
      login: async (email, password) => {
        try {
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

      // 3. CORRECTED AND IMPROVED SIGNUP FUNCTION
      createAccount: async (name, email, password) => {
        try {
          // 1. This function creates the user AND logs them in automatically.
          await account.create(ID.unique(), email, password, name);

          // 2. Now that they're logged in, we just get the session and user data.
          const sessionData = await account.getSession("current");
          const accountDetails = await account.get<UserPrefs>();

          // 3. Save the new session and user to the state.
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
