export const SITE = {
  name: "Awais Naseer",
  fullName: "Mohammad Awais Naseer",
  url: "https://awaisnaseer.vercel.app",
  email: "awaisnaseer555@gmail.com",
  linkedin: "https://www.linkedin.com/in/awaisnaseer555",
  github: "https://github.com/awaisnaseer555",
  /** WhatsApp number in international format, digits only (+92 335 5544431). */
  whatsapp: "923355544431",
  whatsappMessage: "Hi Awais, I found your portfolio and would like to discuss a project.",
  /** Shown in the hero pill. Set to "" to hide it. */
  availability: "Available for new projects",
  resume: "https://docs.google.com/document/d/19p8LQzXHZx6mlxL0yFTli2xHtgyOLVYz/edit?pli=1",
  /** Your photo: drop a file in /public/profile and update this path (e.g. "/profile/awais.jpg"). */
  profileImage: "/profile/awais.svg",
  /** Single source of truth for booking. Set NEXT_PUBLIC_CALENDLY_URL in .env.local */
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  title: "Awais Naseer | Full-Stack & AI Engineer | Solution Architect",
  description: "Solution Architect and AI & Full-Stack Engineer building scalable SaaS, AI and web applications with React, Next.js, NestJS, Node.js, Python and FastAPI.",
  keywords: ["Solution Architect","Senior Full Stack Developer","MERN Developer","React Developer","Next.js Developer","NestJS Developer","Node.js Developer","Angular Developer","AI Engineer","Generative AI Developer","SaaS Developer","TypeScript Developer","Python Developer","FastAPI Developer"],
} as const;
export const NAV = [
  { label: "Home", id: "home" }, { label: "About", id: "about" }, { label: "Services", id: "services" },
  { label: "Skills", id: "skills" }, { label: "Projects", id: "projects" }, { label: "Experience", id: "experience" },
  { label: "FAQ", id: "faq" }, { label: "Contact", id: "contact" },
] as const;
