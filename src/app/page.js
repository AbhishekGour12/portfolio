import { Suspense, lazy } from "react";

// Lazy Load Components
const Logo = lazy(() => import("./Home/Logo"));
const DemoVideoSection = lazy(() => import("./Home/DemoVideoSection"));
const HeroSection = lazy(() => import("./Home/HeroSection"));
const ProjectSection = lazy(() => import("./Home/ProjectSection"));
const ServiceSection = lazy(() => import("./Home/ServiceSection"));
const SkillsSection = lazy(() => import("./Home/SkillsSection"));
const TestimonialsSection = lazy(() => import("./Home/TestimonialSection"));
const ProblemSolutionSection = lazy(() =>
  import("./Home/ProblemSolutionSection")
);

// Loader Component
const SectionLoader = () => {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Suspense fallback={<SectionLoader />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Logo />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <DemoVideoSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ProblemSolutionSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ProjectSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ServiceSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
    </>
  );
}