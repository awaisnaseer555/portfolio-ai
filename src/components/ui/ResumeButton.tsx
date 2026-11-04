import { FileText } from "lucide-react";
import { SITE } from "@/config/site";

/** Opens the resume (SITE.resume) in a new tab. */
export default function ResumeButton({ className = "btn btn-ghost", children = "Get Resume" }: { className?: string; children?: React.ReactNode }) {
  return (
    <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className={className}>
      <FileText size={16} aria-hidden="true" />{children}<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
