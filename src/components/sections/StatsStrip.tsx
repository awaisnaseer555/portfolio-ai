import { Building2, CalendarDays, FolderGit2, Layers } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { JOBS, PROJECTS } from "@/data";

// Only facts derived from real data: years of experience, number of featured projects and employers listed on this site.
const STATS = [
  { icon: CalendarDays, value: "6+", label: "Years of Experience" },
  { icon: FolderGit2, value: String(PROJECTS.length), label: "Featured Projects" },
  { icon: Building2, value: String(JOBS.length), label: "Companies Worked With" },
  { icon: Layers, value: "Full-Stack + AI", label: "Engineering Focus" },
];

export default function StatsStrip() {
  return (
    <section aria-label="Highlights" className="py-4 sm:py-5">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="glass-panel grid gap-6 rounded-[1.75rem] p-5 sm:grid-cols-2 sm:rounded-[2rem] sm:p-8 lg:grid-cols-[repeat(4,1fr)_1.5fr] lg:gap-0">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="lg:border-r lg:border-line lg:px-6 lg:first:pl-0">
              <Icon size={22} className="text-brand" aria-hidden="true" />
              <p className="mt-3 text-2xl font-semibold sm:text-3xl">{value}</p>
              <p className="text-sm text-mute">{label}</p>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-1 lg:pl-6">
            <p className="font-medium">From idea → architecture → development → deployment.</p>
            <p className="mt-2 text-sm text-mute">How I take a product to production.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
