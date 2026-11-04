import Link from "next/link";
import { ImageIcon, MessageSquareText } from "lucide-react";
import Section from "@/components/ui/Section";

export default function PlaygroundTeaser() {
  return (
    <Section id="lab" eyebrow="AI Lab" title="Interactive ML playground." intro="Try two real models in your browser. They run on your device, so nothing is uploaded.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card"><MessageSquareText className="text-brand" size={26} aria-hidden="true" /><h3 className="mt-3 text-lg font-semibold">Sentiment Analyzer</h3><p className="mt-1 text-sm text-mute">Type a sentence and see whether the model reads it as positive or negative.</p></div>
        <div className="card"><ImageIcon className="text-brand" size={26} aria-hidden="true" /><h3 className="mt-3 text-lg font-semibold">Object Detection</h3><p className="mt-1 text-sm text-mute">Upload a photo and see which objects the model finds, with confidence scores.</p></div>
      </div>
      <div className="mt-6"><Link href="/playground" className="btn btn-primary">Open the playground</Link></div>
    </Section>
  );
}
