import Section from "@/components/ui/Section";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SERVICES } from "@/data";
export default function Services() {
  return (
    <Section id="services" eyebrow="Services" title="How I can help.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, description }) => (
          <article key={title} className="card"><Icon className="text-brand" size={26} aria-hidden="true" /><h3 className="mt-3 text-lg font-semibold">{title}</h3><p className="mt-1 text-sm text-mute">{description}</p></article>
        ))}
      </div>
      <div className="mt-8"><ScheduleCallButton>Discuss your project</ScheduleCallButton></div>
    </Section>
  );
}
