import { cn } from "../../utils/cn";

interface DotGridProps {
  cols: number;
  rows: number;
  /** Distance between dot centres, in px. */
  gap?: number;
  /** Dot radius, in px. */
  radius?: number;
  /** Position plus a text colour class; dots are drawn in currentColor. */
  className?: string;
}

/** Grid of dots. Use a small gap and radius for a halftone square. */
const DotGrid = ({ cols, rows, gap = 18, radius = 3, className }: DotGridProps) => (
  <span
    aria-hidden="true"
    className={cn("pointer-events-none absolute block", className)}
    style={{
      width: cols * gap,
      height: rows * gap,
      backgroundImage: `radial-gradient(circle, currentColor ${radius}px, transparent ${radius + 0.5}px)`,
      backgroundSize: `${gap}px ${gap}px`,
    }}
  />
);

export default DotGrid;
