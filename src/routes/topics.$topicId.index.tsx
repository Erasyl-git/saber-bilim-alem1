import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTopic } from "@/data/curriculum";
import { ChevronRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/topics/$topicId/")({
  loader: ({ params }) => {
    const topic = getTopic(params.topicId);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.topic.title} — КМ 09` : "Тақырып" }],
  }),
  component: TopicPage,
  notFoundComponent: () => <div className="p-8">Тақырып табылмады. <Link to="/topics" className="text-primary">Артқа</Link></div>,
});

function TopicPage() {
  const { topic } = Route.useLoaderData();
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <nav className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
        <Link to="/" className="hover:text-foreground">Басты</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/topics" className="hover:text-foreground">Тақырыптар</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{topic.title}</span>
      </nav>

      <div className="rounded-2xl bg-mesh border p-8 mb-8">
        <div className="text-sm font-semibold text-primary mb-2">Тақырып {topic.number}</div>
        <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
        <p className="mt-3 text-muted-foreground">{topic.description}</p>
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" /> Сабақтар ({topic.lessons.length})
      </h2>

      <div className="space-y-2">
        {topic.lessons.map((l: { id: string; title: string; type: string; hours: number }, i: number) => (
          <Link key={l.id} to="/topics/$topicId/$lessonId"
            params={{ topicId: topic.id, lessonId: l.id }}
            className="group flex items-center gap-4 rounded-lg border bg-card p-4 hover:border-primary/50 hover:shadow-soft transition">
            <div className="text-sm text-muted-foreground font-mono w-8">{String(i+1).padStart(2,"0")}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium group-hover:text-primary transition">{l.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{l.type} · {l.hours} сағат</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}
