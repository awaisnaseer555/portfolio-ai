"use client";
import { useState } from "react";
import { Frown, Loader2, Smile } from "lucide-react";
import { useModel } from "./useModel";

const MODEL = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
const SAMPLES = ["I love how clean and fast this website feels!", "The delivery was late and the support was unhelpful.", "It works, but I expected a bit more for the price."];
interface Result { label: string; score: number }

export default function SentimentDemo() {
  const { load, status, progress } = useModel("sentiment-analysis", MODEL);
  const [text, setText] = useState(SAMPLES[0]);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!text.trim() || busy) return;
    setBusy(true); setError("");
    try {
      const out = (await (await load())(text.slice(0, 500))) as Result[] | Result;
      setResult(Array.isArray(out) ? out[0] : out);
    } catch { setError("Could not load the model. Check your connection and try again."); }
    finally { setBusy(false); }
  }

  const positive = result?.label === "POSITIVE";
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <label htmlFor="sent-text" className="text-sm font-semibold">Text to analyze</label>
        <textarea id="sent-text" value={text} maxLength={500} rows={5} onChange={(e) => setText(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-bg p-3 text-sm" placeholder="Type or paste a sentence…" />
        <div className="mt-3 flex flex-wrap gap-2">{SAMPLES.map((s) => <button key={s} type="button" className="chip" onClick={() => setText(s)}>{s.length > 34 ? `${s.slice(0, 34)}…` : s}</button>)}</div>
        <button type="button" onClick={run} disabled={busy || !text.trim()} className="btn btn-primary mt-4 disabled:opacity-60">
          {busy && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}{busy ? (status === "loading" ? `Loading model ${progress}%` : "Analyzing…") : "Analyze sentiment"}
        </button>
        {error && <p role="alert" className="mt-3 text-sm text-brand">{error}</p>}
      </div>
      <div className="card flex flex-col justify-center" aria-live="polite">
        {result ? (
          <>
            <div className="flex items-center gap-3">
              {positive ? <Smile size={36} className="text-[#22c55e]" aria-hidden="true" /> : <Frown size={36} className="text-[#ef4444]" aria-hidden="true" />}
              <div><p className="text-2xl font-bold">{positive ? "Positive" : "Negative"}</p><p className="text-sm text-mute">Confidence {(result.score * 100).toFixed(1)}%</p></div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-line" role="img" aria-label={`Confidence ${(result.score * 100).toFixed(0)} percent`}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${result.score * 100}%`, background: positive ? "#22c55e" : "#ef4444" }} />
            </div>
          </>
        ) : <p className="text-mute">The result will appear here. The model runs entirely in your browser, so your text is never sent to a server.</p>}
        <p className="mt-4 text-xs text-mute">Model: DistilBERT fine-tuned on SST-2 (positive/negative), running with Transformers.js. The first run downloads the model once, then it is cached.</p>
      </div>
    </div>
  );
}
