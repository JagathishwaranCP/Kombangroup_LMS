import { cn } from "../../utils/cn";

interface ShapeProps {
  /** Position, size and fill, e.g. "left-4 top-4 size-3 bg-electric". */
  className?: string;
}

const shape = "pointer-events-none absolute block";

/** Filled circle: small accent dots and large background circles. */
export const Dot = ({ className }: ShapeProps) => (
  <span aria-hidden="true" className={cn(shape, "rounded-full", className)} />
);

/** Top half of a circle. Set the width; the height follows. */
export const HalfCircle = ({ className }: ShapeProps) => (
  <span aria-hidden="true" className={cn(shape, "aspect-[2/1] rounded-t-full", className)} />
);

/** Quarter circle whose curve faces top-right. Set the size. */
export const QuarterCircle = ({ className }: ShapeProps) => (
  <span aria-hidden="true" className={cn(shape, "aspect-square rounded-tr-full", className)} />
);

/** Soft blue-to-indigo glow that sits behind the hero student. */
export const BlobGradient = ({ className }: ShapeProps) => (
  <span aria-hidden="true" className={cn(shape, "rounded-full bg-hero-glow", className)} />
);
