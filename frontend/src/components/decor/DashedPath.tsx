import { cn } from "../../utils/cn";

interface DashedPathProps {
  /** Curve drawn inside a 150×90 viewBox. */
  d: string;
  className?: string;
}

/** Dashed white flight path; pair it with a PaperPlane at one end. */
const DashedPath = ({ d, className }: DashedPathProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 150 90"
    fill="none"
    className={cn("pointer-events-none absolute text-white", className)}
  >
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" strokeLinecap="round" />
  </svg>
);

export default DashedPath;
