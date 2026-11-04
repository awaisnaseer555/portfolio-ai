import type { ChatMessage, ChatProvider } from "./chat";
const RULES: [RegExp, string, boolean?][] = [
  [/experience|background/, "I have 6+ years of professional experience, most recently as Senior Full-Stack Engineer at Webmax Solutions, after roles at Devbox, TEO International, TeReSol and Uforia Infotech."],
  [/tech|stack|skill/, "React, Next.js, TypeScript, Node.js, NestJS, Python/FastAPI, MongoDB, MySQL, plus CI/CD with GitHub Actions and Azure DevOps."],
  [/saas|build/, "Yes. I can take a SaaS product from architecture through development to deployment."],
  [/\bai\b|genai|llm/, "I work on LLM integrations, AI workflows and Python/FastAPI AI backends, and use AI-assisted tools like Claude Code and Cursor day to day."],
  [/service|offer/, "Full-stack development, SaaS, AI/GenAI, solution architecture, API development, technical leadership and application modernization."],
  [/project|work\b/, "See the Projects section: personal sites (Royal Hawks Real Estate, Jani Foods & Catering Co., Comfort Linadafah) and professional work (healthcare case management, regulatory compliance, car insurance and banking platforms)."],
  [/call|schedule|together|hire|contact/, "Happy to talk. You can book a call below.", true],
];
export const mockProvider: ChatProvider = {
  async send(history: ChatMessage[]) {
    const q = [...history].reverse().find((m) => m.role === "user")?.content.toLowerCase() ?? "";
    const hit = RULES.find(([re]) => re.test(q));
    return hit ? { role: "assistant", content: hit[1], cta: !!hit[2] } : { role: "assistant", content: "I can speak to my experience, skills, services and projects. Try a suggestion, or book a call.", cta: true };
  },
};
