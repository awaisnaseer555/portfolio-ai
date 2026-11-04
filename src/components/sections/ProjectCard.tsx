import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectCard({ p, n }: { p: Project; n: number }) {
  return (
    <article className="card group flex flex-col gap-3 overflow-hidden !p-3">
      <ProjectCarousel images={p.images} name={p.name}>
        {p.demo && <span className="absolute left-3 top-3 z-10 rounded bg-card px-2 py-1 font-mono text-xs font-semibold">Concept / Demo</span>}
      </ProjectCarousel>
      <div className="flex flex-1 flex-col gap-2 p-3 pt-1 sm:p-4 sm:pt-1">
        <div className="flex items-baseline gap-3"><span className="font-mono text-sm font-semibold text-brand">{String(n).padStart(2, "0")}</span><h3 className="text-lg font-semibold">{p.name}</h3></div>
        <p className="text-sm text-mute">{p.description}</p>
        {p.role && <p className="text-sm"><span className="font-semibold text-brand">My role: </span><span className="text-mute">{p.role}</span></p>}
        {p.problem && <p className="text-sm"><span className="font-semibold text-brand">Problem solved: </span><span className="text-mute">{p.problem}</span></p>}
        {p.contribution && <p className="text-sm"><span className="font-semibold text-brand">Contribution: </span><span className="text-mute">{p.contribution}</span></p>}
        <ul className="mt-1 flex flex-wrap gap-1.5">{p.tags.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
        <div className="mt-auto flex gap-4 pt-3 text-sm font-semibold">
          {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand hover:underline">Live site <ExternalLink size={14} /></a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand hover:underline"><Github size={14} /> Code</a>}
        </div>
      </div>
    </article>
  );
}
