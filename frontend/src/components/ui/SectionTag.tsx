import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface SectionTagProps {
  children: ReactNode;
  /** "light" sits on light sections, "dark" on navy sections. */
  tone?: "light" | "dark";
  className?: string;
}

const SectionTag = ({ children, tone = "light", className }: SectionTagProps) => (
  <span
    className={cn(
      "inline-block rounded-sm px-3 py-2 text-sm tracking-wide",
      tone === "dark" ? "bg-navy-tint text-accent" : "bg-accent text-white",
      className,
    )}
  >
    {children}
  </span>
);

export default SectionTag;
