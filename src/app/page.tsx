// src/app/page.tsx

"use client"; // <-- 1. ADD THIS LINE AT THE VERY TOP

import { ArrowRight, MessagesSquare, Users, Star } from "lucide-react";
import Particles from "@/components/magicui/particles";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth"; // <-- 2. IMPORT THE AUTH STORE

export default function Home() {
  const { session } = useAuthStore(); // <-- 3. GET THE USER'S SESSION

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-white">
            <Link href="/">Askify</Link>
          </h1>
          <nav className="flex items-center gap-4">
            {/* --- 4. THIS LOGIC NOW CHECKS IF YOU ARE LOGGED IN --- */}
            {session ? (
              // If you ARE logged in, show this button
              <Link
                href="/questions"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition-colors"
              >
                Go to App
              </Link>
            ) : (
              // If you are NOT logged in, show these buttons
              <>
                <Link
                  href="/login"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition-colors"
                >
                  Join the Community
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto relative flex flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:py-32 overflow-hidden">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={"#ffffff"}
          refresh
        />
        <div className="z-10 flex flex-col items-center justify-center gap-6 text-center">
          <div className="rounded-full bg-slate-800 px-4 py-1 text-sm text-indigo-400">
            Your Community for Answers
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Where Curiosity Meets Knowledge
          </h2>
          <p className="max-w-2xl text-lg text-slate-400">
            Stuck on a problem? Askify is the community-driven Q&A platform
            where you can post your toughest questions and get expert answers
            from fellow developers, students, and enthusiasts.
          </p>
          <Link
            href="/questions/ask"
            className="group mt-4 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold hover:bg-indigo-500 transition-colors"
          >
            Ask a Question
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* (The rest of your Features and Footer section remains the same) */}
      <section className="container mx-auto px-4 py-16">
        {/* ... features ... */}
      </section>
      <footer className="mt-auto border-t border-slate-800">
        {/* ... footer ... */}
      </footer>
    </main>
  );
}
