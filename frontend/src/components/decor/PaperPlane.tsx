import { Send } from "lucide-react";
import { cn } from "../../utils/cn";

interface PaperPlaneProps {
  /** Position and size of the plane. */
  className?: string;
  /** Rotation etc. for the icon; kept off the wrapper so it survives the drift animation. */
  iconClassName?: string;
}

const PaperPlane = ({ className, iconClassName }: PaperPlaneProps) => (
  <span aria-hidden="true" className={cn("pointer-events-none absolute block animate-drift text-white", className)}>
    <Send className={cn("h-full w-full", iconClassName)} strokeWidth={1.5} />
  </span>
);

export default PaperPlane;
