import { cn } from "../../utils/cn";

const OutlineTriangle = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 64 60"
    fill="none"
    className={cn("pointer-events-none absolute", className)}
  >
    <path d="M32 5 59 55H5z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

export default OutlineTriangle;
