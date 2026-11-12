import { brand } from "../../data/content";
import { cn } from "../../utils/cn";

const markSizes = {
  /** Compact sticky bar after scroll. */
  md: "h-12 w-12 rounded-xl p-1",
  /** Home hero header — prominent before scroll. */
  lg: "logo-mark-lg h-[4.75rem] w-[4.75rem] rounded-2xl p-1 sm:h-[5.25rem] sm:w-[5.25rem]",
};

const nameSizes = {
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl md:text-2xl",
};

interface LogoProps {
  size?: keyof typeof markSizes;
  /** Show the CloudConnekt wordmark beside the mark. */
  showName?: boolean;
  /** Use light wordmark colours on dark backgrounds. */
  tone?: "light" | "dark";
}

/** CloudConnekt mark on a clean white tile, optionally with the brand name. */
const Logo = ({ size = "md", showName = false, tone = "light" }: LogoProps) => (
  <a
    href="#home"
    aria-label={brand.homeLabel}
    className="inline-flex items-center gap-2.5 sm:gap-3"
  >
    <span
      className={cn(
        "logo-mark relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-white transition-[width,height,border-radius,padding,box-shadow] duration-300 ease-out",
        markSizes[size],
      )}
    >
      <img
        src="/cloudconnekt-logo-mark.jpg"
        alt=""
        width={1024}
        height={938}
        className="h-full w-full scale-[1.08] object-contain"
      />
    </span>
    {showName && (
      <span
        className={cn(
          "font-bold tracking-tight transition-[font-size] duration-300 ease-out",
          nameSizes[size],
        )}
      >
        <span className={tone === "dark" ? "text-white" : "text-navy"}>Cloud</span>
        <span className={tone === "dark" ? "text-[#8FB4FF]" : "text-[#6B9FFF]"}>Connekt</span>
      </span>
    )}
  </a>
);

export default Logo;
