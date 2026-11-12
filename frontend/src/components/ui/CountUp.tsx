import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
}

/** Counts from 0 to `value` once, the first time it scrolls into view. */
const CountUp = ({ value, suffix = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {/* Screen readers get the final figure, not the intermediate frames. */}
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {reduceMotion ? value : count}
        {suffix}
      </span>
    </span>
  );
};

export default CountUp;
