import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Award, BookOpen, CheckCircle2, type LucideIcon } from "lucide-react";

const TARGET = 76;
const RING_LAYERS = 6; // stacked layers give the ring real thickness in 3D

type Chip = {
  label: string;
  value: string;
  pct: number;
  icon: LucideIcon;
  style: CSSProperties;
  z: number;
  delay: number;
};

const CHIPS: Chip[] = [
  { label: "Courses", value: "8 active", pct: 72, icon: BookOpen, style: { top: "9%", left: "5%" }, z: 70, delay: 0 },
  { label: "Assignments", value: "12 / 16 done", pct: 75, icon: CheckCircle2, style: { top: "62%", right: "7%" }, z: 80, delay: 0.5 },
  { label: "Certificates", value: "3 earned", pct: 60, icon: Award, style: { bottom: "10%", left: "6%" }, z: 55, delay: 1 },
];

const PARTICLES = [
  { top: "14%", left: "48%", z: 40, size: 6, delay: 0 },
  { top: "26%", left: "84%", z: 20, size: 4, delay: 0.6 },
  { top: "62%", left: "90%", z: 60, size: 5, delay: 1.2 },
  { top: "84%", left: "56%", z: 30, size: 4, delay: 0.3 },
  { top: "72%", left: "30%", z: 80, size: 6, delay: 0.9 },
  { top: "40%", left: "16%", z: 15, size: 4, delay: 1.5 },
];

const LmsTracking3D = () => {
  const reduceMotion = !!useReducedMotion();
  const [pct, setPct] = useState(reduceMotion ? TARGET : 0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // pointer parallax (springy tilt of the whole stage)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tiltX = useSpring(rx, { stiffness: 60, damping: 18 });
  const tiltY = useSpring(ry, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(0, TARGET, {
      duration: 1.8,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPct(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduceMotion]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    rx.set(-ny * 10);
    ry.set(nx * 14);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const ringBg = `conic-gradient(from 0deg, #9A7B1F 0%, #E8CB63 ${pct * 0.6}%, #C09A2E ${pct}%, rgba(192,154,46,0.14) ${pct}% 100%)`;
  const ringMask = "radial-gradient(circle, transparent 61%, #000 62%)";

  return (
    <div
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="lms-scene relative w-full max-w-[520px] mx-auto lg:mx-0 lg:-ml-6 xl:-ml-10 aspect-[4/3] overflow-visible select-none [perspective:1100px]"
      aria-hidden
    >
      {/* soft glow — no box */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(192,154,46,0.16),rgba(232,203,99,0.05)_42%,transparent_66%)]" />

      {/* pointer-tilted stage */}
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateX: tiltX, rotateY: tiltY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* idle drift */}
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={reduceMotion ? undefined : { rotateY: [-9, 9, -9], rotateX: [10, 14, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          initial={{ rotateX: 12, rotateY: -9 }}
        >
          {/* floor orbit (lies flat) */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-[76%] aspect-square -ml-[38%] -mt-[38%] rounded-full border-[1.5px] border-dashed border-[#C09A2E]/70 [transform-style:preserve-3d]"
            style={{ rotateX: 72, translateZ: -40 }}
            animate={reduceMotion ? undefined : { rotateZ: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 -top-1.5 -ml-1.5 w-3 h-3 rounded-full bg-[#E8CB63] shadow-[0_0_14px_rgba(232,203,99,0.9)]" />
            <span className="absolute left-1/2 -bottom-1 -ml-1 w-2 h-2 rounded-full bg-[#C09A2E]" />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-1/2 w-[58%] aspect-square -ml-[29%] -mt-[29%] rounded-full border border-[#C09A2E]/50"
            style={{ rotateX: 72, translateZ: -20 }}
            animate={reduceMotion ? undefined : { rotateZ: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -right-1 top-1/2 -mt-1 w-2 h-2 rounded-full bg-[#9A7B1F]" />
          </motion.div>

          {/* 3D progress ring with thickness */}
          <div className="absolute left-1/2 top-1/2 w-[46%] aspect-square -ml-[23%] -mt-[23%] [transform-style:preserve-3d]">
            {Array.from({ length: RING_LAYERS }).map((_, i) => {
              const back = i > 0;
              return (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    transform: `translateZ(${-i * 3}px)`,
                    background: back ? "#8A6E1C" : ringBg,
                    WebkitMaskImage: ringMask,
                    maskImage: ringMask,
                    opacity: back ? 1 - i * 0.08 : 1,
                  }}
                />
              );
            })}
            {/* track glow + readout */}
            <div className="absolute inset-0 rounded-full shadow-[0_28px_50px_-18px_rgba(154,123,31,0.45)] pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "translateZ(24px)" }}>
              <span className="text-[#0A0A0A] font-['Poppins'] font-bold leading-none text-[clamp(26px,6vw,40px)]">{pct}%</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#9A7B1F] font-semibold">Complete</span>
              <span className="mt-2 flex items-center gap-1.5 text-[10px] text-[#555555]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8CB63] animate-pulse" />
                Live sync
              </span>
            </div>
          </div>

          {/* floating tracking chips */}
          {CHIPS.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                className="absolute w-[34%] min-w-[112px] rounded-xl bg-[#0A0A0A] border border-[#C09A2E]/60 px-3 py-2 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)]"
                style={{ ...c.style, translateZ: c.z }}
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#C09A2E]/15 border border-[#C09A2E]/40">
                    <Icon size={12} className="text-[#E8CB63]" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#C09A2E] font-semibold leading-none">{c.label}</p>
                    <p className="text-[11px] text-white font-medium leading-tight mt-0.5 truncate">{c.value}</p>
                  </div>
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#9A7B1F,#E8CB63,#C09A2E)]"
                    initial={{ width: reduceMotion ? `${c.pct}%` : 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 1.3, delay: 0.7 + c.delay * 0.4, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* depth particles */}
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#C09A2E]"
              style={{ top: p.top, left: p.left, width: p.size, height: p.size, translateZ: p.z, opacity: 0.55 }}
              animate={reduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LmsTracking3D;
