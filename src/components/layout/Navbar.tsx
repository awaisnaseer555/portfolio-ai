"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { NAV, SITE } from "@/config/site";
import ThemeToggle from "./ThemeToggle";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import ResumeButton from "@/components/ui/ResumeButton";

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!onHome) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [onHome]);

  // Close mobile menu when route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const link = (isActive: boolean) =>
    `rounded-md px-2.5 py-2 text-sm font-medium transition xl:px-3 ${
      isActive
        ? "text-brand shadow-[inset_0_-2px] shadow-brand"
        : "text-mute hover:text-fg"
    }`;

  const labLink = pathname.startsWith("/playground");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5"
      >
        {/* Brand */}
        <Link href="/#home" className="text-lg font-bold text-accent">
          {SITE.name}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <Link
                href={`/#${n.id}`}
                aria-current={
                  onHome && active === n.id ? "location" : undefined
                }
                className={link(onHome && active === n.id)}
              >
                {n.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/playground"
              aria-current={labLink ? "page" : undefined}
              className={link(labLink)}
            >
              AI Lab
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <ResumeButton className="btn btn-ghost hidden xl:inline-flex" />

          <ScheduleCallButton className="btn btn-primary hidden sm:inline-flex" />

          <button
            type="button"
            className="btn btn-ghost !p-2.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <ul
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg px-5 py-3 lg:hidden"
        >
          {NAV.map((n) => (
            <li key={n.id}>
              <Link
                href={`/#${n.id}`}
                onClick={() => setOpen(false)}
                aria-current={
                  onHome && active === n.id ? "location" : undefined
                }
                className={`block rounded-md px-2 py-3 font-medium ${
                  onHome && active === n.id
                    ? "text-brand"
                    : "text-mute hover:text-fg"
                }`}
              >
                {n.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/playground"
              onClick={() => setOpen(false)}
              className={`block rounded-md px-2 py-3 font-medium ${
                labLink ? "text-brand" : "text-mute hover:text-fg"
              }`}
            >
              AI Lab
            </Link>
          </li>

          <li className="pt-2">
            <ResumeButton className="btn btn-ghost w-full" />
          </li>

          <li className="pt-2">
            <ScheduleCallButton className="btn btn-primary w-full" />
          </li>
        </ul>
      )}
    </header>
  );
}
