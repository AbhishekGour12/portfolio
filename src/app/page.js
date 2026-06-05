import { Suspense } from "react";
import dynamic from "next/dynamic";
import SectionSkeleton from "./Components/SectionSkeleton";
import {
  LazyLogo,
  LazyDemoVideo,
  LazyProblemSolution,
  LazyProject,
  LazySkills,
  LazyService,
  LazyTestimonials,
  LazyFAQ
} from "./Components/LazySections";

// Lazy Components
const HeroSection = dynamic(() => import("./Home/HeroSection"), { ssr: true }); // keep SSR

export default function Home() {
  return (
    <>
      {/* Above Fold Content */}
      <HeroSection />

      {/* Lazy Loaded Sections */}
      <Suspense fallback={<SectionSkeleton height="120px" />}>
        <LazyLogo />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <LazyDemoVideo />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <LazyProblemSolution />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="700px" />}>
        <LazyProject />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <LazySkills />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <LazyService />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <LazyTestimonials />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="700px" />}>
        <LazyFAQ />
      </Suspense>
    </>
  );
}