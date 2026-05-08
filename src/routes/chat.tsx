import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { topics } from "@/data/curriculum";
import { Send, Bot, User, Sparkles } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "ИИ-көмекшіcі" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "bot"; text: string };

function findAnswer(query: string): string {
  const q = query.toLowerCase().trim();
  if (!q) return "Сұрағыңызды жазыңыз.";

  // Search through all lessons
  const matches: { score: number; topic: string; lesson: string; text: string }[] = [];
  for (const t of topics) {
    for (const l of t.lessons) {
      const hay = (l.title + " " + l.conspect.join(" ")).toLowerCase();
      let score = 0;
      const words = q.split(/\s+/).filter(w => w.length > 2);
      for (const w of words) {
        if (hay.includes(w)) score += hay.split(w).length - 1;
      }
      if (score > 0) matches.push({ score, topic: t.title, lesson: l.title, text: l.conspect[0] });
    }
  }

  if (matches.length === 0) {
    return `«${query}» бойынша нақты ақпарат табылмады. Мысалы: "WordPress дегеніміз не?", "SSL сертификаты", "Tilda артықшылықтары", "CMS қауіпсіздік" деп сұрап көріңіз.`;
  }

  matches.sort((a, b) => b.score - a.score);
  const top = matches.slice(0, 2);
  let resp = `📚 Сіздің сұрағыңыз бойынша мынадай ақпарат таптым:\n\n`;
  top.forEach((m, i) => {
    resp += `${i + 1}. **${m.lesson}** (${m.topic})\n${m.text}\n\n`;
  });
  if (matches.length > 2) resp += `Тағы ${matches.length - 2} қатысты сабақ бар. Тақырыптар бөлімінен қараңыз.`;
  return resp;
}

function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Сәлем! Мен — КМ 09 модулі бойынша ИИ-көмекшіңізбін. Веб-дизайн, CMS, WordPress, Tilda, Drupal туралы сұрақтар қойыңыз." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    const botMsg: Msg = { role: "bot", text: findAnswer(input) };
    setMsgs(m => [...m, userMsg]);
    setInput("");
    setTimeout(() => setMsgs(m => [...m, botMsg]), 400);
  };

  const suggestions = ["WordPress дегеніміз не?", "SSL сертификаты", "Tilda артықшылықтары", "CMS қауіпсіздігі", "Zero Block"];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="border-b bg-card/50 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold">ИИ-көмекшіcі</h1>
            <p className="text-xs text-muted-foreground">Модуль материалдары бойынша жауап береді</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "bot" && (
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm whitespace-pre-wrap ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border shadow-soft"
              }`}>{m.text}</div>
              {m.role === "user" && (
                <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t bg-card/50 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          {msgs.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map(s => (
                <button key={s} onClick={() => setInput(s)}
                  className="text-xs rounded-full border bg-card px-3 py-1.5 hover:border-primary/50 transition">
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Сұрағыңызды жазыңыз..."
              className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
            <button onClick={send} className="rounded-lg bg-gradient-primary px-4 text-primary-foreground hover:opacity-90 transition">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
