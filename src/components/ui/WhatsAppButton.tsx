import { SiWhatsapp } from "react-icons/si";
import { SITE } from "@/config/site";

/** Floating WhatsApp button (bottom-right), opens a chat with SITE.whatsapp in a new tab. */
export default function WhatsAppButton() {
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))", right: "max(1rem, env(safe-area-inset-right))" }}
      className="wa-pulse fixed z-40 isolate flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-110 sm:h-16 sm:w-16">
      <SiWhatsapp size={30} aria-hidden="true" />
    </a>
  );
}
