import Section from "@/components/ui/Section";
import { MARQUEE_ROWS, SKILL_GROUPS, brandColor, type Skill } from "@/data/skills";

const colorVar = (name: string) => ({ "--c": brandColor(name) }) as React.CSSProperties;

function MarqueeRow({ skills, reverse }: { skills: Skill[]; reverse?: boolean }) {
  const loop = [...skills, ...skills]; // duplicated so the -50% translate loops seamlessly
  return (
    <div className={`marquee ${reverse ? "marquee-rev" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {loop.map(({ name, icon: Icon }, i) => (
          <div key={`${name}-${i}`} style={colorVar(name)} className="group mr-3 flex items-center gap-3 rounded-xl border border-line bg-card px-5 py-3 transition hover:-translate-y-1 hover:border-brand">
            <Icon size={28} className="text-mute transition duration-300 group-hover:scale-110 group-hover:text-[color:var(--c)]" />
            <span className="whitespace-nowrap text-sm font-semibold">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  let n = 0; // running index for staggered entrance
  return (
    <Section id="skills" eyebrow="Skills" title="Technical toolkit." intro="Technologies and practices I use to design, build and ship products.">
      <div className="space-y-3">
        <MarqueeRow skills={MARQUEE_ROWS[0]} />
        <MarqueeRow skills={MARQUEE_ROWS[1]} reverse />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {SKILL_GROUPS.map(({ title, icon: GroupIcon, skills }) => (
          <div key={title} className="card">
            <h3 className="flex items-center gap-2 font-semibold"><GroupIcon size={20} className="text-brand" aria-hidden /> {title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.map(({ name, icon: Icon, key }) => (
                <li key={name} style={{ ...colorVar(name), "--i": n++ } as React.CSSProperties}
                  className={`pop group inline-flex items-center gap-2 rounded-xl border bg-bg px-3 py-2 text-sm transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-md hover:shadow-brand/10 ${key ? "skill-key border-brand/60 font-semibold" : "border-line text-mute hover:text-fg"}`}>
                  <Icon size={18} aria-hidden className={`transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-125 text-[color:var(--c)] ${key ? "text-brand" : ""}`} />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
