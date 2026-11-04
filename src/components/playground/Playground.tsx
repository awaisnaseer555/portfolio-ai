"use client";
import { useState } from "react";
import { ImageIcon, MessageSquareText } from "lucide-react";
import SentimentDemo from "./SentimentDemo";
import DetectionDemo from "./DetectionDemo";

const TABS = [
  { id: "sentiment", label: "Sentiment Analyzer", icon: MessageSquareText },
  { id: "detection", label: "Object Detection", icon: ImageIcon },
] as const;

export default function Playground() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("sentiment");
  return (
    <div>
      <div role="tablist" aria-label="ML demos" className="mb-6 flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" id={`tab-${id}`} aria-selected={tab === id} aria-controls={`panel-${id}`} type="button" onClick={() => setTab(id)}
            className={`btn ${tab === id ? "btn-primary" : "btn-ghost"}`}><Icon size={16} aria-hidden="true" />{label}</button>
        ))}
      </div>
      {/* Both stay mounted so a loaded model is kept when switching tabs */}
      <div role="tabpanel" id="panel-sentiment" aria-labelledby="tab-sentiment" hidden={tab !== "sentiment"}><SentimentDemo /></div>
      <div role="tabpanel" id="panel-detection" aria-labelledby="tab-detection" hidden={tab !== "detection"}><DetectionDemo /></div>
    </div>
  );
}
