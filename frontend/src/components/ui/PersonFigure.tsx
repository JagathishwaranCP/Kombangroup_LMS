import type { ImageAsset } from "../../data/content";
import { cn } from "../../utils/cn";

interface PersonFigureProps {
  image: ImageAsset;
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean;
  className?: string;
}

/**
 * Person image that stands on a glow or blob. Transparent cut-outs render
 * as-is; plain photos are clipped to an arch so they still read as a figure.
 */
const PersonFigure = ({ image, priority = false, className }: PersonFigureProps) => (
  <img
    src={image.src}
    alt={image.alt}
    width={image.width}
    height={image.height}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
    className={cn(
      image.cutout
        ? "object-contain object-bottom"
        : // 150px is half the widest figure (300px). A larger value such as
          // `rounded-t-full` would make the browser shrink the bottom radius to nothing.
          "rounded-b-[28px] rounded-t-[150px] object-cover object-top",
      className,
    )}
  />
);

export default PersonFigure;
