import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Shield, ArrowRight, ChevronDown,
  GraduationCap, ClipboardCheck, BookOpen, ShieldCheck,
  Smartphone, Bell, MessagesSquare, Wallet,
  Code2, Briefcase, Palette, Megaphone,
  LogIn, MapPin, Quote, Users
} from "lucide-react";
import { getValidSession } from "./utils/session";
import BrandLogo from "./components/BrandLogo";

const KEY_BENEFITS = [
  { title: "Expert faculty", desc: "Learn from experienced instructors with strong subject knowledge.", icon: GraduationCap },
  { title: "Quizzes & assignments", desc: "Practice with chapter quizzes and assignments to strengthen concepts.", icon: ClipboardCheck },
  { title: "Practical curriculum", desc: "Course material built by industry practitioners for real workplace use.", icon: BookOpen },
  { title: "Reliable content", desc: "Clear, structured lessons you can trust throughout your program.", icon: ShieldCheck },
  { title: "Learn anytime, anywhere", desc: "Access the Learning Hub on any device and study when it suits you.", icon: Smartphone },
  { title: "Alerts & updates", desc: "Get notified when sessions, content, or course updates go live.", icon: Bell },
  { title: "Discussion support", desc: "Reach instructors and peers through messages when you need help.", icon: MessagesSquare },
  { title: "Clear pricing", desc: "Straightforward fee plans with no hidden charges.", icon: Wallet },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=60";

const COURSE_CATEGORIES = [
  {
    n: "01",
    title: "Development & IT",
    desc: "Web development, data science, cybersecurity, and cloud. Our most requested category.",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=60",
  },
  {
    n: "02",
    title: "Business & Management",
    desc: "Project management, entrepreneurship, finance, and leadership.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=640&q=60",
  },
  {
    n: "03",
    title: "Design & Creative",
    desc: "UI/UX, graphic design, video editing, and photography.",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=640&q=60",
  },
  {
    n: "04",
    title: "Marketing & Sales",
    desc: "Digital marketing, SEO, social media, and sales skills.",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&q=60",
  },
];

const ATMOSPHERE_IMAGES = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=640&q=60",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=640&q=60",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=640&q=60",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=640&q=60",
];

const HOW_STEPS = [
  {
    n: "01",
    title: "Log in",
    desc: "Sign in with your CloudConnekt Learning Hub account.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=640&q=60",
  },
  {
    n: "02",
    title: "Choose a course",
    desc: "Browse categories, enroll in a program, and open your lessons.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=640&q=60",
  },
  {
    n: "03",
    title: "Learn and get certified",
    desc: "Join sessions, complete assignments, and track your path to certification.",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=640&q=60",
  },
];

const TESTIMONIALS = [
  {
    quote: "The course was well-planned and structured. Concepts were easy to follow.",
    name: "Ashish Sinha",
    place: "Learner from India",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=60",
  },
  {
    quote: "This course helped me clear the exam and get certified with confidence.",
    name: "Dhristy Mishra",
    place: "Learner from Nepal",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=60",
  },
  {
    quote: "Clear videos, a well-designed course, and trainers who were easy to reach.",
    name: "Katrina Kaur",
    place: "Learner from Canada",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&q=60",
  },
  {
    quote: "A strong learning experience in Cloud Computing. The teaching was clear and practical.",
    name: "Pankaj Sharma",
    place: "Learner from UK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&q=60",
  },
];

const CORPORATE_LOGOS = ["Accenture", "Infosys", "TCS", "Cognizant", "Wipro", "Capgemini", "HCL", "IBM"];

const INSTRUCTORS = [
  {
    name: "Priya Natarajan",
    role: "ITIL® & Service Management",
    bio: "Over 15 years training enterprise teams across India and the Middle East.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=480&h=600&q=60&crop=faces",
  },
  {
    name: "Arjun Mehta",
    role: "Cloud & DevOps",
    bio: "Practitioner focused on lab work and preparing learners for certification exams.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=480&h=600&q=60&crop=faces",
  },
  {
    name: "Sara Al Hashimi",
    role: "Project & Agile Delivery",
    bio: "PRINCE2® and Agile mentor helping professionals apply frameworks on the job.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=480&h=600&q=60&crop=faces",
  },
];

const COACHING_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=60";

const FAQS = [
  {
    q: "How do I access the CloudConnekt Learning Hub?",
    a: "Select Log in and sign in with your Learning Hub credentials. If you need an account, use the sign-up screen or write to support@cloudconnekt.com.",
  },
  {
    q: "Are the courses self-paced or live?",
    a: "Most programs include live sessions, recordings, assignments, and self-paced materials so you can learn when it suits you.",
  },
  {
    q: "Do Axelos® / PeopleCert training programs include certification?",
    a: "Yes. All Axelos® / PeopleCert training programs include certification. Certification is mandatory.",
  },
  {
    q: "Can my company enroll a team?",
    a: "Yes. CloudConnekt supports corporate enrollments and cohort learning. Email support@cloudconnekt.com for a team plan.",
  },
  {
    q: "Where can I get help if I cannot log in?",
    a: "Call +91 93422 02291 or email support@cloudconnekt.com. Our team will help restore access.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const benefitsPausedRef = useRef(false);
  const benefitsResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep content visible immediately — no fade-in delay on text
  const fadeUp = useMemo(() => ({
    initial: false as const,
  }), []);

  const staggerContainer = useMemo(() => ({
    initial: "show" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.15 },
  }), []);

  const staggerItem = useMemo(() => ({
    hidden: { opacity: 1, y: 0 },
    show: { opacity: 1, y: 0 },
  }), []);

  useEffect(() => {
    const session = getValidSession();
    if (!session) return;
    if (session.role === "instructor") { navigate("/dashboard"); return; }
    if (session.role === "student") navigate("/student-dashboard");
  }, [navigate]);

  // Warm the browser cache for above-the-fold and early section images
  useEffect(() => {
    const urls = [
      HERO_IMAGE,
      ...COURSE_CATEGORIES.map((c) => c.image),
      ...ATMOSPHERE_IMAGES,
    ];
    urls.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, []);

  // Auto-scroll + manual scroll for Key Benefits
  useEffect(() => {
    const el = benefitsRef.current;
    if (!el || reduceMotion) return;

    const pauseAuto = () => {
      benefitsPausedRef.current = true;
      if (benefitsResumeTimer.current) clearTimeout(benefitsResumeTimer.current);
      benefitsResumeTimer.current = setTimeout(() => {
        benefitsPausedRef.current = false;
      }, 2500);
    };

    let frame = 0;
    let stopped = false;
    const tick = () => {
      if (stopped) return;
      if (!benefitsPausedRef.current) {
        el.scrollLeft += 0.6;
        const loopAt = el.scrollWidth / 2;
        if (loopAt > 0 && el.scrollLeft >= loopAt) {
          el.scrollLeft -= loopAt;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onWheel = (e: WheelEvent) => {
      pauseAuto();
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    const onPointerDown = () => pauseAuto();
    const onTouchStart = () => pauseAuto();
    const onScroll = () => {
      const loopAt = el.scrollWidth / 2;
      if (loopAt > 0 && el.scrollLeft >= loopAt) {
        el.scrollLeft -= loopAt;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      if (benefitsResumeTimer.current) clearTimeout(benefitsResumeTimer.current);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  const goLogin = () => {
    navigate("/login");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="cc-landing min-h-screen w-full overflow-x-hidden selection:bg-[#5755D9]/25 selection:text-[#091941]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8EAF6] shadow-[0_1px_0_rgba(9,25,65,0.04)]">
        <div className="container-k flex items-center justify-between h-16 lg:h-[78px] gap-3">
          <a href="#home" className="flex items-center min-w-0" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
            <BrandLogo size="md" />
          </a>

          <div className="flex items-center gap-2 lg:gap-3">
            <button type="button" onClick={() => navigate("/admin-login")} className="hidden sm:flex p-2 text-[#091941]/25 hover:text-[#5755D9] transition-colors" aria-label="Admin access">
              <Shield size={16} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={goLogin} className="btn-login-outline hidden md:inline-flex text-sm">
              Log in
            </button>
            <motion.button
              type="button"
              onClick={goLogin}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="btn-primary hidden md:inline-flex !py-3 !px-6 text-sm"
            >
              Enroll Now
            </motion.button>
            <button type="button" className="md:hidden btn-primary !py-2 !px-4 text-sm" onClick={goLogin}>
              Log in
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Hero + CTA */}
        <section id="home" className="relative min-h-[78vh] lg:min-h-[88vh] flex items-end lg:items-center overflow-hidden" aria-labelledby="hero-heading">
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            width={1400}
            height={900}
            decoding="async"
            fetchPriority="high"
            loading="eager"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[#091941]/30" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091941]/82 via-[#091941]/55 to-[#091941]/20" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091941]/70 via-transparent to-transparent" aria-hidden />
          <div className="absolute inset-0 hero-shimmer pointer-events-none" aria-hidden />

          <div className="container-k relative z-10 py-16 lg:py-24 w-full">
            <div className="max-w-2xl text-left overlay-copy">
              <p className="text-white font-bold uppercase tracking-[0.18em] text-sm lg:text-base mb-3">
                CloudConnekt
              </p>
              <h1
                id="hero-heading"
                className="heading-light text-[40px] lg:text-[60px] font-bold tracking-tight mb-4"
              >
                Learning Hub
              </h1>
              <p className="text-[#E8EAF6] text-lg lg:text-xl font-medium mb-4">
                Online learning, built for professionals
              </p>
              <p className="text-white text-base lg:text-lg leading-[1.7] max-w-[540px] mb-8">
                Build skills on your schedule. Live sessions, recordings, assignments, and certifications, all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="button"
                  onClick={goLogin}
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <LogIn size={18} strokeWidth={1.5} aria-hidden /> Log in to Learning Hub
                </motion.button>
                <button type="button" onClick={() => scrollTo("courses")} className="btn-secondary-on-dark">
                  Explore Courses
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key benefits */}
        <section id="benefits" className="bg-[#F7F8FC] section-pad overflow-hidden" aria-labelledby="benefits-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-10 lg:mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">Platform features</p>
              <h2 id="benefits-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold mb-3">
                Key benefits of the Learning Hub
              </h2>
              <p className="text-[#50596C] text-base lg:text-lg">
                Tools to learn, practice, and certify, built on CloudConnekt’s eLearning experience.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#F7F8FC] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#F7F8FC] to-transparent z-10" />
            <div
              ref={benefitsRef}
              className="benefits-scroll px-4 sm:px-8 flex gap-4 overflow-x-auto overscroll-x-contain"
              tabIndex={0}
              role="region"
              aria-label="Key benefits of the Learning Hub"
            >
              {[...KEY_BENEFITS, ...KEY_BENEFITS].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={`${b.title}-${i}`}
                    className="shrink-0 w-[260px] sm:w-[300px] bg-white border border-[#E8EAF6] rounded-[14px] p-5 shadow-[0_8px_30px_rgba(9,25,65,0.04)]"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-[#EEF0FF] flex items-center justify-center mb-4 ${reduceMotion ? "" : "benefits-icon-pulse"}`}
                      style={reduceMotion ? undefined : { animationDelay: `${(i % KEY_BENEFITS.length) * 0.18}s` }}
                    >
                      <Icon className="text-[#5755D9]" size={26} strokeWidth={1.5} aria-hidden />
                    </div>
                    <h3 className="heading-dark text-sm font-semibold mb-2 uppercase tracking-wide">{b.title}</h3>
                    <p className="text-[#50596C] text-sm leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Featured course categories */}
        <section id="courses" className="bg-white section-pad" aria-labelledby="courses-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-10 lg:mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">Featured categories</p>
              <h2 id="courses-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold mb-3">
                Choose a learning path
              </h2>
              <p className="text-[#50596C] text-base lg:text-lg">
                Browse CloudConnekt’s core learning areas and enroll through the Learning Hub.
              </p>
            </motion.div>
            <motion.div {...staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {COURSE_CATEGORIES.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.button
                    key={c.title}
                    type="button"
                    custom={i}
                    variants={staggerItem}
                    onClick={goLogin}
                    whileHover={reduceMotion ? undefined : { y: -8 }}
                    className="group text-left bg-white border border-[#E8EAF6] rounded-[14px] overflow-hidden shadow-[0_8px_30px_rgba(9,25,65,0.04)] transition-shadow hover:shadow-[0_12px_36px_rgba(87,85,217,0.14)] hover:border-[#5755D9]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={640}
                        height={400}
                        decoding="async"
                        loading={i < 2 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091941]/70 via-[#091941]/20 to-transparent" />
                      <span className="absolute bottom-3 left-4 text-white font-bold font-['Poppins'] text-xl drop-shadow-[0_2px_8px_rgba(9,25,65,0.85)]">{c.n}.</span>
                    </div>
                    <div className="p-5">
                      <Icon className="text-[#5755D9] mb-3" size={22} strokeWidth={1.5} aria-hidden />
                      <h3 className="heading-dark text-lg font-semibold mb-2">{c.title}</h3>
                      <p className="text-[#50596C] text-sm leading-relaxed mb-4">{c.desc}</p>
                      <span className="inline-flex items-center gap-1 text-[#5755D9] text-sm font-medium">
                        Explore courses <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
            <div className="mt-10 flex justify-center">
              <motion.button
                type="button"
                onClick={goLogin}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Explore our courses <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Learning atmosphere band — scrolling images */}
        <section className="relative overflow-hidden py-4" aria-hidden>
          <div className="atmosphere-scroll">
            <div className={`atmosphere-track ${reduceMotion ? "atmosphere-track--static" : ""}`}>
              {[...ATMOSPHERE_IMAGES, ...ATMOSPHERE_IMAGES].map((src, i) => (
                <div key={`${src}-${i}`} className="atmosphere-slide relative shrink-0 overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    width={640}
                    height={480}
                    decoding="async"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-[#091941]/20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. How it works */}
        <section id="how-it-works" className="bg-[#F7F8FC] section-pad" aria-labelledby="how-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">How it works</p>
              <h2 id="how-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold">
                Start in three steps
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="hidden md:block absolute top-[42%] left-[16%] right-[16%] h-px bg-[#5755D9]/25" aria-hidden />
              {HOW_STEPS.map((s) => (
                <div
                  key={s.n}
                  className="text-left relative bg-white border border-[#E8EAF6] rounded-[14px] overflow-hidden shadow-[0_8px_30px_rgba(9,25,65,0.04)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#E8EAF6]">
                    <img
                      src={s.image}
                      alt=""
                      className="w-full h-full object-cover"
                      width={640}
                      height={400}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-[40px] font-bold accent-text font-['Poppins'] mb-1 leading-none">{s.n}</div>
                    <h3 className="heading-dark text-xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-[#50596C] text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Testimonials + logos */}
        <section id="testimonials" className="bg-white section-pad" aria-labelledby="testimonials-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-10 lg:mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">Testimonials</p>
              <h2 id="testimonials-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold mb-3">
                What our learners say
              </h2>
              <p className="text-[#50596C] text-base lg:text-lg">
                Professionals across India, the UAE and beyond use CloudConnekt to upskill and certify.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
              {TESTIMONIALS.map((t) => (
                <blockquote
                  key={t.name}
                  className="bg-[#F7F8FC] border border-[#E8EAF6] rounded-[14px] p-6 text-left"
                >
                  <Quote className="text-[#5755D9] mb-4" size={24} strokeWidth={1.5} aria-hidden />
                  <p className="text-[#091941] text-base leading-relaxed mb-5">“{t.quote}”</p>
                  <footer className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                      width={44}
                      height={44}
                      decoding="async"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold text-[#091941]">{t.name}</div>
                      <div className="text-sm text-[#50596C]">{t.place}</div>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="text-center">
              <p className="eyebrow mb-3">Corporate learners</p>
              <h3 className="heading-dark text-xl lg:text-2xl font-bold mb-3">Learners from leading organizations</h3>
              <p className="text-[#50596C] text-sm lg:text-base max-w-2xl mx-auto mb-8">
                Our learners come from global enterprises and apply what they learn in their day-to-day work.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                {CORPORATE_LOGOS.map((name) => (
                  <div
                    key={name}
                    className="px-5 py-3 rounded-full border border-[#E8EAF6] bg-[#F7F8FC] text-[#091941] text-sm font-semibold tracking-wide"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Instructors */}
        <section id="instructors" className="bg-[#F7F8FC] section-pad" aria-labelledby="instructors-heading">
          <div className="container-k">
            <motion.div {...fadeUp} className="mb-10 lg:mb-12 text-left lg:text-center max-w-2xl lg:mx-auto">
              <p className="eyebrow mb-4">Faculty</p>
              <h2 id="instructors-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold mb-3">
                Meet our instructors
              </h2>
              <p className="text-[#50596C] text-base lg:text-lg">
                Experienced coaches who train learners and guide them towards stronger outcomes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {INSTRUCTORS.map((person) => (
                <article
                  key={person.name}
                  className="group bg-white border border-[#E8EAF6] rounded-[14px] overflow-hidden shadow-[0_8px_30px_rgba(9,25,65,0.04)] text-left"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#E8EAF6]">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover object-[center_20%]"
                      width={480}
                      height={600}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="heading-dark text-lg font-semibold mb-1">{person.name}</h3>
                    <p className="text-[#5755D9] text-sm font-semibold mb-3">{person.role}</p>
                    <p className="text-[#50596C] text-sm leading-relaxed">{person.bio}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[18px] p-8 lg:p-10 text-left lg:text-center">
              <img
                src={COACHING_BANNER_IMAGE}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                width={1200}
                height={600}
                decoding="async"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#091941]/72" />
              <div className="relative z-10 overlay-copy">
                <div className="inline-flex items-center gap-2 text-[#E8EAF6] text-sm font-semibold uppercase tracking-[0.15em] mb-3">
                  <Users size={16} /> Coaching with CloudConnekt
                </div>
                <h3 className="heading-light text-2xl lg:text-3xl font-bold mb-3">Interested in coaching with us?</h3>
                <p className="text-white text-base max-w-2xl lg:mx-auto mb-6">
                  Join the team that trains and mentors learners across CloudConnekt programs.
                </p>
                <a href="mailto:support@cloudconnekt.com" className="btn-primary inline-flex items-center gap-2">
                  Contact support@cloudconnekt.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section id="faq" className="bg-white section-pad" aria-labelledby="faq-heading">
          <div className="container-k max-w-3xl">
            <motion.div {...fadeUp} className="mb-10 text-left lg:text-center">
              <p className="eyebrow mb-4">FAQ</p>
              <h2 id="faq-heading" className="heading-dark text-[30px] lg:text-[40px] font-bold">
                Frequently asked questions
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQS.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="border border-[#E8EAF6] rounded-[14px] bg-[#F7F8FC] overflow-hidden"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                      onClick={() => setOpenFaq(open ? null : idx)}
                      aria-expanded={open}
                    >
                      <span className="heading-dark font-semibold text-sm lg:text-base">{item.q}</span>
                      <ChevronDown size={18} className={`text-[#5755D9] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm text-[#50596C] leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* 9. Footer */}
      <footer className="bg-[#091941] text-[#C5CAE9] pt-14 lg:pt-16 pb-8 border-t border-white/10">
        <div className="container-k">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4 bg-white rounded-lg p-3 inline-block">
                <BrandLogo size="sm" />
              </div>
              <p className="text-[#9FA8DA] text-xs tracking-wide mb-3 leading-relaxed uppercase font-semibold">Learning Hub</p>
              <p className="text-sm leading-relaxed text-[#C5CAE9]">
                eLearning, virtual training, and certification programs. A brand of Komban Consulting Private Limited, India and UAE.
              </p>
            </div>

            <div>
              <h3 className="!text-white font-semibold uppercase tracking-[0.15em] text-sm mb-5">Learning Hub</h3>
              <ul className="space-y-3 text-sm">
                <li><button type="button" onClick={goLogin} className="hover:text-white transition-colors">Log in</button></li>
                <li><button type="button" onClick={() => scrollTo("courses")} className="hover:text-white transition-colors">Courses</button></li>
                <li><button type="button" onClick={() => scrollTo("benefits")} className="hover:text-white transition-colors">Benefits</button></li>
                <li><button type="button" onClick={() => scrollTo("faq")} className="hover:text-white transition-colors">FAQ</button></li>
              </ul>
            </div>

            <div>
              <h3 className="!text-white font-semibold uppercase tracking-[0.15em] text-sm mb-5">Contact</h3>
              <p className="text-sm leading-relaxed mb-3 flex gap-2">
                <MapPin size={16} className="text-[#5755D9] flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                Office No. 09, Third Floor, Akshaya HQ, OMR, Kazhipattur, Chennai 603103, India
              </p>
              <p className="text-sm mb-1"><a href="tel:+919342202291" className="hover:text-white">+91 93422 02291</a></p>
              <p className="text-sm">
                <a href="mailto:support@cloudconnekt.com" className="hover:text-white transition-colors">support@cloudconnekt.com</a>
              </p>
            </div>

            <div>
              <h3 className="!text-white font-semibold uppercase tracking-[0.15em] text-sm mb-5">More</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.cloudconnekt.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    CloudConnekt website
                  </a>
                </li>
                <li><button type="button" onClick={() => scrollTo("instructors")} className="hover:text-white transition-colors">Instructors</button></li>
                <li><button type="button" onClick={() => scrollTo("testimonials")} className="hover:text-white transition-colors">Testimonials</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-xs leading-relaxed space-y-4">
            <p className="text-[#9FA8DA]">
              All Axelos® / PeopleCert training programs are accompanied by certifications. Certification is mandatory.
              Accredited courses and exams are resold on behalf of Ducis Management Consulting Private Limited.
            </p>
            <p className="text-[#C5CAE9]">© {new Date().getFullYear()} CloudConnekt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
