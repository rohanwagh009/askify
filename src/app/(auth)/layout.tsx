// src/app/(auth)/layout.tsx
"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // After the store is hydrated, if a session exists, redirect them.
    if (hydrated && session) {
      router.replace("/"); // Redirect to homepage
    }
  }, [hydrated, session, router]);

  // 1. While the app is checking for a session OR if a session is found
  //    (and the redirect is about to happen), show a full-page loader.
  if (!hydrated || session) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  // 2. Only if we are certain the user is a guest, show the login/register form.
  return <>{children}</>;
};

export default AuthLayout;
