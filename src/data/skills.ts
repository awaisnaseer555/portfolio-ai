import type { ComponentType } from "react";
import { VscAzureDevops } from "react-icons/vsc";
import {
  SiAnthropic, SiExpress, SiFastapi, SiGit, SiGithub, SiGithubactions, SiGraphql, SiJavascript, SiMongodb, SiMysql,
  SiNestjs, SiNextdotjs, SiNodedotjs, SiPinia, SiPython, SiQuasar, SiReact, SiRedis, SiRedux, SiTailwindcss, SiTypescript,
  SiVercel, SiVuedotjs, SiXstate,
} from "react-icons/si";
import {
  Bot, Box, Boxes, Brain, CheckCheck, Cloud, Compass, Component, Database, Gauge, GitPullRequest, GraduationCap, Kanban,
  Layers, MousePointer2, Network, Plug, Repeat, Share2, Shapes, Sparkles, Table2, SquareTerminal, Workflow, ClipboardList,
  Monitor, Server, Rocket, Wrench,
} from "lucide-react";

export type SkillIcon = ComponentType<{ className?: string; size?: number | string; "aria-hidden"?: boolean }>;
export interface Skill { name: string; icon: SkillIcon; key?: boolean }
export interface SkillGroup { title: string; icon: SkillIcon; skills: Skill[] }

export const SKILL_GROUPS: SkillGroup[] = [
  { title: "Frontend", icon: Monitor, skills: [
    { name: "React.js", icon: SiReact, key: true }, { name: "Next.js", icon: SiNextdotjs, key: true }, { name: "TypeScript", icon: SiTypescript, key: true },
    { name: "Vue.js", icon: SiVuedotjs }, { name: "JavaScript", icon: SiJavascript }, { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Redux", icon: SiRedux }, { name: "Context API", icon: Share2 }, { name: "Pinia", icon: SiPinia }, { name: "Vuex", icon: Boxes },
    { name: "Quasar", icon: SiQuasar }, { name: "XState", icon: SiXstate },
  ] },
  { title: "Backend", icon: Server, skills: [
    { name: "Node.js", icon: SiNodedotjs, key: true }, { name: "NestJS", icon: SiNestjs, key: true }, { name: "Express.js", icon: SiExpress },
    { name: "Python", icon: SiPython, key: true }, { name: "FastAPI", icon: SiFastapi, key: true }, { name: "REST APIs", icon: Network }, { name: "GraphQL", icon: SiGraphql },
  ] },
  { title: "AI / GenAI", icon: Brain, skills: [
    { name: "AI / GenAI", icon: Brain, key: true }, { name: "LLM applications", icon: Bot }, { name: "Prompt Engineering", icon: SquareTerminal },
    { name: "AI-powered workflows", icon: Workflow }, { name: "AI-assisted development", icon: Sparkles }, { name: "Python/FastAPI AI backends", icon: SiFastapi },
  ] },
  { title: "Databases", icon: Database, skills: [
    { name: "MongoDB", icon: SiMongodb, key: true }, { name: "MySQL", icon: SiMysql, key: true }, { name: "SQL", icon: Database },
    { name: "Redis", icon: SiRedis }, { name: "Database Design", icon: Table2 }, { name: "Data Modeling", icon: Shapes },
  ] },
  { title: "Architecture", icon: Compass, skills: [
    { name: "Solution Architecture", icon: Compass }, { name: "System Design", icon: Layers }, { name: "SaaS Architecture", icon: Cloud },
    { name: "API Architecture", icon: Plug }, { name: "Microservices", icon: Boxes }, { name: "SOLID", icon: Component }, { name: "OOP", icon: Box },
    { name: "Clean Code", icon: CheckCheck }, { name: "Performance Optimization", icon: Gauge },
  ] },
  { title: "DevOps", icon: Rocket, skills: [
    { name: "Git", icon: SiGit }, { name: "GitHub", icon: SiGithub }, { name: "GitHub Actions", icon: SiGithubactions },
    { name: "Azure DevOps", icon: VscAzureDevops }, { name: "CI/CD", icon: Repeat }, { name: "Vercel", icon: SiVercel },
  ] },
  { title: "Tools & Leadership", icon: Wrench, skills: [
    { name: "Claude Code", icon: SiAnthropic }, { name: "Cursor AI", icon: MousePointer2 }, { name: "Code Reviews", icon: GitPullRequest },
    { name: "Mentoring", icon: GraduationCap }, { name: "Requirement Analysis", icon: ClipboardList }, { name: "Agile/Scrum", icon: Kanban },
  ] },
];

/** Brand-logo strip shown as the animated marquee (first row / second row). */
const byName = (names: string[]) => names.map((n) => SKILL_GROUPS.flatMap((g) => g.skills).find((s) => s.name === n)!).filter(Boolean);
export const MARQUEE_ROWS: [Skill[], Skill[]] = [
  byName(["React.js", "Next.js", "TypeScript", "JavaScript", "Vue.js", "Tailwind CSS", "Redux", "Node.js", "NestJS", "Express.js"]),
  byName(["Python", "FastAPI", "GraphQL", "MongoDB", "MySQL", "Redis", "Git", "GitHub", "GitHub Actions", "Vercel"]),
];

/** Original brand colors, applied to icons on hover. Black/dark brand logos use the theme text color so they stay visible in dark mode. */
const FG = "rgb(var(--fg))";
const BRAND_COLORS: Record<string, string> = {
  "React.js": "#61DAFB", "Next.js": FG, TypeScript: "#3178C6", "Vue.js": "#4FC08D", JavaScript: "#F7DF1E", "Tailwind CSS": "#06B6D4",
  Redux: "#764ABC", Pinia: "#FFD859", Quasar: "#1976D2", XState: FG, "Node.js": "#5FA04E", NestJS: "#E0234E", "Express.js": FG,
  Python: "#3776AB", FastAPI: "#009688", GraphQL: "#E10098", "Python/FastAPI AI backends": "#009688", MongoDB: "#47A248", MySQL: "#4479A1",
  Redis: "#FF4438", Git: "#F05032", GitHub: FG, "GitHub Actions": "#2088FF", "Azure DevOps": "#0078D7", Vercel: FG, "Claude Code": "#D97757",
};
export const brandColor = (name: string) => BRAND_COLORS[name] ?? "rgb(var(--brand))";
