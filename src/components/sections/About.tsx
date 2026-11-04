import Section from "@/components/ui/Section";
const FOCUS = ["Product architecture", "Full-stack development", "SaaS platforms", "Enterprise applications", "API development", "AI-powered applications", "Team leadership", "Client collaboration", "Performance optimization"];
export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Architect, builder and team lead.">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <p className="text-mute">I am a Principal Software Engineer and Solution Architect with 6+ years of experience building scalable web applications and SaaS platforms. I work across the whole product lifecycle, from architecture and full-stack development to API design, AI-powered features, performance and deployment, while leading developers and collaborating directly with clients.</p>
        <ul className="flex flex-wrap content-start gap-2" aria-label="Focus areas">{FOCUS.map((f) => <li key={f} className="chip chip-key">{f}</li>)}</ul>
      </div>
    </Section>
  );
}
