import Link from "next/link";
import { SITE } from "@/config/site";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

const link = "block py-1 text-mute transition hover:text-brand";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12 text-sm">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="text-lg font-bold">{SITE.name}</p>

          <p className="mt-2 text-mute">
            AI &amp; Full-Stack Engineer
            <br />
            Solution Architect
            <br />
            Principal Software Engineer
          </p>

          <div className="mt-4">
            <ScheduleCallButton />
          </div>
        </div>

        {/* Internal Navigation */}
        <div>
          <p className="font-semibold">Quick links</p>

          <Link className={link} href="/#services">
            Services
          </Link>

          <Link className={link} href="/#projects">
            Projects
          </Link>

          <Link className={link} href="/#experience">
            Experience
          </Link>

          <Link className={link} href="/playground">
            AI Lab
          </Link>

          <Link className={link} href="/#contact">
            Contact
          </Link>
        </div>

        {/* External Links */}
        <div>
          <p className="font-semibold">Connect</p>

          <a
            className={link}
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            className={link}
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a className={link} href={`mailto:${SITE.email}`}>
            Email
          </a>

          <a
            className={link}
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-mute">
          © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
