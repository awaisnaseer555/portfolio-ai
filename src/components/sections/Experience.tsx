import Section from "@/components/ui/Section";
import { JOBS } from "@/data";
export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Career timeline.">
      <ol className="ml-2 border-l-2 border-line pl-7">
        {JOBS.map((j) => (
          <li key={j.company} className="group relative pb-8 last:pb-0">
            <span className="absolute -left-[38px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-brand bg-bg transition group-hover:scale-125" aria-hidden="true" />
            <time className="font-mono text-xs text-brand">{j.period}</time>
            <h3 className="text-lg font-semibold">{j.role}</h3>
            <p className="text-mute">{j.company}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-mute">{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
