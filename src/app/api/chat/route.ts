import { NextResponse } from "next/server";
import { answer } from "@/lib/rag/answer";
import type { Msg } from "@/lib/rag/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort rate limit (per server instance). Use Upstash/Vercel KV for strict limits in production.
const hits = new Map<string, number[]>();
const LIMIT = 15, WINDOW = 10 * 60_000;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return NextResponse.json({ role: "assistant", content: "You're asking a lot of questions! Please wait a few minutes, or book a call to talk directly.", cta: true }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: { history?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const history: Msg[] = (Array.isArray(body.history) ? body.history : [])
    .filter((m): m is Msg => !!m && typeof m === "object" && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-8).map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));
  if (!history.length || history[history.length - 1].role !== "user") return NextResponse.json({ error: "Expected a user message" }, { status: 400 });

  const a = await answer(history);
  return NextResponse.json({ role: "assistant", content: a.content, cta: a.cta, sources: a.sources });
}
