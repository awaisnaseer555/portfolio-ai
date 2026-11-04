import type { LucideIcon } from "lucide-react";
export interface Service { icon: LucideIcon; title: string; description: string }
export interface Project {
  slug: string; name: string; kind: "professional" | "personal"; demo?: boolean;
  description: string; role?: string; problem?: string; contribution?: string;
  tags: string[]; images: string[]; live?: string; github?: string;
}
export interface Job { company: string; role: string; period: string; points: string[] }
export interface Faq { q: string; a: string }
export interface Testimonial {
  name: string; role: string; company?: string; country: string; quote: string;
  rating: 1 | 2 | 3 | 4 | 5; avatar?: string; placeholder?: boolean;
}
