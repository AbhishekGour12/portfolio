"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const Logo = dynamic(() => import("../Home/Logo"), { ssr: false });
const DemoVideoSection = dynamic(() => import("../Home/DemoVideoSection"), { ssr: false });
const ProblemSolutionSection = dynamic(() => import("../Home/ProblemSolutionSection"), { ssr: false });
const ProjectSection = dynamic(() => import("../Home/ProjectSection"), { ssr: false });
const SkillsSection = dynamic(() => import("../Home/SkillsSection"), { ssr: false });
const ServiceSection = dynamic(() => import("../Home/ServiceSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("../Home/TestimonialSection"), { ssr: false });
const FAQSection = dynamic(() => import("../Home/FAQSection"), { ssr: false });

export function LazyLogo() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return <div ref={ref} style={{ minHeight: "120px", width: "100%" }}>{inView ? <Logo /> : null}</div>;
}

export function LazyDemoVideo() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return <div ref={ref} style={{ minHeight: "500px", width: "100%" }}>{inView ? <DemoVideoSection /> : null}</div>;
}

export function LazyProblemSolution() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return (
    <div ref={ref} className="hidden md:block" style={{ minHeight: "600px", width: "100%" }}>
      {inView ? <ProblemSolutionSection /> : null}
    </div>
  );
}

export function LazyProject() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return <div ref={ref} style={{ minHeight: "700px", width: "100%" }}>{inView ? <ProjectSection /> : null}</div>;
}

export function LazySkills() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return <div ref={ref} style={{ minHeight: "500px", width: "100%" }}>{inView ? <SkillsSection /> : null}</div>;
}

export function LazyService() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return <div ref={ref} style={{ minHeight: "500px", width: "100%" }}>{inView ? <ServiceSection /> : null}</div>;
}

export function LazyTestimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return <div ref={ref} style={{ minHeight: "600px", width: "100%" }}>{inView ? <TestimonialsSection /> : null}</div>;
}

export function LazyFAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  return <div ref={ref} style={{ minHeight: "700px", width: "100%" }}>{inView ? <FAQSection /> : null}</div>;
}
