import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Shield, ArrowRight, Menu, X,
  Briefcase, Layers, Zap, Lock, Scale, Target, Cpu, Code2,
  Video, BarChart3, FileCheck, FolderOpen, Award,   LogIn, CheckCircle2, MapPin, Code
} from "lucide-react";
import { getValidSession } from "./utils/session";
import LmsTracking3D from "./components/LmsTracking3D";

const COURSE_CATEGORIES = [
  { title: "Project Management", desc: "PRINCE2®, MoP®, MSP® and P3O® pathways, from Foundation to Practitioner.", icon: Briefcase },
  { title: "IT Service Management", desc: "ITIL® and service excellence programmes designed for the workplace.", icon: Layers },
  { title: "Scrum and Agile", desc: "Agile delivery practices for modern teams, with lessons, materials and assessments.", icon: Zap },
  { title: "ISO", desc: "ISO certifications across security, quality and business continuity.", icon: Lock },
  { title: "Governance, Risk and Compliance", desc: "Credentials that strengthen controls, assurance and accountability.", icon: Scale },
  { title: "Six Sigma and Quality", desc: "Quality and continuous improvement programmes for measurable results.", icon: Target },
  { title: "Data Science and AI", desc: "Data and AI pathways for emerging skills, with hands-on practice.", icon: Cpu },
  { title: "DevOps", desc: "DevOps practices that connect delivery speed with operational reliability.", icon: Code2 },
];

const LMS_FEATURES = [
  { title: "Lessons and recordings", desc: "Join live sessions, watch recordings and continue exactly where you left off.", icon: Video },
  { title: "Progress dashboard", desc: "See completion, attendance and certification milestones in one view.", icon: BarChart3 },
  { title: "Assignments and assessments", desc: "Submit your work and complete assessments set by your instructors.", icon: FileCheck },
  { title: "Practice and Code Arena", desc: "Build exam confidence and hands-on skill with practice exercises and coding challenges in your browser.", icon: Code },
  { title: "Course materials", desc: "Curated materials and downloads in every module, ready for revision and the workplace.", icon: FolderOpen },
  { title: "Certificates and next steps", desc: "Track your certification progress and get clear guidance on what to take next.", icon: Award },
];

const HOW_STEPS = [
  { n: "01", title: "Log in.", desc: "Sign in securely with your KOMBAN Learning Hub credentials." },
  { n: "02", title: "Open your courses.", desc: "Find your enrolled programmes, lessons, materials and upcoming sessions in one place." },
  { n: "03", title: "Learn and get certified.", desc: "Attend sessions, practise, submit your work and track your progress through to certification." },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  const fadeUp = useMemo(() => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.4 },
  }), [reduceMotion]);

  useEffect(() => {
    const session = getValidSession();
    if (!session) return;
    if (session.role === "instructor") { navigate("/dashboard"); return; }
    if (session.role === "student") navigate("/student-dashboard");
  }, [navigate]);

  const goLogin = () => {
    setMobileOpen(false);
    navigate("/login");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="komban-landing min-h-screen w-full overflow-x-hidden selection:bg-[#C09A2E]/30 selection:text-[#0A0A0A]">
      <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#C09A2E]">
        <div className="container-k flex items-center justify-between h-16 lg:h-[88px] gap-3">
          <a href="#home" className="flex items-center gap-3 min-w-0" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
            <div className="w-11 h-11 lg:w-16 lg:h-16 bg-white rounded-md flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-[#0A0A0A]" strokeWidth={1.5} aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold uppercase tracking-[0.16em] text-sm lg:text-base">KOMBAN</div>
              <div className="text-[#E8CB63] text-[10px] lg:text-xs uppercase tracking-[0.18em] font-semibold">Learning Hub</div>
            </div>
          </a>

          <div className="flex items-center gap-2 lg:gap-3">
            <button type="button" onClick={() => navigate("/admin-login")} className="hidden sm:flex p-2 text-white/25 hover:text-[#C09A2E] transition-colors" aria-label="Admin access">
              <Shield size={16} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={goLogin} className="btn-login-outline hidden md:inline-flex text-sm">
              Log in
            </button>
            <button type="button" onClick={goLogin} className="btn-gold hidden md:inline-flex !py-3 !px-6 text-sm">
              Enrol Now
            </button>
            <button type="button" className="lg:hidden p-2 text-white" onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-[#C09A2E]/40"
            >
              <div className="container-k py-4 flex flex-col gap-2">
                <button type="button" onClick={goLogin} className="btn-login-outline w-full py-3">Log in</button>
                <button type="button" onClick={goLogin} className="btn-gold w-full py-3">Enrol Now</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="bg-white section-pad overflow-x-clip" aria-labelledby="hero-heading">
          <div className="container-k grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="text-left">
              <p className="eyebrow mb-5">KOMBAN Learning Hub</p>
              <h1 id="hero-heading" className="heading-dark text-[40px] lg:text-[64px] font-bold tracking-tight mb-5">
                Learn. <span className="gold-text">Certify. Perform.</span>
              </h1>
              <p className="text-[#333333] text-base lg:text-lg leading-[1.7] max-w-[560px] mb-8">
                Every live session, recording, assignment and practice tool in one place. Prepare for your exam, apply it at work, and track your progress, anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button type="button" onClick={goLogin} className="btn-primary inline-flex items-center justify-center gap-2">
                  <LogIn size={18} strokeWidth={1.5} aria-hidden /> Log in to Learning Hub
                </button>
                <button type="button" onClick={() => scrollTo("courses")} className="btn-secondary">
                  Explore Courses
                </button>
              </div>
              <p className="text-[#666666] text-sm">Use your KOMBAN account to pick up where you left off.</p>
            </motion.div>

            <motion.div {...fadeUp} className="relative">
              <LmsTracking3D />
              <p className="mt-1 max-w-[520px] mx-auto lg:mx-0 lg:-ml-6 xl:-ml-10 text-center text-sm text-[#555555]">Track every course, assignment and certificate in one dashboard.</p>
            </motion.div>
          </div>
        </section>

        {/* Trust */}
        <section className="bg-[#FAF8F2] border-y border-[#E9E2CC]" aria-label="Learning Hub highlights">
          <div className="container-k py-8 lg:py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left sm:text-center">
            {[
              { value: "5,000+", label: "Professionals trained" },
              { value: "75+", label: "Certification programmes" },
              { value: "24/7", label: "Learning Hub access" },
            ].map((item) => (
              <div key={item.label}>
                <div className="heading-dark text-[28px] lg:text-[36px] font-bold font-['Poppins'] leading-none mb-2">{item.value}</div>
                <div className="text-[#9A7B1F] text-[13px] uppercase tracking-[0.15em] font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Course areas */}
        <section id="courses" className="bg-white section-pad" aria-labelledby="courses-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-10 lg:mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">Certification Programmes</p>
              <h2 id="courses-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold mb-3">Globally recognised certifications, all in one place</h2>
              <p className="text-[#333333] text-base lg:text-lg">Exam-ready programmes built for the workplace. Log in to open your courses or enrol in a new one.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {COURSE_CATEGORIES.map((c) => {
                const Icon = c.icon;
                return (
                  <motion.button
                    key={c.title}
                    type="button"
                    {...fadeUp}
                    onClick={goLogin}
                    className="text-left bg-white border border-[#E9E2CC] rounded-[14px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C09A2E] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  >
                    <Icon className="text-[#C09A2E] mb-4" size={26} strokeWidth={1.5} aria-hidden />
                    <h3 className="heading-dark text-base font-semibold mb-2">{c.title}</h3>
                    <p className="text-[#333333] text-sm leading-relaxed mb-4">{c.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[#9A7B1F] text-sm font-medium">
                      Log in to enrol <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* LMS features */}
        <section id="features" className="bg-[#FAF8F2] section-pad" aria-labelledby="features-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-10 lg:mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">The Learning Hub</p>
              <h2 id="features-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold">Everything you need to learn and certify</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LMS_FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} {...fadeUp} className="bg-white border border-[#E9E2CC] rounded-[14px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <Icon className="text-[#C09A2E] mb-4" size={28} strokeWidth={1.5} aria-hidden />
                    <h3 className="heading-dark text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-[#333333] text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-white section-pad" aria-labelledby="how-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">How it works</p>
              <h2 id="how-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold">Three steps to certification</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-[#C09A2E]/45" aria-hidden />
              {HOW_STEPS.map((s) => (
                <motion.div key={s.n} {...fadeUp} className="text-left relative">
                  <div className="text-[44px] font-bold gold-text font-['Poppins'] mb-2">{s.n}</div>
                  <h3 className="heading-dark text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-[#333333] text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A0A0A] section-pad" aria-labelledby="cta-heading">
          <div className="container-k text-left lg:text-center max-w-3xl lg:mx-auto">
            <motion.div {...fadeUp}>
              <p className="eyebrow eyebrow-on-dark mb-4">Ready when you are</p>
              <h2 id="cta-heading" className="heading-light text-[30px] lg:text-[40px] font-bold mb-4">Your next certification starts here</h2>
              <p className="text-[#D0D0D0] text-base lg:text-lg leading-relaxed mb-8">
                Log in to your KOMBAN Learning Hub to learn, practise and track your progress. Need help with access? Contact support@kombangroup.com.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-center">
                <button type="button" onClick={goLogin} className="btn-gold inline-flex items-center justify-center gap-2">
                  <LogIn size={18} strokeWidth={1.5} aria-hidden /> Log in to Learning Hub
                </button>
                <ul className="hidden lg:flex items-center gap-6 text-sm text-[#C8C8C8] sm:ml-4">
                  {["Secure login", "Dashboards for every role", "Progress tracking"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#E8CB63]" strokeWidth={1.5} aria-hidden /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0A0A0A] text-[#C8C8C8] pt-14 lg:pt-16 pb-8 border-t border-[#C09A2E]/30">
        <div className="container-k">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="text-white font-bold uppercase tracking-[0.16em] text-lg mb-2">KOMBAN</div>
              <p className="text-[#E8CB63] text-xs tracking-wide mb-3 leading-relaxed">Learning Hub</p>
              <p className="text-sm leading-relaxed text-[#C8C8C8]">
                Empowering Businesses to Perform, Transform &amp; Grow. The KOMBAN Learning Hub for certification training across India and the UAE.
              </p>
            </div>

            <div>
              <h3 className="!text-[#E8CB63] font-semibold uppercase tracking-[0.15em] text-sm mb-5">India</h3>
              <p className="text-sm leading-relaxed mb-3 flex gap-2">
                <MapPin size={16} className="text-[#C09A2E] flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                Office No 09, Third Floor, Akshaya HQ, OMR, Kazhipattur, Chennai 603103
              </p>
              <p className="text-sm"><a href="tel:+919342202291" className="hover:text-[#E8CB63]">+91 93422 02291</a></p>
              <p className="text-sm"><a href="tel:+919962006587" className="hover:text-[#E8CB63]">+91 99620 06587</a></p>
            </div>

            <div>
              <h3 className="!text-[#E8CB63] font-semibold uppercase tracking-[0.15em] text-sm mb-5">UAE</h3>
              <p className="text-sm leading-relaxed mb-3 flex gap-2">
                <MapPin size={16} className="text-[#C09A2E] flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                Business Center, Sharjah Publishing City Free Zone, Sharjah
              </p>
              <p className="text-sm mb-2"><a href="tel:+971507104095" className="hover:text-[#E8CB63]">+971 50 710 4095</a></p>
              <p className="text-sm">
                <a href="mailto:support@kombangroup.com" className="hover:text-[#E8CB63] transition-colors">support@kombangroup.com</a>
              </p>
            </div>

            <div>
              <h3 className="!text-[#E8CB63] font-semibold uppercase tracking-[0.15em] text-sm mb-5">Learning Hub</h3>
              <ul className="space-y-3 text-sm">
                <li><button type="button" onClick={goLogin} className="hover:text-[#E8CB63] transition-colors">Log in to Learning Hub</button></li>
                <li><button type="button" onClick={() => scrollTo("features")} className="hover:text-[#E8CB63] transition-colors">Features</button></li>
                <li>
                  <a href="https://kombangroup.com" target="_blank" rel="noreferrer" className="hover:text-[#E8CB63] transition-colors">
                    KOMBAN website
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-xs leading-relaxed space-y-4">
            <p className="text-[#A8A8A8]">
              Accredited ITIL® and PRINCE2® training is provided by Ducis Management Consulting Private Limited, accredited by PeopleCert.
              ITIL® is a registered trade mark of AXELOS Limited, used under permission of AXELOS Limited.
              The Swirl logo™ is a trade mark of AXELOS Limited, used under permission of AXELOS Limited. All rights reserved.
              All AXELOS®/PeopleCert trainings are accompanied with certifications. Certification is mandatory.
            </p>
            <p className="text-[#C0C0C0]">© 2026 KOMBAN Consulting Group FZE LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
