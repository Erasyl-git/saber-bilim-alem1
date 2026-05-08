import { createFileRoute, Link } from "@tanstack/react-router";
import { topics } from "@/data/curriculum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Басты бет — КМ 09 Веб-контент" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center">

          <div className="font-semibold text-base tracking-wide">
            KM-09 <span className="text-sky-600">Web</span>
          </div>

          <nav className="flex items-center gap-10 text-sm text-slate-600 ml-16">
            <Link className="hover:text-sky-600 transition" to="/">Басты</Link>
            <Link className="hover:text-sky-600 transition" to="/topics">Тақырыптар</Link>
            <Link className="hover:text-sky-600 transition" to="/test">Тест</Link>
          </nav>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-[1400px] mx-auto px-8 pt-28 pb-20">

        {/* HERO (corporate style) */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          <div>

            <h1 className="text-6xl font-semibold leading-tight tracking-tight">
              Веб-контент басқару
              <span className="block text-sky-600 mt-2">
                оқу платформасы
              </span>
            </h1>

            <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl">
              CMS, веб архитектура және front-end негіздерін жүйелі түрде
              меңгеруге арналған оқу жүйесі.
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                to="/topics"
                className="px-6 py-3 bg-sky-600 text-white text-sm hover:bg-sky-700 transition"
              >
                Оқуды бастау
              </Link>

              <Link
                to="/test"
                className="px-6 py-3 border text-sm hover:bg-slate-50 transition"
              >
                Тест тапсыру
              </Link>
            </div>

          </div>

          {/* IMAGE (big corporate visual) */}
          <div className="h-[420px] rounded-xl overflow-hidden border shadow-sm">
            <img
              src="asdf.png"
              className="w-full h-full object-cover"
              alt="learning"
            />
          </div>

        </section>

        {/* SECTION TITLE */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold">
            Оқу бағыттары
          </h2>
          <p className="text-slate-500 mt-2">
            Негізгі модульдер мен материалдар
          </p>
        </section>

        {/* TOPICS (clean corporate list) */}
        <section className="border-t">

          {topics.map((t) => (
            <Link
              key={t.id}
              to="/topics/$topicId"
              params={{ topicId: t.id }}
              className="block py-6 border-b hover:bg-slate-50 transition"
            >

              <div className="text-lg font-medium">
                {t.title}
              </div>

              <div className="text-slate-600 mt-2 max-w-2xl">
                {t.description}
              </div>

            </Link>
          ))}

        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="max-w-[1400px] mx-auto px-8 py-10 flex justify-between text-sm text-slate-500">

          <div className="font-medium">
            KM-09 Web Content
          </div>

          <div className="flex gap-10">
            <Link className="hover:text-sky-600" to="/">Басты</Link>
            <Link className="hover:text-sky-600" to="/topics">Тақырыптар</Link>
            <Link className="hover:text-sky-600" to="/test">Тест</Link>
          </div>

        </div>
      </footer>

    </div>
  );
}