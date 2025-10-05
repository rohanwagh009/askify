// src/app/questions/ask/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

import QuestionForm from "@/components/QuestionForm";
import Loader from "@/components/Loader";

const AskQuestionPage = () => {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();

  // This useEffect hook handles the protection logic.
  useEffect(() => {
    // It waits until the login status has been loaded from the browser (hydrated).
    if (hydrated && !session) {
      // If the status is loaded and there is no session, redirect to login.
      router.replace("/login");
    }
  }, [hydrated, session, router]);

  // 1. While the app is checking the login status, show a loader.
  if (!hydrated) {
    return <Loader />;
  }

  // 2. If the user is logged in, show the question form.
  if (session) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ask a Public Question</h1>
        <QuestionForm />
      </div>
    );
  }

  // 3. If the user is not logged in (and is about to be redirected), show nothing.
  return null;
};

export default AskQuestionPage;
