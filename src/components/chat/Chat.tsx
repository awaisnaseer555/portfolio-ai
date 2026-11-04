"use client";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { chatProvider, type ChatMessage } from "@/lib/ai/chat";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

const SUGGESTIONS = ["What is your experience with Python?", "Tell me about your projects", "What's your AI expertise?", "Let's work together"];

export default function Chat() {
  const [msgs, setMsgs] = useState<ChatMessage[]>([{ role: "assistant", content: "Hi! I'm Awais's AI Twin. Ask me about my experience, projects and skills, and I'll answer from my profile." }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [msgs]);

  async function ask(text: string) {
    const q = text.trim().slice(0, 500); if (!q || busy) return;
    const next: ChatMessage[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true);
    try { setMsgs([...next, await chatProvider.send(next)]); }
    catch { setMsgs([...next, { role: "assistant", content: "Sorry, something went wrong. You can book a call instead.", cta: true }]); }
    finally { setBusy(false); }
  }
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-card">
      <div ref={log} role="log" aria-live="polite" className="flex h-96 flex-col gap-3 overflow-y-auto p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[88%] rounded-xl px-4 py-2.5 text-sm ${m.role === "user" ? "self-end bg-brand text-on" : "self-start bg-line/60"}`}>
            {m.content}
            {m.sources && m.sources.length > 0 && <p className="mt-2 text-xs text-mute">Sources: {m.sources.join(" · ")}</p>}
            {m.cta && <div className="mt-2"><ScheduleCallButton /></div>}
          </div>
        ))}
        {busy && <p className="self-start text-sm text-mute">Thinking…</p>}
      </div>
      <div className="flex flex-wrap gap-2 px-4 pb-3">{SUGGESTIONS.map((s) => <button key={s} type="button" className="chip" onClick={() => ask(s)}>{s}</button>)}</div>
      <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t border-line p-3">
        <label htmlFor="chat-input" className="sr-only">Your question</label>
        <input id="chat-input" value={input} maxLength={500} onChange={(e) => setInput(e.target.value)} placeholder="Ask about experience, skills, projects…" autoComplete="off" className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm" />
        <button type="submit" className="btn btn-primary !px-3" aria-label="Send message"><Send size={16} /></button>
      </form>
      <p className="border-t border-line px-4 py-2 text-xs text-mute">AI-generated from my resume, projects and skills. It can make mistakes, so for anything important please book a call.</p>
    </div>
  );
}
