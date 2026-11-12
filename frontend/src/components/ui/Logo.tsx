import { brand } from "../../data/content";
import { cn } from "../../utils/cn";

const markSizes = {
  /** Compact sticky bar after scroll. */
  md: "h-9 w-9 rounded-lg p-0.5 sm:h-11 sm:w-11 sm:rounded-xl sm:p-1",
  /** Home hero header — scales down on phones. */
  lg: "logo-mark-lg h-12 w-12 rounded-xl p-1 sm:h-16 sm:w-16 sm:rounded-2xl md:h-[4.5rem] md:w-[4.5rem]",
};

const nameSizes = {
  md: "text-sm sm:text-base md:text-lg",
  lg: "text-base sm:text-lg md:text-xl lg:text-2xl",
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
    className="inline-flex min-w-0 items-center gap-2 sm:gap-2.5 md:gap-3"
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
          "truncate font-bold tracking-tight transition-[font-size] duration-300 ease-out",
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
