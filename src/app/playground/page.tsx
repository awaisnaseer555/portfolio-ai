import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Playground from "@/components/playground/Playground";

export const metadata: Metadata = {
  title: "ML Playground",
  description: "Try machine learning in your browser: a sentiment analyzer and an object detector running on-device with Transformers.js.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return (
    <div className="pt-2">
      <Section id="playground" eyebrow="ML Playground" title="Try machine learning in your browser." intro="Two small models running on your device with Transformers.js and ONNX Runtime. Nothing you type or upload leaves your browser.">
        <Playground />
        <p className="mt-8 text-sm"><Link href="/#contact" className="font-semibold text-brand hover:underline">Want something like this in your product? Let&apos;s talk →</Link></p>
      </Section>
    </div>
  );
}
