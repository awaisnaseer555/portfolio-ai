import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import PlaygroundTeaser from "@/components/sections/PlaygroundTeaser";
import Assistant from "@/components/sections/Assistant";
import FaqSection from "@/components/sections/FaqSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (<><Hero /><StatsStrip /><About /><Services /><Skills /><Projects /><Experience /><Testimonials /><PlaygroundTeaser /><Assistant /><FaqSection /><Contact /></>);
}
