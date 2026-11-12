import { brand } from "../../data/content";
import { cn } from "../../utils/cn";

const sizes = {
  /** Header once it sticks, and the footer. */
  md: "h-14 w-14 rounded-2xl p-1 sm:h-16 sm:w-16",
  /** Top of the home page, a step down from the previous large tile. */
  lg: "h-[4.5rem] w-[4.5rem] rounded-3xl p-1.5 sm:h-20 sm:w-20",
};

/** Cloud ConneKt mark. The artwork is navy on transparent, so it sits on a white rounded tile. */
const Logo = ({ size = "md" }: { size?: keyof typeof sizes }) => (
  <a
    href="#home"
    aria-label={brand.homeLabel}
    className={cn(
      "inline-flex shrink-0 items-center justify-center overflow-hidden bg-white",
      sizes[size],
    )}
  >
    <img
      src="/cloudconnekt-logo.png"
      alt=""
      width={300}
      height={295}
      className="h-full w-full object-contain"
    />
  </a>
);

export default Logo;
