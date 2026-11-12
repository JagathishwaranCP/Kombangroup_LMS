import { Fragment } from "react";
import { cn } from "../../utils/cn";
import SectionTag from "./SectionTag";

interface SectionHeadingProps {
  tag: string;
  /** One entry per line; lines break from the `sm` breakpoint up. */
  title: string[];
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Id for the h2, so the section can point at it with aria-labelledby. */
  id?: string;
  className?: string;
}

const SectionHeading = ({
  tag,
  title,
  description,
  align = "center",
  tone = "light",
  id,
  className,
}: SectionHeadingProps) => (
  <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
    <SectionTag tone={tone}>{tag}</SectionTag>
    <h2
      id={id}
      className={cn(
        "mt-3 text-[clamp(1.35rem,3.4vw,2.125rem)] font-bold leading-tight",
        tone === "dark" ? "text-white" : "text-navy",
      )}
    >
      {title.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && (
            <>
              {" "}
              <br className="hidden sm:block" />
            </>
          )}
          {line}
        </Fragment>
      ))}
    </h2>
    {description && (
      <p
        className={cn(
          "mt-3 max-w-[540px] text-sm font-normal leading-relaxed tracking-wide md:text-[15px]",
          align === "center" && "mx-auto",
          tone === "dark" ? "text-body-dark" : "text-body",
        )}
      >
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
