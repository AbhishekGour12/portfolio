"use client";

import { Suspense, lazy } from "react";

// Normal Import for Hero Section
import HeroSection from "./Home/HeroSection";

// Lazy Components
const Logo = lazy(() => import("./Home/Logo"));
const DemoVideoSection = lazy(() => import("./Home/DemoVideoSection"));
const ProjectSection = lazy(() => import("./Home/ProjectSection"));
const ServiceSection = lazy(() => import("./Home/ServiceSection"));
const SkillsSection = lazy(() => import("./Home/SkillsSection"));
const TestimonialsSection = lazy(() =>
  import("./Home/TestimonialSection")
);
const ProblemSolutionSection = lazy(() =>
  import("./Home/ProblemSolutionSection")
);
const FAQSection = lazy(() => import("./Home/FAQSection"));

export default function Home() {
  return (
    <>
      {/* Above Fold Content */}
      <HeroSection />

      {/* Lazy Loaded Sections */}
      <Suspense
        fallback={
          <div className="py-10 text-center text-gray-400">
            Loading...
          </div>
        }
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