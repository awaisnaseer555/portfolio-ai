import type { Testimonial } from "@/types";

/**
 * Add REAL client feedback here (with the client's permission).
 * Placeholder entries (placeholder: true) are shown only in development and are hidden in production builds,
 * so sample text can never go live by accident. Delete them once you have real testimonials.
 * Optional avatar: put a square photo in /public/testimonials and set avatar: "/testimonials/name.jpg".
 */
export const TESTIMONIALS: Testimonial[] = [
  { name: "Client Name", role: "Job Title", company: "Company", country: "Country", rating: 5, placeholder: true,
    quote: "Replace this with your client's real feedback about working with you." },
  { name: "Client Name", role: "Job Title", company: "Company", country: "Country", rating: 5, placeholder: true,
    quote: "Add a second real testimonial here. Mention results the client confirmed, not invented numbers." },
  { name: "Client Name", role: "Job Title", company: "Company", country: "Country", rating: 5, placeholder: true,
    quote: "Add a third real testimonial here, ideally from a different country or industry." },
];
