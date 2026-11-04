"use client";
import { useEffect, useRef } from "react";

interface Node { x: number; y: number; vx: number; vy: number; r: number }
const LINK = 140;                 // max link distance (px)
const MIN_SPEED = 0.15, MAX_SPEED = 0.7;

/** Site-wide animated network background: d3-force drives the nodes, canvas draws them. */
export default function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const rgb = (v: string) => getComputedStyle(root).getPropertyValue(v).trim().replace(/\s+/g, ",");
    let brand = rgb("--brand"), accent = rgb("--accent");
    const mo = new MutationObserver(() => { brand = rgb("--brand"); accent = rgb("--accent"); });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });

    let disposed = false;
    let cleanup = () => {};
    (async () => {
      const { forceSimulation, forceManyBody } = await import("d3-force");
      if (disposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let w = 0, h = 0;
      const resize = () => {
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      const count = Math.round(Math.min(80, Math.max(24, w / 20)));
      const nodes: Node[] = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, r: 1 + Math.random() * 1.6,
      }));

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (d < LINK) {
              ctx.strokeStyle = `rgba(${brand},${(1 - d / LINK) * 0.35})`;
              ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
            }
          }
        }
        ctx.fillStyle = `rgba(${accent},0.7)`;
        for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); }
      };

      const sim = forceSimulation<Node>(nodes)
        .alphaDecay(0).velocityDecay(0)
        .force("charge", forceManyBody<Node>().strength(-4).distanceMax(120))
        .on("tick", () => {
          for (const n of nodes) {
            const s = Math.hypot(n.vx, n.vy) || 0.01;
            const c = Math.min(MAX_SPEED, Math.max(MIN_SPEED, s)) / s;
            n.vx *= c; n.vy *= c;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
          }
          draw();
        });
      if (reduce) { sim.stop(); draw(); }
      window.addEventListener("resize", resize);
      cleanup = () => { sim.stop(); window.removeEventListener("resize", resize); };
    })();

    return () => { disposed = true; cleanup(); mo.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-35 dark:opacity-50" />;
}
