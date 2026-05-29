"use client";

import { Suspense, lazy } from "react";

// Normal Import for Hero Section

import PageLoader from "./Components/PageLoader";
import dynamic from "next/dynamic";

// Lazy Components
const HeroSection = dynamic(() => import("./Home/HeroSection"), { ssr: true }); // keep SSR
const Logo = dynamic(() => import("./Home/Logo"), { ssr: false });
const DemoVideoSection = dynamic(() => import("./Home/DemoVideoSection"), { ssr: false });
const ProjectSection = dynamic(() => import("./Home/ProjectSection"), { ssr: false });
const ServiceSection = dynamic(() => import("./Home/ServiceSection"), { ssr: false });
const SkillsSection = dynamic(() => import("./Home/SkillsSection"), { ssr: false });
const TestimonialsSection = dynamic(() =>
  import("./Home/TestimonialSection")
);
const ProblemSolutionSection = dynamic(() =>
  import("./Home/ProblemSolutionSection")
);
const FAQSection = dynamic(() => import("./Home/FAQSection"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Above Fold Content */}
      <HeroSection />

      {/* Lazy Loaded Sections */}
      <Suspense
        fallback={null}
      >
        <Logo />
        <DemoVideoSection />
        <ProblemSolutionSection />
        <ProjectSection />
        <SkillsSection />
        <ServiceSection />
        <TestimonialsSection />
        <FAQSection />
      </Suspense>
    </>
  );
}