import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

interface SlantedIconPanelProps {
  icon: LucideIcon;
  className?: string;
}

/** Feature icon: pale slanted panel with a blue gradient circle overlapping it. */
const SlantedIconPanel = ({ icon: Icon, className }: SlantedIconPanelProps) => (
  <span aria-hidden="true" className={cn("relative block size-16 shrink-0", className)}>
    <span className="absolute left-0 top-1 block size-14 skew-y-[-6deg] rounded-xl bg-panel" />
    <span className="absolute bottom-0 right-0 grid size-12 place-items-center rounded-full bg-electric-grad text-white shadow-[0_6px_14px_rgba(59,102,254,0.35)]">
      <Icon size={22} strokeWidth={1.75} />
    </span>
  </span>
);

export default SlantedIconPanel;
