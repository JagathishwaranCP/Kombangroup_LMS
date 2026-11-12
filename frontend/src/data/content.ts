/**
 * All copy and asset references for the landing page (src/HomePage.tsx).
 *
 * Photos are royalty-free Unsplash placeholders. The comment beside each one
 * names the /public/images file from the build spec that should replace it.
 */
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  BookOpen,
  ClipboardCheck,
  Globe,
  GraduationCap,
  Lightbulb,
  Search,
  UserCheck,
} from "lucide-react";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Set to true once a transparent cut-out PNG replaces the stock photo.
   * Cut-outs render unmasked; plain photos are clipped to an arch.
   */
  cutout?: boolean;
}

export interface LinkItem {
  label: string;
  href: string;
}

const photo = (id: string, width: number, height: number, faces = false) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop${faces ? "&crop=faces" : ""}&w=${width}&h=${height}&q=70`;

const avatar = (id: string, alt: string): ImageAsset => ({
  src: photo(id, 112, 112, true),
  alt,
  width: 112,
  height: 112,
});

/* ------------------------------------------------------------------ brand */

const SUPPORT_EMAIL = "support@cloudconnekt.com";
const WHATSAPP_NUMBER = "919342202291";

export const brand = {
  name: "Cloud ConneKt",
  homeLabel: "Cloud ConneKt home",
  description:
    "Cloud ConneKt is an online learning platform for upskilling and certification. Learn from experts, practise with real exam-style tests and earn credentials that move your career forward.",
};

export const skipLink = "Skip to main content";

/* ----------------------------------------------------------------- navbar */

export const nav = {
  cta: { label: "Start Learning", to: "/login" },
};

/* ------------------------------------------------------------------- hero */

export const hero = {
  tag: "Smarter learning, powered online",
  title: {
    line1: "Upgrade Your Skills.",
    line2: "Get",
    line2Accent: "Grow Your Career.",
    circled: "Certified.",
  },
  description:
    "Expert-led online courses, practice exams and globally recognised certifications, all in one learning platform. Learn at your own pace, on any device, and earn credentials that employers trust.",
  cta: { label: "Explore now", to: "/login" },
  // /images/hero-student.png (keep this URL in sync with the preload in index.html)
  image: {
    src: photo("1544717305-2782549b5136", 600, 880),
    alt: "Smiling student holding an orange notebook",
    width: 600,
    height: 880,
  } satisfies ImageAsset,
  stickers: {
    notebook: "/images/hero-notebook.svg",
    books: "/images/hero-books.svg",
    pencils: "/images/hero-pencils.svg",
  },
};

/* ----------------------------------------------------------- achievements */

export interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

export const achievements = {
  tag: "Our Impact",
  title: ["Learners Who Grew With Us"],
  description:
    "Learners across India, the UAE, the UK, Canada, Nepal and beyond use Cloud ConneKt to build new skills, pass certification exams and move ahead in their careers.",
  stats: [
    { icon: ClipboardCheck, value: 10, suffix: "K+", label: "Learners Trained" },
    { icon: Award, value: 95, suffix: "%", label: "Exam Pass Rate" },
    { icon: BadgeCheck, value: 50, suffix: "+", label: "Expert-Led Courses" },
    { icon: Globe, value: 15, suffix: "+", label: "Countries Reached" },
  ] satisfies Stat[],
};

/* ------------------------------------------------------- featured courses */

export interface Course {
  title: string;
  category: string;
  /** Full meta phrase, e.g. "24 Lessons". Empty when the copy gives no lesson count. */
  lessons: string;
  students: string;
  /** Empty when this catalogue entry has no rating in the copy. */
  rating: number | string;
  image: ImageAsset;
}

const courseImage = {
  tutoring: {
    src: photo("1551836022-d5d88e9218df", 640, 480),
    alt: "Two women in a tutoring session with a laptop",
    width: 640,
    height: 480,
  },
  classroom: {
    src: photo("1588072432836-e10032774350", 640, 480),
    alt: "Child writing in a workbook at a classroom desk",
    width: 640,
    height: 480,
  },
  laptop: {
    src: photo("1513258496099-48168024aec0", 640, 480),
    alt: "Man with headphones studying at a laptop",
    width: 640,
    height: 480,
  },
} satisfies Record<string, ImageAsset>;

export const featuredCourses = {
  tag: "Featured Courses",
  title: ["Learn In-Demand Skills.", "Explore Our Courses."],
  cta: { label: "View All Courses", to: "/login" },
  explore: { label: "Explore", to: "/login" },
  meta: { lessons: "", students: "", rating: "Rating" },
  // Sample catalogue entries until the page is fed from the courses API.
  items: [
    {
      title: "ITIL® 4 Foundation",
      category: "Management Frameworks",
      lessons: "24 Lessons",
      students: "Mock Exams",
      rating: "",
      image: courseImage.tutoring,
    },
    {
      title: "PRINCE2® Foundation & Practitioner",
      category: "Management Frameworks",
      lessons: "30 Lessons",
      students: "Mock Exams",
      rating: "",
      image: courseImage.classroom,
    },
    {
      title: "PRINCE2 Agile®",
      category: "Management Frameworks",
      lessons: "",
      students: "Mock Exams",
      rating: "",
      image: courseImage.laptop,
    },
  ] satisfies Course[],
};

/* ------------------------------------------------------------------ about */

export const about = {
  tag: "About Cloud ConneKt",
  title: ["Learning That Leads", "to Real Results"],
  description:
    "Cloud ConneKt is an online learning platform built for professionals and students who want to grow. We bring together experienced trainers, carefully structured courses and certification-focused practice, so you don’t just learn the topic, you prove it.",
  badge: { value: "15+", label: "Years of Training Experience" },
  features: [
    {
      icon: UserCheck,
      title: "World-Class Faculty",
      description: "Learn from accomplished trainers who know their subject deeply.",
    },
    {
      icon: Lightbulb,
      title: "Cutting-Edge Curriculum",
      description: "Study material designed by experts and kept up to date with the latest exam syllabus.",
    },
    {
      icon: BadgeCheck,
      title: "Trusted, Accredited Content",
      description: "Certification training aligned with official bodies such as AXELOS® / PeopleCert.",
    },
  ],
  cta: { label: "Learn More About Us", href: "#process" },
  // /images/instructor.png
  image: {
    src: photo("1560250097-0b93528c311a", 720, 900),
    alt: "Instructor in a dark suit and glasses",
    width: 720,
    height: 900,
  } satisfies ImageAsset,
};

/* -------------------------------------------------------- working process */

export const workingProcess = {
  tag: "How It Works",
  title: ["Your Path From Learning", "to Certification"],
  description:
    "Getting certified with Cloud ConneKt is simple. Pick a course, learn your way and earn a credential that shows what you know.",
  steps: [
    {
      icon: Search,
      title: "Choose Your Course",
      description: "Browse courses by skill, category or certification and pick the one that fits your goals.",
    },
    {
      icon: BookOpen,
      title: "Learn at Your Own Pace",
      description: "Watch training videos, download study materials and join live sessions, on web or mobile.",
    },
    {
      icon: ClipboardCheck,
      title: "Practise & Prepare",
      description: "Test yourself with chapter-wise quizzes, assignments and full-length mock exams.",
    },
    {
      icon: GraduationCap,
      title: "Get Certified",
      description: "Take your exam with confidence and earn a certificate you can share with employers and on LinkedIn.",
    },
  ],
  // /images/process-student.png
  image: {
    // `rect` crops the stock photo in to the person (x, y, width, height as ratios).
    src: `${photo("1517841905240-472988babdf9", 600, 880)}&rect=0.1,0.24,0.76,0.75`,
    alt: "Smiling student in a denim jacket looking to the left",
    width: 600,
    height: 880,
  } satisfies ImageAsset,
  reviewCard: {
    value: "4.8/5",
    label: "",
    caption: "average learner rating",
    avatars: [
      avatar("1438761681033-6461ffad8d80", ""),
      avatar("1500648767791-00dcc994a43e", ""),
      avatar("1573497019940-1c28c88b4f3e", ""),
    ],
  },
  chart: {
    title: "Weekly Learning Hours",
    summary: "Bar chart of hours spent learning on each day of the week",
    bars: [
      { day: "S", hours: 3 },
      { day: "M", hours: 6 },
      { day: "T", hours: 4.5 },
      { day: "W", hours: 8 },
      { day: "T", hours: 5 },
      { day: "F", hours: 7 },
      { day: "S", hours: 2.5 },
    ],
  },
};

/* ----------------------------------------------------------- live classes */

export interface LiveClass {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  /** Schedule line, e.g. "Sat, 10:00 AM IST". */
  lessons: string;
  viewers: string;
  host: { name: string; role: string; avatar: ImageAsset };
  thumb: ImageAsset;
  image: ImageAsset;
}

const liveImage = (id: string, alt: string) => ({
  // /images/live-N.jpg
  thumb: { src: photo(id, 160, 128), alt: "", width: 160, height: 128 },
  // /images/live-main.jpg
  image: { src: photo(id, 960, 600), alt, width: 960, height: 600 },
});

export const liveClasses = {
  tag: "Live Classes",
  title: ["Join Upcoming Live Sessions", "With Expert Trainers"],
  description:
    "Learn in real time, ask questions and get your doubts cleared live. Every session is recorded, so you never miss a thing.",
  listLabel: "Scheduled live classes",
  liveBadge: "LIVE",
  ratingLabel: "Rating",
  lessonsLabel: "",
  items: [
    {
      id: "itil-4-crash-course",
      title: "ITIL® 4 Foundation",
      subtitle: "Exam Crash Course",
      rating: 4.9,
      lessons: "All levels · Sat, 10:00 AM IST",
      viewers: "128 watching",
      host: {
        name: "Priya Natarajan",
        role: "Host",
        avatar: avatar("1573496359142-b8d87734a5a2", "Priya Natarajan"),
      },
      ...liveImage("1516534775068-ba3e7458af70", "Student with glasses following a class on her laptop"),
    },
    {
      id: "prince2-practitioner",
      title: "PRINCE2® Practitioner",
      subtitle: "Case Study Workshop",
      rating: 4.8,
      lessons: "Intermediate · Sun, 11:00 AM IST",
      viewers: "128 watching",
      host: {
        name: "Sara Al Hashimi",
        role: "Host",
        avatar: avatar("1580489944761-15a19d654956", "Sara Al Hashimi"),
      },
      ...liveImage("1580894732444-8ecded7900cd", "Teacher explaining a lesson at a whiteboard"),
    },
    {
      id: "cloud-fundamentals",
      title: "Cloud Computing Fundamentals",
      subtitle: "Live Q&A",
      rating: 4.8,
      lessons: "Beginners · Wed, 7:00 PM IST",
      viewers: "128 watching",
      host: {
        name: "Arjun Mehta",
        role: "Host",
        avatar: avatar("1560250097-0b93528c311a", "Arjun Mehta"),
      },
      ...liveImage("1531482615713-2afd69097998", "Learners working together around a laptop"),
    },
  ] satisfies LiveClass[],
};

/* ----------------------------------------------------------- testimonials */

export interface Testimonial {
  name: string;
  role?: string;
  origin: string;
  quote: string;
  avatar: ImageAsset;
  portrait: ImageAsset;
}

const person = (id: string, alt: string) => ({
  // /images/testimonial-N.jpg
  avatar: avatar(id, alt),
  portrait: { src: photo(id, 680, 680, true), alt, width: 680, height: 680 },
});

const testimonialItems: Testimonial[] = [
  {
    name: "Ashish Sinha",
    origin: "Learner from India",
    quote:
      "Well planned and structured course, which made it very easy to understand and comprehend.",
    ...person("1507003211169-0a1dd7228f2d", "Portrait of Ashish Sinha"),
  },
  {
    name: "Dhristy Mishra",
    origin: "Learner from Nepal",
    quote: "This course made it very easy for me to clear the exam and get certified.",
    ...person("1529470839332-78ad660a6a82", "Portrait of Dhristy Mishra"),
  },
  {
    name: "Kartrina Kaur",
    origin: "Learner from Canada",
    quote:
      "Simple and understandable videos. The course was crafted very well and the trainers were easily reachable.",
    ...person("1494790108377-be9c29b29330", "Portrait of Kartrina Kaur"),
  },
  {
    name: "Pankaj Sharma",
    origin: "Learner from UK",
    quote:
      "It was a great experience to learn about Cloud Computing and the reliable technology backing for the service. Thanks to the tutor for the easiest way of teaching.",
    ...person("1500648767791-00dcc994a43e", "Portrait of Pankaj Sharma"),
  },
];

export const testimonials = {
  tag: "Testimonials",
  title: ["What Our Learners Say"],
  switcherLabel: "Choose a testimonial",
  showLabel: "Show testimonial from",
  items: testimonialItems,
};

/* -------------------------------------------------------------------- cta */

export const cta = {
  title: "Ready to Upgrade Your Skills and Get",
  titleAccent: "Certified?",
  description:
    "Join thousands of learners building their careers with Cloud ConneKt. Get course updates, free resources and exclusive offers straight to your inbox.",
  form: {
    label: "Email address",
    placeholder: "Enter your email address",
    button: "Get Started",
  },
};

/* ----------------------------------------------------------------- footer */

export type SocialNetwork = "facebook" | "instagram" | "x" | "linkedin" | "youtube";

export const footer = {
  // Placeholder destinations: replace "#" with the real profile and page URLs.
  socials: [
    { network: "facebook", label: "Facebook", href: "#" },
    { network: "instagram", label: "Instagram", href: "#" },
    { network: "x", label: "X", href: "#" },
    { network: "linkedin", label: "LinkedIn", href: "#" },
    { network: "youtube", label: "YouTube", href: "#" },
  ] satisfies { network: SocialNetwork; label: string; href: string }[],
  rights: "A brand of Komban Consulting Private Limited. All rights reserved.",
  legalLabel: "Legal",
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Contact Us", href: `mailto:${SUPPORT_EMAIL}` },
  ] satisfies LinkItem[],
};

/* ------------------------------------------------------- floating contact */

export const floatingContact = {
  label: "Contact us",
  href: `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`,
};
