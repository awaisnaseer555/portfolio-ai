import { mockProvider } from "./mock-provider";
export interface ChatMessage { role: "user" | "assistant"; content: string; cta?: boolean; sources?: string[] }
export interface ChatProvider { send(history: ChatMessage[]): Promise<ChatMessage> }

/** POSTs the conversation to a server route that holds the API keys (never call LLM APIs from the browser). */
export const httpProvider = (endpoint = "/api/chat"): ChatProvider => ({
  async send(history) {
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ history: history.map(({ role, content }) => ({ role, content })) }) });
    const data = (await res.json()) as ChatMessage;
    if (!data.content) throw new Error("Chat request failed");
    return data;
  },
});

/** RAG chatbot via /api/chat; falls back to the local scripted replies if the API is unreachable. */
export const chatProvider: ChatProvider = {
  async send(history) {
    try { return await httpProvider().send(history); } catch { return mockProvider.send(history); }
  },
};
