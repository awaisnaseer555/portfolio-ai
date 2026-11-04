import { buildCorpus, type Chunk } from "./corpus";
import { activeProvider, embed } from "./llm";

const STOP = new Set(
  `a an the and or of to in on for with at by is are was were be do does did
   you your yours i me my we us it this that what which who how can could
   would should about tell please have has had from as awais`.split(/\s+/)
);

const tokenize = (s: string) =>
  (s.toLowerCase().match(/[a-z0-9#+.]+/g) ?? [])
    .map((t) => t.replace(/\.+$/, ""))
    .filter((t) => t && !STOP.has(t));

let corpus: Chunk[] | null = null;

let index: {
  docs: Map<string, number>[];
  df: Map<string, number>;
  avg: number;
} | null = null;

let vectors: Promise<number[][]> | null = null;

let embedBlockedUntil = 0;

function getCorpus() {
  const c = (corpus ??= buildCorpus());

  if (!index) {
    const docs = c.map((ch) => {
      const m = new Map<string, number>();

      tokenize(`${ch.title} ${ch.title} ${ch.text}`).forEach((t) => {
        m.set(t, (m.get(t) ?? 0) + 1);
      });

      return m;
    });

    const df = new Map<string, number>();

    docs.forEach((d) =>
      d.forEach((_, t) => {
        df.set(t, (df.get(t) ?? 0) + 1);
      })
    );

    const totalLength = docs.reduce(
      (sum, d) =>
        sum + [...d.values()].reduce((a, b) => a + b, 0),
      0
    );

    index = {
      docs,
      df,
      avg: docs.length ? totalLength / docs.length : 1,
    };
  }

  return { corpus: c, index };
}

/**
 * BM25 keyword search.
 */
function keywordSearch(query: string): Map<string, number> {
  const { corpus: c, index: ix } = getCorpus();

  const q = tokenize(query);

  const N = c.length;
  const k1 = 1.5;
  const b = 0.75;

  const results = new Map<string, number>();

  if (!N) return results;

  c.forEach((chunk, i) => {
    const d = ix.docs[i];

    const len = [...d.values()].reduce((x, y) => x + y, 0);

    let score = 0;

    for (const t of q) {
      const tf = d.get(t) ?? 0;

      if (!tf) continue;

      const df = ix.df.get(t) ?? 0;

      const idf = Math.log(
        1 + (N - df + 0.5) / (df + 0.5)
      );

      score +=
        (idf * tf * (k1 + 1)) /
        (tf + k1 * (1 - b + (b * len) / ix.avg));
    }

    if (score > 0) {
      results.set(chunk.id, score);
    }
  });

  return results;
}

/**
 * Cosine similarity.
 */
function cosine(a: number[], b: number[]): number {
  if (!a.length || !b.length || a.length !== b.length) {
    return 0;
  }

  let dot = 0;
  let na = 0;
  let nb = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }

  return dot / (Math.sqrt(na * nb) || 1);
}

/**
 * Hybrid retrieval:
 * BM25 + Semantic Search.
 */
export async function retrieve(
  query: string,
  k = 5
): Promise<Chunk[]> {
  const { corpus: c } = getCorpus();

  if (!query.trim() || !c.length) {
    return [];
  }

  // Always calculate keyword relevance.
  const keywordScores = keywordSearch(query);

  // Prepare semantic search.
  if (
    activeProvider() &&
    Date.now() > embedBlockedUntil
  ) {
    try {
      vectors ??= embed(
        c.map((x) => `${x.title}\n${x.text}`)
      ).catch((error) => {
        vectors = null;
        throw error;
      });

      const [docVectors, [queryVector]] = await Promise.all([
        vectors,
        embed([query]),
      ]);

      if (
        docVectors.length !== c.length ||
        !queryVector?.length
      ) {
        throw new Error("Invalid embedding response");
      }

      const semanticScores = c.map((chunk, i) => ({
        id: chunk.id,
        score: cosine(queryVector, docVectors[i]),
      }));

      const maxKeyword = Math.max(
        0,
        ...keywordScores.values()
      );

      const combined = c.map((chunk, i) => {
        const semantic = semanticScores[i].score;

        const keyword =
          maxKeyword > 0
            ? (keywordScores.get(chunk.id) ?? 0) / maxKeyword
            : 0;

        // 65% semantic + 35% keyword relevance.
        const score =
          semantic * 0.65 + keyword * 0.35;

        return { chunk, score };
      });

      return combined
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map((x) => x.chunk);

    } catch (error) {
      console.error(
        "[RAG] Embedding failed. Using BM25:",
        error
      );

      embedBlockedUntil = Date.now() + 60_000;
      vectors = null;
    }
  }

  // Keyword fallback.
  return c
    .map((chunk) => ({
      chunk,
      score: keywordScores.get(chunk.id) ?? 0,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.chunk);
}