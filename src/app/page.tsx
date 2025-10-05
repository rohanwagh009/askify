"use client";

import {
  ArrowRight,
  MessageSquare,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/store/Auth";
import Particles from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";

// Dynamically import IconCloud to avoid SSR hydration issues
const IconCloud = dynamic(() => import("@/components/magicui/icon-cloud"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-pulse text-slate-400">Loading...</div>
    </div>
  ),
});

export default function Home() {
  const { session } = useAuthStore();

  // Icon slugs for the icon cloud
  const iconSlugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "nextdotjs",
    "python",
    "java",
    "git",
    "github",
    "visualstudiocode",
    "figma",
    "docker",
    "mongodb",
    "postgresql",
    "firebase",
    "vercel",
    "tailwindcss",
    "redux",
  ];

  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {/* Hero Section with Icon Cloud */}
      <section className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-400 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4" />
              Join thousands of developers
            </div>

            {/* Hero Title with Gradient */}
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="block">Ask questions,</span>
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                share knowledge
              </span>
            </h1>

            {/* Hero Description */}
            <p className="text-lg text-slate-400 sm:text-xl">
              Connect with developers worldwide. Get answers, share insights,
              and collaborate on coding challenges. Join our community and
              enhance your skills!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start gap-4 sm:flex-row">
              {session ? (
                <Link
                  href="/questions/ask"
                  className="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold transition-all hover:bg-indigo-500 hover:scale-105"
                >
                  Ask a Question
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold transition-all hover:bg-indigo-500 hover:scale-105"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/questions"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-semibold transition-all hover:bg-slate-800 hover:border-slate-600"
                  >
                    Browse Questions
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right: Icon Cloud */}
          <div className="relative flex h-full w-full items-center justify-center">
            <IconCloud iconSlugs={iconSlugs} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <BorderBeam size={250} duration={12} delay={9} />
            <div className="flex flex-col items-center gap-2 text-center">
              <MessageSquare className="h-10 w-10 text-indigo-400" />
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-slate-400">Questions Asked</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <BorderBeam size={250} duration={12} delay={6} />
            <div className="flex flex-col items-center gap-2 text-center">
              <Users className="h-10 w-10 text-purple-400" />
              <h3 className="text-3xl font-bold">5K+</h3>
              <p className="text-slate-400">Active Users</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <BorderBeam size={250} duration={12} delay={3} />
            <div className="flex flex-col items-center gap-2 text-center">
              <Award className="h-10 w-10 text-pink-400" />
              <h3 className="text-3xl font-bold">50K+</h3>
              <p className="text-slate-400">Answers Provided</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Questions Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Latest Questions</h2>
            <p className="mt-2 text-slate-400">
              Explore recent questions from our community
            </p>
          </div>
          <Link
            href="/questions"
            className="hidden sm:inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-900/80 backdrop-blur-sm"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  Sample Question Title {i}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  This is a sample question description that gives a preview of
                  the question content...
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />0 answers
                  </span>
                  <span>0 votes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View All Questions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Top Contributors Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold sm:text-4xl">Top Contributors</h2>
          <p className="mt-2 text-slate-400">
            Our most active community members
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-sm transition-all hover:border-slate-700 hover:scale-105"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-2xl font-bold">
                U{i}
              </div>
              <h3 className="text-lg font-semibold">User {i}</h3>
              <p className="text-sm text-slate-400">Reputation: {i * 100}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!session && (
        <section className="relative z-10 container mx-auto px-4 py-20">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 p-12 text-center backdrop-blur-sm">
            <BorderBeam size={400} duration={15} />
            <div className="relative z-10 mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to join our community?
              </h2>
              <p className="text-lg text-slate-300">
                Sign up to become a part of our dynamic community. Gain access
                to a vast pool of knowledge, connect with experts, and share
                your insights.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold transition-all hover:bg-indigo-500 hover:scale-105"
              >
                Join Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold">Askify</h3>
              <p className="text-sm text-slate-400">
                Your community for answers
              </p>
            </div>
            <p className="text-sm text-slate-400">
              &copy; 2025 Askify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
