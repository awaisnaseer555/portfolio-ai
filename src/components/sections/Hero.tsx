import Image from "next/image";
import { Sparkles } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { SITE } from "@/config/site";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import ResumeButton from "@/components/ui/ResumeButton";

const TECH = ["React", "Next.js", "NestJS", "Node.js", "TypeScript", "Python", "FastAPI", "AI / GenAI"];

export default function Hero() {
  return (
    <section id="home" className="py-4 sm:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="glass-panel relative overflow-hidden rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-10 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-plum/25 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              {SITE.availability && <span className="pill">{SITE.availability}</span>}
              <h1 className="chrome-text mt-6 text-[clamp(3.2rem,13vw,7rem)] font-extrabold uppercase leading-[.95] tracking-tight">
                Awais<br />Naseer<span className="sr-only">, Principal Software Engineer and Solution Architect</span>
              </h1>
              <p className="mt-5 text-lg font-semibold sm:text-xl">Principal Software Engineer · Solution Architect · AI &amp; Full-Stack Engineer</p>
              <p className="mt-3 max-w-xl text-mute">Building scalable SaaS, AI and web applications that solve real business problems. I design and develop web applications, SaaS platforms, APIs and AI-powered solutions, from idea to architecture to deployment.</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Core technologies">{TECH.map((t) => <li key={t} className="chip chip-key">{t}</li>)}</ul>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ScheduleCallButton />
                <a href="#projects" className="btn btn-ghost">View Projects</a>
                <ResumeButton />
                <a href={SITE.github} className="btn btn-ghost group" rel="noopener noreferrer" aria-label="GitHub"><SiGithub size={18} className="text-fg transition duration-300 group-hover:-rotate-6 group-hover:scale-125" /></a>
                <a href={SITE.linkedin} className="btn btn-ghost group" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} className="text-[#0A66C2] transition duration-300 group-hover:-rotate-6 group-hover:scale-125" /></a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand/25 via-plum/20 to-accent/25 blur-2xl" aria-hidden="true" />
              <div className="glass-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card">
                <Image src={SITE.profileImage} alt={`Portrait of ${SITE.fullName}`} fill priority sizes="(min-width:1024px) 384px, 90vw" className="object-cover" />
              </div>
              <div className="glass-panel absolute -bottom-4 left-4 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold sm:-left-4">
                <Sparkles size={16} className="text-brand" aria-hidden="true" />Full-Stack · SaaS · AI
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
