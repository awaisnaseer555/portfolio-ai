"use client";
import { useEffect, useRef, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";
import { useModel } from "./useModel";

const MODEL = "Xenova/yolos-tiny";
const MAX_MB = 8;
interface Detection { label: string; score: number; box: { xmin: number; ymin: number; xmax: number; ymax: number } }

export default function DetectionDemo() {
  const { load, status, progress } = useModel("object-detection", MODEL);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [dets, setDets] = useState<Detection[]>([]);
  const [threshold, setThreshold] = useState(0.5);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const shown = dets.filter((d) => d.score >= threshold);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  // Draw the image and the boxes whenever the image, detections or threshold change
  useEffect(() => {
    if (!url || !canvas.current) return;
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      const c = canvas.current; const ctx = c?.getContext("2d");
      if (cancelled || !c || !ctx) return;
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      const lw = Math.max(2, img.naturalWidth / 280), fs = Math.max(13, img.naturalWidth / 42);
      ctx.lineWidth = lw; ctx.font = `600 ${fs}px sans-serif`; ctx.textBaseline = "top";
      shown.forEach((d) => {
        const { xmin, ymin, xmax, ymax } = d.box, label = `${d.label} ${Math.round(d.score * 100)}%`, tw = ctx.measureText(label).width + 10;
        ctx.strokeStyle = "#6d7cff"; ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
        ctx.fillStyle = "#4852d4"; ctx.fillRect(xmin - lw / 2, Math.max(0, ymin - fs - 6), tw, fs + 6);
        ctx.fillStyle = "#fff"; ctx.fillText(label, xmin + 4, Math.max(0, ymin - fs - 6) + 3);
      });
    };
    img.src = url;
    return () => { cancelled = true; };
  }, [url, shown]);

  async function onFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please choose an image file."); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setError(`Please choose an image under ${MAX_MB} MB.`); return; }
    const u = URL.createObjectURL(file);
    setUrl(u); setDets([]); setError(""); setBusy(true);
    try { setDets((await (await load())(u, { threshold: 0.3 })) as Detection[]); }
    catch { setError("Could not run the model. Check your connection and try again."); }
    finally { setBusy(false); }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <label onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files[0]); }}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-bg p-6 text-center transition hover:border-brand">
          <ImageUp size={28} className="text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold">Upload or drop an image</span>
          <span className="text-xs text-mute">JPG, PNG or WebP up to {MAX_MB} MB. Processed in your browser, never uploaded.</span>
          <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
        {url && <canvas ref={canvas} className="mt-4 h-auto w-full rounded-xl border border-line" role="img" aria-label="Uploaded image with detected objects outlined" />}
      </div>
      <div className="card" aria-live="polite">
        <h3 className="font-semibold">Detected objects</h3>
        {busy && <p className="mt-3 flex items-center gap-2 text-sm text-mute"><Loader2 size={16} className="animate-spin" aria-hidden="true" />{status === "loading" ? `Loading model ${progress}%` : "Detecting…"}</p>}
        {!busy && url && shown.length === 0 && <p className="mt-3 text-sm text-mute">No objects above {Math.round(threshold * 100)}% confidence. Try lowering the threshold.</p>}
        {!url && <p className="mt-3 text-sm text-mute">Upload a photo to see what the model finds.</p>}
        <ul className="mt-3 space-y-2">{shown.map((d, i) => <li key={i} className="flex items-center justify-between text-sm"><span className="font-medium capitalize">{d.label}</span><span className="text-mute">{Math.round(d.score * 100)}%</span></li>)}</ul>
        <label htmlFor="thr" className="mt-5 block text-sm font-semibold">Confidence threshold: {Math.round(threshold * 100)}%</label>
        <input id="thr" type="range" min={0.3} max={0.95} step={0.05} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="mt-2 w-full accent-[rgb(var(--brand))]" />
        {error && <p role="alert" className="mt-3 text-sm text-brand">{error}</p>}
        <p className="mt-4 text-xs text-mute">Model: YOLOS-tiny (COCO classes), running with Transformers.js. The first run downloads the model once, then it is cached.</p>
      </div>
    </div>
  );
}
