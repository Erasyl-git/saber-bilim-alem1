import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { testQuestions } from "@/data/test";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowLeft,
  Home,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/test")({
  head: () => ({ meta: [{ title: "Тест — КМ 09" }] }),
  component: TestPage,
});

function TestPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = testQuestions[idx];
  const done = idx >= testQuestions.length;

  const submit = () => {
    if (selected === null) return;

    const newAns = [...answers, selected];
    setAnswers(newAns);
    setSelected(null);

    if (idx + 1 >= testQuestions.length) {
      setShowResult(true);
    } else {
      setIdx(idx + 1);
    }
  };

  const reset = () => {
    setIdx(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
  };

  const goBack = () => {
    if (idx > 0) {
      setIdx(idx - 1);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  if (showResult || done) {
    const correct = answers.filter((a, i) => a === testQuestions[i].answer).length;
    const pct = Math.round((correct / testQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#eef4ff] to-white text-slate-900">

        {/* HEADER */}
        <div className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
          <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="text-sm font-medium">Нәтиже</div>

            <Link to="/" className="text-sm flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <Home className="h-4 w-4" />
              Басты
            </Link>
          </div>
        </div>

        <div className="px-6 py-14 max-w-3xl mx-auto">

          {/* RESULT CARD */}
          <div className="rounded-3xl border bg-white shadow-xl p-10 text-center">

            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-md">
              <Trophy className="h-8 w-8 text-white" />
            </div>

            <div className="mt-6 text-3xl font-bold">
              Тест аяқталды
            </div>

            <div className="mt-6 text-6xl font-black text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text">
              {pct}%
            </div>

            <div className="text-slate-500 mt-3">
              {correct} / {testQuestions.length} дұрыс жауап
            </div>

            {/* ACTIONS */}
            <div className="mt-10 flex gap-3">
              <button
                onClick={reset}
                className="flex-1 rounded-2xl bg-slate-900 text-white py-3 text-sm font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Қайта тапсыру
              </button>

              <Link
                to="/"
                className="px-5 py-3 rounded-2xl border text-sm hover:bg-slate-50 transition flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Басты
              </Link>
            </div>
          </div>

          {/* REVIEW */}
          <div className="mt-8 space-y-3">
            {testQuestions.map((tq, i) => {
              const ok = answers[i] === tq.answer;

              return (
                <div
                  key={i}
                  className={`rounded-2xl border p-4 flex gap-3 ${
                    ok ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  {ok ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-1" />
                  )}

                  <div>
                    <div className="font-medium">
                      {i + 1}. {tq.q}
                    </div>

                    {!ok && (
                      <div className="text-sm text-slate-500 mt-1">
                        Дұрыс жауап:{" "}
                        <span className="font-medium text-slate-900">
                          {tq.options[tq.answer]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef4ff] to-white text-slate-900">

      {/* HEADER */}
      <div className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Басты
            </Link>

            {idx > 0 && (
              <button
                onClick={goBack}
                className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Артқа
              </button>
            )}
          </div>

          <div className="text-sm text-slate-500">
            {idx + 1} / {testQuestions.length}
          </div>
        </div>
      </div>

      <div className="px-6 py-12 max-w-3xl mx-auto">

        {/* PROGRESS */}
        <div className="mb-10">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Прогресс</span>
            <span>{Math.round((idx / testQuestions.length) * 100)}%</span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all"
              style={{ width: `${(idx / testQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* QUESTION CARD */}
        <div className="rounded-3xl border bg-white shadow-xl p-8">

          <div className="flex items-center gap-2 text-xs text-sky-600 mb-4">
            <Sparkles className="h-4 w-4" />
            Сұрақ #{idx + 1}
          </div>

          <h2 className="text-2xl font-semibold leading-relaxed">
            {q.q}
          </h2>

          {/* OPTIONS */}
          <div className="mt-8 space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left rounded-2xl border p-4 transition flex items-center gap-4 ${
                  selected === i
                    ? "border-sky-500 bg-sky-50"
                    : "hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-bold ${
                    selected === i
                      ? "bg-sky-500 text-white border-sky-500"
                      : "text-slate-500"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </div>

                <div className="text-sm">{opt}</div>
              </button>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={submit}
            disabled={selected === null}
            className="mt-8 w-full rounded-2xl bg-slate-900 text-white py-3 text-sm font-medium disabled:opacity-40 hover:bg-slate-800 transition"
          >
            {idx + 1 === testQuestions.length ? "Аяқтау" : "Келесі"}
          </button>

        </div>
      </div>
    </div>
  );
}