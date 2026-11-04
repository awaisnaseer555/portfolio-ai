import { Globe, Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import Section from "@/components/ui/Section";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import ResumeButton from "@/components/ui/ResumeButton";
import { SITE } from "@/config/site";

const ROWS = [
  { icon: <Mail size={18} className="text-brand" />, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: <SiWhatsapp size={18} className="text-[#25D366]" />, label: "WhatsApp", value: "+92 335 5544431", href: `https://wa.me/${SITE.whatsapp}` },
  { icon: <FaLinkedin size={18} className="text-[#0A66C2]" />, label: "LinkedIn", value: "awaisnaseer555", href: SITE.linkedin },
  { icon: <SiGithub size={18} className="text-fg" />, label: "GitHub", value: "awaisnaseer555", href: SITE.github },
  { icon: <Globe size={18} className="text-brand" />, label: "Portfolio", value: "awaisnaseer.vercel.app", href: SITE.url },
];

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Have a product idea or a complex engineering challenge?">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="max-w-md text-mute">{"Let's discuss the architecture, technology and development strategy for your project."}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ScheduleCallButton />
            <a href={`mailto:${SITE.email}`} className="btn btn-ghost">Email Me</a>
            <ResumeButton />
          </div>
        </div>
        <ul className="card !p-4 sm:!p-5">
          {ROWS.map((r) => (
            <li key={r.label} className="border-b border-line last:border-0">
              <a href={r.href} target={r.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="group flex items-center gap-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-bg transition duration-300 group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true">{r.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-mute">{r.label}</span>
                  <span className="block truncate font-medium transition group-hover:text-brand">{r.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
