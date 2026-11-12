import { cn } from "../../utils/cn";

/**
 * Hand-drawn blue loop around a word. Place inside a `relative inline-block`
 * wrapper; it overflows the word by about 12px on each side.
 */
const HandDrawnEllipse = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 200 80"
    preserveAspectRatio="none"
    fill="none"
    className={cn(
      "pointer-events-none absolute -left-3 -top-1 h-[calc(100%+0.5rem)] w-[calc(100%+1.5rem)] -rotate-3 text-electric-light",
      className,
    )}
  >
    <path
      d="M22 46C14 22 68 6 118 8c44 2 74 16 70 37-4 20-56 29-106 27C40 70 6 60 13 40 18 26 52 13 100 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default HandDrawnEllipse;
