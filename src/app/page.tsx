import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RetroGrid from "@/components/magicui/retro-grid";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRight, MessageCircle, ThumbsUp, User, Eye } from "lucide-react";
import Link from "next/link";

// Mock Data: Replace these with your actual data fetching logic from Appwrite
const questions = [
  {
    id: "1",
    title: "How to vertically center a div?",
    tags: ["css", "html", "flexbox"],
    author: "John Doe",
    authorAvatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=John",
    createdAt: "2 hours ago",
    votes: 15,
    answers: 3,
    views: 120,
  },
  {
    id: "2",
    title: "What is the difference between 'let' and 'const' in JavaScript?",
    tags: ["javascript", "es6"],
    author: "Jane Smith",
    authorAvatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane",
    createdAt: "1 day ago",
    votes: 42,
    answers: 5,
    views: 530,
  },
  {
    id: "3",
    title: "How to fetch data in React with hooks?",
    tags: ["react", "hooks", "fetch"],
    author: "CodeMaster",
    authorAvatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Code",
    createdAt: "3 days ago",
    votes: 28,
    answers: 4,
    views: 890,
  },
];

const popularTags = [
  { name: "javascript", count: 1250 },
  { name: "react", count: 980 },
  { name: "python", count: 850 },
  { name: "nextjs", count: 720 },
  { name: "css", count: 650 },
  { name: "typescript", count: 530 },
];
// End of Mock Data

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <RetroGrid />
        <div className="z-10 text-center">
          <div className="mb-4 flex items-center justify-center">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Askify - Your Q&A Hub</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedShinyText>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            A Community-Driven Q&A Platform
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Ask questions, get answers, and share your knowledge with the world.
          </p>
          <div className="mx-auto max-w-2xl">
            <Input
              type="search"
              placeholder="Search for questions..."
              className="w-full p-6"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <MessageCircle className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">1.2M+</p>
            <p className="text-muted-foreground">Questions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <ThumbsUp className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">3.4M+</p>
            <p className="text-muted-foreground">Answers</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <User className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">800K+</p>
            <p className="text-muted-foreground">Users</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Questions List (Left Side) */}
        <div className="w-full lg:w-3/4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Top Questions</h2>
            <Button asChild>
              <Link href="/ask-question">Ask a Question</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {/* IMPORTANT: Here is where you will map over your real questions
                            fetched from your Appwrite database.
                        */}
            {questions.map((q) => (
              <div key={q.id} className="rounded-lg border p-4">
                <Link
                  href={`/questions/${q.id}`}
                  className="text-xl font-semibold text-primary hover:underline"
                >
                  {q.title}
                </Link>
                <div className="mt-2 flex flex-wrap gap-2">
                  {q.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <img
                      src={q.authorAvatar}
                      alt={q.author}
                      className="h-6 w-6 rounded-full"
                    />
                    <span>{q.author}</span>
                    <span>&bull; asked {q.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" /> {q.votes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" /> {q.answers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {q.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (Right Side) */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-24">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {/* IMPORTANT: Here is where you will map over your real tags
                                    fetched from your Appwrite database.
                                */}
                {popularTags.map((tag) => (
                  <div
                    key={tag.name}
                    className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {tag.name}{" "}
                    <span className="ml-1 text-xs opacity-70">{tag.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
