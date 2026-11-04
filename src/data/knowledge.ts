export interface KnowledgeEntry { title: string; text: string }

/**
 * Extra facts the AI Twin can use (on top of your projects, skills, experience and FAQ data).
 * Paste your REAL resume here, section by section (summary, education, certifications, achievements, languages...).
 * The chatbot only answers from this knowledge, so anything you leave out it will say it does not know.
 * Do NOT paste private details you don't want public (home address, personal phone, ID numbers).
 */
export const KNOWLEDGE: KnowledgeEntry[] = [
  { title: "About me", text: "I am Mohammad Awais Naseer, a Principal Software Engineer, Solution Architect, development team lead and senior full-stack engineer with 6+ years of professional experience building scalable web applications and SaaS platforms, including AI-powered applications." },
  { title: "How I work", text: "I take products from idea to architecture to development to deployment. I work directly with clients on requirements, lead development teams with code reviews and mentoring, and use Agile/Scrum. I use AI-assisted development tools such as Claude Code and Cursor." },
  { title: "Python and AI backends", text: "Python and FastAPI are part of my backend toolkit alongside Node.js, NestJS and Express. I use Python/FastAPI backends for AI-powered features and LLM integrations. For details of specific Python work, the best way is to book a call." },
  // --- Paste your real resume sections below, for example: ---
  // { title: "Education", text: "..." },
  // { title: "Achievements", text: "..." },
];
