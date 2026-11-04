"use client";
import { useCallback, useRef, useState } from "react";

export type Task = "sentiment-analysis" | "object-detection";
export type Runner = (input: unknown, options?: unknown) => Promise<unknown>;
export type ModelStatus = "idle" | "loading" | "ready" | "error";

/** Lazily downloads a Transformers.js model in the browser (cached by the browser after the first load). */
export function useModel(task: Task, model: string) {
  const runner = useRef<Runner | null>(null);
  const pending = useRef<Promise<Runner> | null>(null);
  const [status, setStatus] = useState<ModelStatus>("idle");
  const [progress, setProgress] = useState(0);

  const load = useCallback(async (): Promise<Runner> => {
    if (runner.current) return runner.current;
    if (!pending.current) {
      setStatus("loading");
      pending.current = (async () => {
        const { pipeline, env } = await import("@huggingface/transformers");
        env.allowLocalModels = false;
        const create = pipeline as unknown as (t: string, m: string, o: unknown) => Promise<Runner>;
        const r = await create(task, model, {
          dtype: "q8",
          progress_callback: (p: { status?: string; progress?: number }) => { if (p.status === "progress" && typeof p.progress === "number") setProgress(Math.round(p.progress)); },
        });
        runner.current = r; setStatus("ready"); return r;
      })().catch((e) => { pending.current = null; setStatus("error"); throw e; });
    }
    return pending.current;
  }, [task, model]);

  return { load, status, progress };
}
