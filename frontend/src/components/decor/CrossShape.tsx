import { cn } from "../../utils/cn";

/** Soft "×" mark. */
const CrossShape = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 40"
    fill="none"
    className={cn("pointer-events-none absolute", className)}
  >
    <path d="M7 7l26 26M33 7 7 33" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
  </svg>
);

export default CrossShape;
