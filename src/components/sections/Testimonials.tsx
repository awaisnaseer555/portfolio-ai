import Section from "@/components/ui/Section";
import { TESTIMONIALS } from "@/data/testimonials";
import TestimonialCarousel from "./TestimonialCarousel";

export default function Testimonials() {
  // Placeholders never ship to production
  const items = process.env.NODE_ENV === "production" ? TESTIMONIALS.filter((t) => !t.placeholder) : TESTIMONIALS;
  if (items.length === 0) return null;
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="What clients say." intro="Feedback from clients and teams I have worked with.">
      <TestimonialCarousel items={items} />
    </Section>
  );
}
