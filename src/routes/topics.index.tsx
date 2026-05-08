import { createFileRoute, Link } from "@tanstack/react-router";
import { topics } from "@/data/curriculum";

export const Route = createFileRoute("/topics/")({
  head: () => ({ meta: [{ title: "Барлық тақырыптар" }] }),
  component: TopicsPage,
});

function TopicsPage() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Барлық тақырыптар
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Модульдің 13 негізгі тарауы · құрылымдалған оқу бағдарламасы
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((t, i) => (
          <Link
            key={t.id}
            to="/topics/$topicId"
            params={{ topicId: t.id }}
            className="
              group relative overflow-hidden
              rounded-2xl border bg-card/60 backdrop-blur
              p-6
              hover:border-primary/40 hover:shadow-xl
              transition-all duration-300
            "
          >
            {/* subtle background accent */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/5 to-transparent" />

            <div className="relative flex gap-5">
              {/* number */}
              <div
                className="
                  flex-shrink-0
                  h-12 w-12 rounded-xl
                  bg-gradient-primary
                  text-primary-foreground
                  flex items-center justify-center
                  font-bold text-lg
                  shadow-soft
                "
              >
                {t.number}
              </div>

              {/* content */}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-lg group-hover:text-primary transition">
                  {t.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {t.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {t.lessons.length} сабақ
                  </span>

                  <span className="text-xs text-muted-foreground group-hover:text-primary transition">
                    ашу →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}