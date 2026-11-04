import { Blocks, Brain, Cloud, Code2, Compass, Plug, Users } from "lucide-react";
import type { Faq, Job, Project, Service } from "@/types";

export const SERVICES: Service[] = [
  { icon: Code2, title: "Full-Stack Web Development", description: "React, Next.js, Node.js, NestJS, TypeScript and modern backend architecture." },
  { icon: Cloud, title: "SaaS Application Development", description: "Design and development of scalable SaaS products from architecture to production." },
  { icon: Brain, title: "AI & GenAI Development", description: "AI-powered applications, LLM integrations, AI workflows, intelligent assistants and automation." },
  { icon: Compass, title: "Solution Architecture", description: "Architecture design, technology selection, API architecture, scalability and technical planning." },
  { icon: Plug, title: "Backend & API Development", description: "NestJS, Node.js, Python, FastAPI, REST and GraphQL APIs." },
  { icon: Users, title: "Technical Leadership", description: "Technical decision-making, development team leadership, mentoring and code reviews." },
  { icon: Blocks, title: "Application Modernization", description: "Refactoring legacy systems and improving architecture, performance and maintainability." },
];

const imgs = (slug: string, count = 3) => Array.from({ length: count }, (_, i) => `/projects/${slug}-${i + 1}.svg`);
// To use your own files, list them explicitly instead, e.g. images: ["/projects/my-app-1.png", "/projects/my-app-2.png"]
export const PROJECTS: Project[] = [
  { slug: "royal-hawks-estate", name: "Royal Hawks Estate", kind: "personal", live: "https://royalhawksestate.com",
    description: "A real estate brokerage website for the UAE market: property search by buy, rent and commercial, a filterable featured-listings grid, and a contact page with enquiry form and map.", problem: "Presenting property listings and handling enquiries for a UAE real estate business.",
    contribution: "Designed and developed the website.", tags: ["Real estate", "UAE", "Property listings"], images: ["/projects/royal-hawks-estate-1.webp", "/projects/royal-hawks-estate-2.webp", "/projects/royal-hawks-estate-3.webp"] },
  { slug: "jani-foods", name: "Jani Foods", kind: "personal", live: "https://www.janifoods92.com/",
    description: "A catering and food services website built with Next.js: a bulk (degi) menu with package options, cart, delivery zones, payment options, WhatsApp ordering and an order confirmation with receipt.", problem: "Letting customers order bulk catering packages online.",
    contribution: "Designed and built the site with Next.js.", tags: ["Next.js", "Catering", "Online ordering"], images: ["/projects/jani-foods-1.webp", "/projects/jani-foods-2.webp", "/projects/jani-foods-3.webp", "/projects/jani-foods-4.webp"] },
  { slug: "comfort-linadafah", name: "Comfort Linadafah", kind: "personal", live: "https://comfort-lilnadafah.vercel.app/",
    description: "A cleaning services platform for Saudi Arabia that connects customers with vetted, insured cleaners for homes, apartments and offices across the Kingdom.",
    problem: "Making it quick to book trusted cleaners: booking takes under two minutes and pricing is cleaners × hours.",
    contribution: "Designed and developed the platform.", tags: ["Cleaning services", "Saudi Arabia"], images: imgs("comfort-linadafah") },
  { slug: "healthcare-case-management", name: "Healthcare & Human Services Case Management Platform", kind: "professional", role: "Full Stack MERN Engineer",
    description: "Designed and developed Case Management Hub, a full-stack SaaS platform featuring role-based access control, appointment scheduling, Google & Microsoft Calendar sync, a TinyMCE letters builder, a branding editor, file management and real-time dashboards. Built with HIPAA compliance in mind from the ground up.",
    tags: ["NestJS", "Next.js", "React", "MongoDB", "MySQL", "Tailwind CSS", "TypeScript"], images: imgs("healthcare-case-management"), live: "https://casemanagementhub.org" },
  { slug: "regulatory-risk-compliance", name: "Regulatory, Risk & Compliance SaaS Applications", kind: "professional", role: "Senior Software Engineer",
    description: "Working on Ruleguard, an end-to-end GRC platform that helps financial services firms streamline compliance by automating regulatory processes, reducing risk and replacing manual monitoring. It covers risk management, employee compliance and consumer duty.",
    tags: ["Next.js", "SSR", "Vue.js", "JavaScript", "Vuex", "Jest", "Cypress", "TypeScript", "GitHub Actions"], images: imgs("regulatory-risk-compliance"), live: "https://www.ruleguard.com" },
  { slug: "car-insurance-widget", name: "Car Insurance Widget Applications", kind: "professional", role: "Associate Principal Software Engineer, Front-End Developer",
    description: "Designed and developed a full-stack web app for a car insurance company in Denmark. Converted Figma designs into a responsive, multilingual UI using Vue.js, React, TypeScript, Tailwind CSS and Pinia, built the API with Node.js and set up CI/CD pipelines in Azure DevOps. Features include role-based authentication and a custom-built editor for creating and managing insurance policies. Work was tracked in Jira with GitHub for version control.",
    tags: ["Vue.js", "Pinia", "vue-decorators", "Tailwind CSS", "TypeScript", "Azure DevOps", "Node.js"], images: imgs("car-insurance-widget"), live: "https://www.fdm.dk" },
  { slug: "banking-applications", name: "Banking Applications", kind: "professional", role: "Software Design Engineer, Front-End Developer",
    description: "Worked on a banking application for Bank Al Habib. Developed the front end with Vue.js, BootstrapVue and SCSS, using XState for state management, and contributed to API implementation on the backend with Java Quarkus. Features include role-based authentication and a custom-built editor for creating and managing banking policies.",
    tags: ["Vue.js", "Next.js", "BootstrapVue", "SCSS", "XState", "FSM", "Element Plus", "Storybook", "Java Quarkus", "Vuex", "Vue Router", "Axios"], images: imgs("banking-applications") },
];

export const JOBS: Job[] = [
  { company: "Webmax Solutions", role: "Senior Full-Stack Engineer", period: "December 2025 – Present", points: ["Technical ownership of full-stack web and SaaS delivery.", "Architecture and API design with modern React/Next.js and Node.js stacks."] },
  { company: "Devbox", role: "Senior Software Engineer", period: "October 2024 – November 2025", points: ["Built APIs and front-ends for web applications.", "Applied AI-assisted development to speed up delivery."] },
  { company: "TEO International", role: "Associate Principal Software Engineer", period: "September 2022 – August 2024", points: ["Led development teams, code reviews and architecture decisions.", "Delivered complex enterprise workflows."] },
  { company: "TeReSol Pvt. Ltd.", role: "Senior Software Design Engineer", period: "December 2020 – August 2022", points: ["Designed and developed front-end and back-end features.", "Focused on performance and maintainability."] },
  { company: "Uforia Infotech", role: "Application Developer", period: "April 2019 – December 2020", points: ["Developed web applications and APIs in a growing engineering team."] },
];

export const FAQS: Faq[] = [
  { q: "What technologies do you specialize in?", a: "React, Next.js, TypeScript, Node.js, NestJS, Python/FastAPI, MongoDB, MySQL and GenAI integrations." },
  { q: "Can you build complete SaaS applications?", a: "Yes. I handle architecture, development and deployment, from idea to production." },
  { q: "Do you provide backend development?", a: "Yes: Node.js, NestJS, Python and FastAPI services with REST or GraphQL APIs." },
  { q: "Can you build AI-powered applications?", a: "Yes: LLM integrations, AI workflows and assistants, built with secure server-side API handling." },
  { q: "Can you work as a Solution Architect?", a: "Yes: system design, technology selection, API architecture and scalability planning." },
  { q: "Do you lead development teams?", a: "Yes. I have led teams through technical decisions, mentoring and code reviews." },
  { q: "Can you work with existing applications?", a: "Yes: audits, refactoring, performance improvements and modernization." },
  { q: "Do you provide API development?", a: "Yes: designing, building and documenting REST and GraphQL APIs." },
  { q: "How do we start a project?", a: "Book a call, share your goals, and we agree on scope, architecture and a delivery plan." },
  { q: "How can I schedule a call?", a: "Use any Schedule a Call button on this page to open the booking calendar." },
];
