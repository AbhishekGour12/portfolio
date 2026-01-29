import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


function About({ Profile1 }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
  
      <title>About</title>
   
    <div
      className="w-full min-h-screen flex justify-center items-center px-4 md:px-16 py-20 transition-colors duration-500"
      style={{
        backgroundColor: Profile1 === "white" ? "white" : "#0f172a",
        color: Profile1 === "white" ? "black" : "white",
      }}
    >
      <div className="max-w-5xl space-y-16">
        {/* About Me */}
        <div data-aos="fade-right">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">About Me</h1>
          <p className="text-lg leading-relaxed">
          I'm a passionate and results-driven Full-Stack Web Developer dedicated to transforming ideas into interactive, high-performing digital experiences.
With over 20 successfully delivered projects for clients across various industries, I specialize in building modern, scalable, and aesthetically pleasing web solutions that seamlessly blend functionality with design.

Whether it's a dynamic business website, an admin dashboard, or a custom application — I bring clean code, smooth animations, and solid architecture to every line I write.


          </p>
        </div>

        {/* My Background */}
        <div data-aos="fade-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">My Background</h1>
          <p className="text-lg leading-relaxed">
          We’re a passionate team of developers, designers, and tech innovators committed to building custom web solutions that drive real results. Our mission is to empower businesses — from ambitious startups to growing enterprises — with scalable, high-performance, and beautifully designed digital products.

With a focus on creativity, precision, and collaboration, we deliver solutions that don’t just meet your goals — they elevate your brand in today’s digital-first world.


          </p>
        </div>

        {/* What I Do */}
        <div data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">What I Do</h1>
          <ul className="list-disc pl-5 text-lg space-y-2">
            <li><strong>Web Development:</strong> Scalable, responsive, and secure websites using modern frameworks.</li>
            <li><strong>UI/UX Design:</strong> Visually stunning and user-friendly interfaces that leave a lasting impression.</li>
            <li><strong>Maintenance:</strong> Keep your site fast and smooth with regular updates.</li>
            <li><strong>Deployment:</strong> Seamless website deployment with hosting and configuration.</li>
            <li><strong>Custom Solutions:</strong> Tailored apps like e-commerce platforms, CRMs, etc.</li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div data-aos="zoom-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">Why Choose Us?</h1>
          <ul className="list-disc pl-5 text-lg space-y-2">
            <li><strong>Experience:</strong> 20+ projects across diverse industries.</li>
            <li><strong>Quality:</strong> Focused on delivering high-quality, user-centric work.</li>
            <li><strong>Support:</strong> Reliable customer support anytime you need.</li>
            <li><strong>Innovation:</strong> Future-ready tech stack and best practices.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div data-aos="fade-up">
          <p className="mt-6 text-lg leading-relaxed">
           🚀 Let’s turn your ideas into reality.
Work with <span className="font-semibold text-orange-500">me</span> to build a digital presence that stands out.
          </p>
          <p className="mt-2 font-bold text-orange-400">Your vision, our craft – let's code the future together.</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;
