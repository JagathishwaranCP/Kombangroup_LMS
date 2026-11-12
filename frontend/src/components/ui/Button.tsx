import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "outline";
type Size = "md" | "sm";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Adds the trailing arrow icon. */
  withArrow?: boolean;
  className?: string;
  /** Internal route: renders a router link. */
  to?: string;
  /** Anchor or external URL: renders a plain link. */
  href?: string;
  /** Opens the href in a new tab when set. */
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-semibold transition-colors duration-200";

const variants: Record<Variant, string> = {
  // Indigo, as on the site's "Login" button.
  primary: "bg-indigo text-white hover:bg-indigo-hover",
  // Indigo outline, as on the site's "Coaching with CloudConnekt" button.
  outline:
    "border-2 border-indigo-deep uppercase tracking-wider text-navy hover:border-indigo hover:bg-indigo hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[15px]",
  sm: "px-5 py-2.5 text-sm",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  to,
  href,
  external = false,
  type = "button",
  onClick,
}: ButtonProps) => {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight size={16} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
