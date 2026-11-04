# AI features: AI Twin (RAG chatbot) + ML Playground

## Setup
```bash
npm install @huggingface/transformers     # in-browser ML models (Playground)
cp .env.example .env.local                # then add ONE of the keys below
npm run dev
```

## 1. AI Twin (RAG chatbot)
Flow: question -> retrieve the most relevant chunks of your profile -> LLM answers using only those chunks.

- Knowledge base (`src/lib/rag/corpus.ts`) is built automatically from your data: experience, projects, skills, services, FAQ, contact, plus `src/data/knowledge.ts`.
- **Paste your real resume sections into `src/data/knowledge.ts`** (education, achievements, summary...). Leave out your home address and personal phone number.
- Retrieval (`retrieve.ts`): OpenAI/Gemini embeddings + cosine similarity when a key is set; otherwise BM25 keyword search (no key needed).
- Generation (`llm.ts`, `answer.ts`): OpenAI (`OPENAI_API_KEY`) or Gemini (`GEMINI_API_KEY`) through plain `fetch`, server-side only. Model names are env-configurable. With no key, the bot returns the best-matching profile text instead (no LLM).
- API route: `src/app/api/chat/route.ts` (input limits, history cap, basic per-IP rate limit). The rate limit is in memory per server instance; use Upstash/Vercel KV for strict limits.
- The prompt tells the model to use only the retrieved context, never invent facts, and refuse off-topic or prompt-injection requests. It can still make mistakes, and the UI says so.
- This is hand-written RAG (about 250 lines, no framework). To use LangChain.js or LlamaIndex.TS later, replace `retrieve()` and `complete()` only.
- On Vercel: add the same variables in Project Settings -> Environment Variables (never `NEXT_PUBLIC_`), then redeploy. Set a spending limit on your API key.

## 2. ML Playground (`/playground`)
- **Sentiment Analyzer**: DistilBERT SST-2 (`Xenova/distilbert-base-uncased-finetuned-sst-2-english`), positive/negative with confidence.
- **Object Detection**: YOLOS-tiny (`Xenova/yolos-tiny`), draws boxes and labels with an adjustable confidence threshold.
- Both run in the visitor's browser via Transformers.js, so there are no server costs and no uploads. The model downloads on first use (progress shown) and is cached by the browser. Works best on desktop; phones may be slow.
- `next.config.mjs` stubs the Node-only `sharp` / `onnxruntime-node` for the client bundle.
