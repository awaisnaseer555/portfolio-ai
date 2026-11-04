import Reveal from "./Reveal";
export default function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-4 sm:py-5" aria-labelledby={`${id}-title`}>
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="glass-panel rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-8 md:p-10">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
          {intro && <p className="mt-3 max-w-2xl text-mute">{intro}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </Reveal>
    </section>
  );
}
