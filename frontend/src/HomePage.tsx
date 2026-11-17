import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import About from "./components/sections/About";
import Achievements from "./components/sections/Achievements";
import CTA from "./components/sections/CTA";
import FeaturedCourses from "./components/sections/FeaturedCourses";
import FloatingContact from "./components/sections/FloatingContact";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import LiveClasses from "./components/sections/LiveClasses";
import Navbar from "./components/sections/Navbar";
import Testimonials from "./components/sections/Testimonials";
import WorkingProcess from "./components/sections/WorkingProcess";
import { hero, skipLink } from "./data/content";
import { getValidSession } from "./utils/session";

/** Public landing page, served at "/". Copy lives in ./data/content.ts. */
const HomePage = () => {
  const navigate = useNavigate();

  // Preload hero image only on the landing route (avoids unused-preload warnings on app pages).
  useEffect(() => {
    const href = hero.image.src;
    const existing = document.head.querySelector(`link[data-hero-preload="true"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.setAttribute("fetchpriority", "high");
    link.setAttribute("data-hero-preload", "true");
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);

  // Signed-in users go straight to their dashboard.
  useEffect(() => {
    const session = getValidSession();
    if (!session) return;
    if (session.role === "instructor") {
      navigate("/dashboard");
      return;
    }
    if (session.role === "student") navigate("/student-dashboard");
  }, [navigate]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="landing relative min-h-screen overflow-x-clip bg-white font-sans text-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
        >
          {skipLink}
        </a>

        <Navbar />

        <main id="main">
          <Hero />
          <Achievements />
          <FeaturedCourses />
          <About />
          <WorkingProcess />
          <LiveClasses />
          <Testimonials />
          <CTA />
        </main>

        <Footer />
        <FloatingContact />
      </div>
    </MotionConfig>
  );
};

export default HomePage;
