import Section from "@/components/ui/Section";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/data";
const GROUPS = [["personal", "Personal Projects"], ["professional", "Professional Work"]] as const;
export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work." intro="Professional and personal projects. Hover a project image to preview more screenshots.">
      {GROUPS.map(([kind, label]) => (
        <div key={kind} className="mb-10 last:mb-0">
          <h3 className="mb-4 text-xl font-semibold">{label}</h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{PROJECTS.filter((p) => p.kind === kind).map((p, idx) => <ProjectCard key={p.slug} p={p} n={idx + 1} />)}</div>
        </div>
      ))}
    </Section>
  );
}
