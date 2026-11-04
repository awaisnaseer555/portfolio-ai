export interface Msg { role: "user" | "assistant"; content: string }
export type Provider = "openai" | "gemini";

const env = (k: string, d = "") => process.env[k] || d;
const GEMINI = "https://generativelanguage.googleapis.com/v1beta/models";

/** Provider is picked from AI_PROVIDER, else whichever API key exists. Returns null when no key is configured. */
export function activeProvider(): Provider | null {
  const pref = env("AI_PROVIDER").toLowerCase();
  const o = !!env("OPENAI_API_KEY"), g = !!env("GEMINI_API_KEY");
  if (pref === "gemini" && g) return "gemini";
  if (pref === "openai" && o) return "openai";
  return o ? "openai" : g ? "gemini" : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function post(
  url: string,
  headers: Record<string, string>,
  body: unknown
): Promise<any> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(25_000),
  });

  if (!res.ok) {
    const errorBody = await res.text();

    console.error("[LLM API Error]", {
      status: res.status,
      body: errorBody.slice(0, 1000),
    });

    throw new Error(
      `LLM request failed: ${res.status}`
    );
  }

  return res.json();
}

/** Chat completion with a system prompt (retrieved context is included in `system`). */
export async function complete(system: string, messages: Msg[]): Promise<string> {
  const p = activeProvider();
  if (p === "openai") {
    const data = await post("https://api.openai.com/v1/chat/completions", { Authorization: `Bearer ${env("OPENAI_API_KEY")}` },
      { model: env("OPENAI_MODEL", "gpt-4o-mini"), temperature: 0.3, max_tokens: 400, messages: [{ role: "system", content: system }, ...messages] });
    return data.choices?.[0]?.message?.content?.trim() ?? "";
  }
  if (p === "gemini") {
    const model = env("GEMINI_MODEL", "gemini-2.5-flash");
    const data = await post(`${GEMINI}/${model}:generateContent`, { "x-goog-api-key": env("GEMINI_API_KEY") }, {
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      generationConfig: { temperature: 0.3, maxOutputTokens: 500 },
    });
    return (data.candidates?.[0]?.content?.parts ?? []).map((x: { text?: string }) => x.text ?? "").join("").trim();
  }
  throw new Error("No LLM provider configured");
}

/** Text embeddings for retrieval (same provider as chat). */
export async function embed(texts: string[]): Promise<number[][]> {
  const p = activeProvider();
  if (p === "openai") {
    const data = await post("https://api.openai.com/v1/embeddings", { Authorization: `Bearer ${env("OPENAI_API_KEY")}` },
      { model: env("OPENAI_EMBED_MODEL", "text-embedding-3-small"), input: texts });
    return (data.data as { index: number; embedding: number[] }[]).sort((a, b) => a.index - b.index).map((d) => d.embedding);
  }
  if (p === "gemini") {
    const model = env("GEMINI_EMBED_MODEL", "gemini-embedding-001");
    const out: number[][] = [];
    for (let i = 0; i < texts.length; i += 90) {
      const data = await post(`${GEMINI}/${model}:batchEmbedContents`, { "x-goog-api-key": env("GEMINI_API_KEY") },
        { requests: texts.slice(i, i + 90).map((t) => ({ model: `models/${model}`, content: { parts: [{ text: t }] } })) });
      out.push(...(data.embeddings as { values: number[] }[]).map((e) => e.values));
    }
    return out;
  }
  throw new Error("No embedding provider configured");
}
