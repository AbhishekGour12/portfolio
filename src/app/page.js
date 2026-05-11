import Logo from "./Home/Logo";
import DemoVideoSection from "./Home/DemoVideoSection";
import HeroSection from "./Home/HeroSection";
import ProjectSection from "./Home/ProjectSection";
import ServiceSection from "./Home/ServiceSection";
import SkillsSection from "./Home/SkillsSection";
import TestimonialsSection from "./Home/TestimonialSection";
import ProblemSolutionSection from "./Home/ProblemSolutionSection";

export default function Home() {
  return (
    <>
   <HeroSection/>
   <Logo/>
   <DemoVideoSection/>
   <ProblemSolutionSection/>
   <ProjectSection/>
   <SkillsSection/>
   
   <ServiceSection/>
   <TestimonialsSection/>
  
   </>
  );
}
