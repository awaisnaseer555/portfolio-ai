import { FAQS, JOBS, PROJECTS, SERVICES } from "@/data";
import { SKILL_GROUPS } from "@/data/skills";
import { KNOWLEDGE } from "@/data/knowledge";
import { SITE } from "@/config/site";

export interface Chunk {
  id: string;
  title: string;
  text: string;
}

const MAX_CHARS = 700;

function split(text: string): string[] {
  const parts = text
    .split(/\n{2,}/)
    .flatMap((p) =>
      p.length > MAX_CHARS
        ? p.split(/(?<=[.!?])\s+/)
        : [p]
    );

  const out: string[] = [];
  let cur = "";

  for (const p of parts) {
    if (
      (cur + " " + p).trim().length > MAX_CHARS &&
      cur
    ) {
      out.push(cur.trim());
      cur = p;
    } else {
      cur = `${cur} ${p}`;
    }
  }

  if (cur.trim()) {
    out.push(cur.trim());
  }

  return out;
}

export function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [];

  const add = (
    title: string,
    text: string,
    idPrefix?: string
  ) => {
    split(text).forEach((t, i) => {
      chunks.push({
        id: `${idPrefix ?? title}#${i}`,
        title,
        text: t,
      });
    });
  };

  // 1. Contact information
  add(
    "Contact Information",
    `
    Name: ${SITE.fullName}.
    Email: ${SITE.email}.
    LinkedIn: ${SITE.linkedin}.
    GitHub: ${SITE.github}.
    Portfolio: ${SITE.url}.
    Visitors can book a call through the Schedule a Call button.
    `,
    "contact"
  );

  // 2. Professional knowledge
  KNOWLEDGE.forEach((k) => {
    add(
      `Knowledge: ${k.title}`,
      k.text,
      `knowledge-${k.title}`
    );
  });

  // 3. Technical skills
  SKILL_GROUPS.forEach((g) => {
    const skills = g.skills
      .map((s) => s.name)
      .join(", ");

    add(
      `Technical Skills: ${g.title}`,
      `${g.title} technologies and skills: ${skills}.`,
      `skills-${g.title}`
    );
  });

  // 4. Professional experience
  JOBS.forEach((j) => {
    add(
      `Professional Experience: ${j.company}`,
      `
      Position: ${j.role}.
      Company: ${j.company}.
      Period: ${j.period}.
      Responsibilities and achievements:
      ${j.points.join(" ")}
      `,
      `job-${j.company}`
    );
  });

  // 5. Projects
  PROJECTS.forEach((p) => {
    add(
      `Project: ${p.name}`,
      [
        `Project: ${p.name}.`,
        `Type: ${p.kind}.`,
        p.role && `My role: ${p.role}.`,
        p.description,
        p.problem && `Problem solved: ${p.problem}.`,
        p.contribution && `My contribution: ${p.contribution}.`,
        `Technologies: ${p.tags.join(", ")}.`,
        p.live && `Live website: ${p.live}.`,
      ]
        .filter(Boolean)
        .join(" "),
      `project-${p.name}`
    );
  });

  // 6. Services
  SERVICES.forEach((s) => {
    add(
      `Service: ${s.title}`,
      `${s.title}: ${s.description}`,
      `service-${s.title}`
    );
  });

  // 7. FAQs
  FAQS.forEach((f) => {
    add(
      `FAQ: ${f.q}`,
      `
      Question: ${f.q}
      Answer: ${f.a}
      `,
      `faq-${f.q}`
    );
  });

  console.log(
    `[RAG] Knowledge corpus initialized: ${chunks.length} chunks`
  );

  return chunks;
}