import Section from "@/components/ui/Section";
import { FAQS } from "@/data";
export default function FaqSection() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Common questions.">
      <div className="max-w-3xl space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-xl border border-line bg-card px-5 py-4 open:border-brand">
            <summary className="cursor-pointer list-none font-semibold after:float-right after:text-brand after:content-['+'] group-open:after:content-['–']">{f.q}</summary>
            <p className="mt-3 text-sm text-mute">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
