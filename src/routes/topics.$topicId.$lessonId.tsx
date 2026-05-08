import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";

import { getTopic, getLesson } from "@/data/curriculum";

import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Clock,
  Tag,
  Home,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/topics/$topicId/$lessonId")({
  loader: ({ params }) => {
    const topic = getTopic(params.topicId);
    const lesson = getLesson(params.topicId, params.lessonId);

    if (!topic || !lesson) throw notFound();

    const idx = topic.lessons.findIndex((l) => l.id === lesson.id);

    return {
      topic,
      lesson,
      prev: topic.lessons[idx - 1],
      next: topic.lessons[idx + 1],
    };
  },

  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.lesson.title} — конспект`
          : "Сабақ",
      },
    ],
  }),

  component: LessonPage,

  notFoundComponent: () => (
    <div className="p-8">Сабақ табылмады.</div>
  ),
});

function LessonPage() {
  const navigate = useNavigate();
  const { topic, lesson, prev, next } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      {/* TOP BAR */}
      <div className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="max-w-4xl mx-auto h-16 px-6 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate({ to: "/topics/$topicId", params: { topicId: topic.id } })}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Тақырыпқа
            </button>

            <nav className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-foreground inline-flex items-center gap-1">
                <Home className="h-4 w-4" />
                Басты
              </Link>

              <ChevronRight className="h-3 w-3 opacity-50" />

              <Link to="/topics" className="hover:text-foreground">
                Тақырыптар
              </Link>

              <ChevronRight className="h-3 w-3 opacity-50" />

              <span className="text-foreground truncate max-w-[180px]">
                {lesson.title}
              </span>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            Конспект
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <article className="overflow-hidden rounded-3xl border bg-card/80 backdrop-blur shadow-2xl">
          
          <div className="relative bg-gradient-primary px-8 py-8 text-primary-foreground">
            <div className="relative">
              <div className="text-xs uppercase tracking-widest opacity-80 mb-3">
                Тақырып {topic.number}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {lesson.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                  <Clock className="h-3.5 w-3.5" />
                  {lesson.hours} сағат
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                  <Tag className="h-3.5 w-3.5" />
                  {lesson.type}
                </div>
              </div>
            </div>
          </div>

          {/* TEXT FIX (NO "STAIRS") */}
          <div className="p-7 md:p-9">
            <div
              className="
                space-y-5
                text-[15px]
                leading-8
                text-foreground/90

                text-justify
                hyphens-auto
              "
            >
              {lesson.conspect.map((p: string, i: number) => (
                <p key={i} className="break-words">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* NAV */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to="/topics/$topicId/$lessonId"
              params={{ topicId: topic.id, lessonId: prev.id }}
              className="group rounded-2xl border bg-card/70 backdrop-blur p-5 hover:border-primary/40 hover:shadow-lg transition"
            >
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                Алдыңғы сабақ
              </div>
              <div className="font-medium group-hover:text-primary transition">
                {prev.title}
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to="/topics/$topicId/$lessonId"
              params={{ topicId: topic.id, lessonId: next.id }}
              className="group rounded-2xl border bg-card/70 backdrop-blur p-5 hover:border-primary/40 hover:shadow-lg transition text-right"
            >
              <div className="text-xs text-muted-foreground mb-2 flex items-center justify-end gap-1">
                Келесі сабақ
                <ArrowRight className="h-3 w-3" />
              </div>
              <div className="font-medium group-hover:text-primary transition">
                {next.title}
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}