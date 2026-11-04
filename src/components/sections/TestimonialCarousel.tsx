"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types";

const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/** Auto-rotating testimonial slider with animated stars. Pauses on hover/focus; no autoplay with reduced motion. */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const go = (d: number) => setI((c) => (c + d + n) % n);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((c) => (c + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, n]);

  const t = items[i];
  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client testimonials" className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <figure key={i} className="t-in relative overflow-hidden rounded-2xl border border-line bg-card p-6 sm:p-8 md:p-10" aria-live={paused ? "polite" : "off"}>
        <Quote className="absolute right-6 top-6 text-brand/15" size={96} aria-hidden="true" />
        <div className="relative flex gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} size={22} aria-hidden="true" style={{ "--s": s } as React.CSSProperties} className={`star ${s < t.rating ? "fill-[#FBBF24] text-[#FBBF24]" : "text-line"}`} />
          ))}
        </div>
        <blockquote className="relative mt-5 text-lg leading-relaxed md:text-xl">{"\u201C"}{t.quote}{"\u201D"}</blockquote>
        <figcaption className="relative mt-6 flex items-center gap-4">
          {t.avatar ? (
            <Image src={t.avatar} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent font-bold text-on">{initials(t.name)}</span>
          )}
          <span>
            <span className="block font-semibold">{t.name}</span>
            <span className="block text-sm text-mute">{t.role}{t.company ? `, ${t.company}` : ""}</span>
            <span className="mt-0.5 flex items-center gap-1 text-sm text-brand"><MapPin size={14} aria-hidden="true" />{t.country}</span>
          </span>
        </figcaption>
        {t.placeholder && <span className="absolute bottom-3 right-4 rounded bg-line px-2 py-0.5 font-mono text-xs">Placeholder (dev only)</span>}
      </figure>
      {n > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="btn btn-ghost !p-2"><ChevronLeft size={18} /></button>
          <div className="flex gap-2">
            {items.map((x, idx) => (
              <button key={idx} type="button" aria-label={`Show testimonial from ${x.name}`} aria-current={idx === i} onClick={() => setI(idx)}
                className={`relative before:absolute before:-inset-2 before:content-[''] h-2 rounded-full transition-all ${idx === i ? "w-6 bg-brand" : "w-2 bg-line hover:bg-brand/60"}`} />
            ))}
          </div>
          <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="btn btn-ghost !p-2"><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
