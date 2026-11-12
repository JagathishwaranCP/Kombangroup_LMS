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
        "mt-4 text-[30px] font-bold leading-tight md:text-[44px]",
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
          "mt-4 max-w-[480px] text-sm font-light leading-relaxed tracking-wide md:text-[15px]",
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
