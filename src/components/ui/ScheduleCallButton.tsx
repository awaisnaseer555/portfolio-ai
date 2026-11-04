"use client";
import { useState } from "react";
import { PopupModal } from "react-calendly";
import { SITE } from "@/config/site";

interface Props { className?: string; children?: React.ReactNode }

/** The only component that opens booking. URL comes from SITE.calendly (NEXT_PUBLIC_CALENDLY_URL). */
export default function ScheduleCallButton({ className = "btn btn-primary", children = "Schedule a Call" }: Props) {
  const [open, setOpen] = useState(false);
  const click = () => {
    if (!SITE.calendly) { window.location.href = `mailto:${SITE.email}?subject=Schedule a call`; return; }
    setOpen(true);
  };
  return (
    <>
      <button type="button" onClick={click} className={className}>{children}</button>
      {open && (
        <PopupModal
          url={SITE.calendly}
          open={open}
          onModalClose={() => setOpen(false)}
          rootElement={document.body}
          pageSettings={{ hideGdprBanner: true }}
        />
      )}
    </>
  );
}
