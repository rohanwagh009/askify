// 👆 After running `npm install lucide-react`, you can paste this code.

import { ArrowRight, MessagesSquare, Users, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-white">Askify</h1>
          <nav className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Login
            </a>
            <a
              href="/register"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition-colors"
            >
              Join the Community
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:py-32">
        <div className="rounded-full bg-slate-800 px-4 py-1 text-sm text-indigo-400">
          Your Community for Answers
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Where Curiosity Meets Knowledge
        </h2>
        <p className="max-w-2xl text-lg text-slate-400">
          Stuck on a problem? Askify is the community-driven Q&A platform where
          you can post your toughest questions and get expert answers from
          fellow developers, students, and enthusiasts.
        </p>
        <a
          href="/questions/ask"
          className="group mt-4 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold hover:bg-indigo-500 transition-colors"
        >
          Ask a Question
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="mb-12 text-center text-3xl font-bold">How It Works</h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-6">
            <div className="mb-4 inline-block rounded-lg bg-indigo-500 p-3">
              <MessagesSquare className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-xl font-semibold">Ask Anything</h4>
            <p className="text-slate-400">
              Post your questions on any topic. Provide details, code snippets,
              and context to get the best possible answers.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-6">
            <div className="mb-4 inline-block rounded-lg bg-indigo-500 p-3">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-xl font-semibold">Get Expert Answers</h4>
            <p className="text-slate-400">
              A community of passionate experts is ready to help. Get clear,
              reliable answers and vote for the most helpful ones.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-6">
            <div className="mb-4 inline-block rounded-lg bg-indigo-500 p-3">
              <Star className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-xl font-semibold">
              Build Your Reputation
            </h4>
            <p className="text-slate-400">
              Earn points and gain credibility by providing valuable answers.
              Become a trusted expert in your field.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Askify. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
