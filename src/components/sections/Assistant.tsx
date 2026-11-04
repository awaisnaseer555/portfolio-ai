import Section from "@/components/ui/Section";
import Chat from "@/components/chat/Chat";
export default function Assistant() {
  return (
    <Section id="assistant" eyebrow="AI Twin" title="Ask my AI Twin." intro="A chatbot grounded in my resume, projects and skills using retrieval-augmented generation (RAG). Ask it what you would ask me.">
      <Chat />
    </Section>
  );
}
