"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props { images: string[]; name: string; children?: React.ReactNode }

/** Hover = auto-slide, click image / arrows / dots / swipe / arrow keys = manual navigation. */
export default function ProjectCarousel({ images, name, children }: Props) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = images.length;
  const go = (d: number) => setI((c) => (c + d + n) % n);

  useEffect(() => {
    if (!hover || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((c) => (c + 1) % n), 1600);
    return () => clearInterval(t);
  }, [hover, n]);

  const btn = "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/90 p-1.5 text-fg opacity-0 shadow transition hover:bg-card group-hover/car:opacity-100 group-focus-within/car:opacity-100 [@media(hover:none)]:opacity-100";

  return (
    <div
      role="group" aria-roledescription="carousel" aria-label={`${name} screenshots`} tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setI(0); }}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touchX.current === null) return; const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touchX.current = null; }}
      className="group/car relative aspect-[16/10] overflow-hidden rounded-2xl bg-line"
    >
      <div className={`flex h-full transition-transform duration-500 ease-out ${n > 1 ? "cursor-pointer" : ""}`} style={{ transform: `translateX(-${i * 100}%)` }} onClick={() => n > 1 && go(1)}>
        {images.map((src, idx) => (
          <div key={src} className="relative h-full w-full shrink-0" aria-hidden={idx !== i}>
            <Image src={src} alt={`${name} screenshot ${idx + 1} of ${n}`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
      {children}
      {n > 1 && (
        <>
          <button type="button" aria-label="Previous screenshot" onClick={() => go(-1)} className={`${btn} left-2`}><ChevronLeft size={18} /></button>
          <button type="button" aria-label="Next screenshot" onClick={() => go(1)} className={`${btn} right-2`}><ChevronRight size={18} /></button>
          <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button key={idx} type="button" aria-label={`Show screenshot ${idx + 1}`} aria-current={idx === i} onClick={() => setI(idx)}
                className={`relative before:absolute before:-inset-2 before:content-[''] h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-card" : "w-1.5 bg-card/60 hover:bg-card"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
