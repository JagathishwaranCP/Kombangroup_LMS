import { workingProcess } from "../../data/content";
import { cn } from "../../utils/cn";
import { Dot } from "../decor/Shapes";
import SlantedIconPanel from "../decor/SlantedIconPanel";
import Container from "../ui/Container";
import PersonFigure from "../ui/PersonFigure";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const { reviewCard, chart } = workingProcess;
const maxHours = Math.max(...chart.bars.map((bar) => bar.hours));

const WorkingProcess = () => (
  <section id="process" aria-labelledby="process-title" className="overflow-hidden bg-white py-10 sm:py-12 md:py-16">
    <Container className="grid items-center gap-10 lg:grid-cols-2">
      <Reveal className="min-w-0">
        <SectionHeading
          id="process-title"
          align="left"
          tone="light"
          tag={workingProcess.tag}
          title={workingProcess.title}
          description={workingProcess.description}
        />

        <ol className="mt-6 space-y-4 sm:mt-7">
          {workingProcess.steps.map((step) => (
            <li key={step.title} className="flex items-start gap-3 sm:gap-5">
              <SlantedIconPanel icon={step.icon} className="scale-90 sm:scale-100" />
              <div className="min-w-0 pt-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-navy sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-[380px] text-sm font-normal leading-relaxed tracking-wide text-body sm:mt-1.5">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal
        delay={0.1}
        className="relative order-first mx-auto h-[300px] w-full max-w-[340px] sm:h-[360px] sm:max-w-[400px] lg:order-none lg:h-[420px]"
      >
        <Dot className="left-[54%] top-1/2 size-[200px] -translate-x-1/2 -translate-y-1/2 bg-electric/15 sm:size-[260px] lg:size-[320px]" />

        <PersonFigure
          image={workingProcess.image}
          className="absolute bottom-0 left-[58%] h-[250px] w-[170px] -translate-x-1/2 sm:h-[320px] sm:w-[220px] lg:left-[60%] lg:h-[380px] lg:w-[260px]"
        />

        <div className="absolute left-0 top-0 flex max-w-[70%] animate-float items-center gap-2 rounded-xl border border-border bg-white p-2 pr-3 shadow-card sm:max-w-none sm:gap-3 sm:p-3 sm:pr-4">
          <div className="flex -space-x-2">
            {reviewCard.avatars.map((avatar) => (
              <img
                key={avatar.src}
                src={avatar.src}
                alt={avatar.alt}
                width={avatar.width}
                height={avatar.height}
                loading="lazy"
                decoding="async"
                className="size-6 rounded-full object-cover ring-2 ring-white sm:size-8"
              />
            ))}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold leading-tight text-navy sm:text-sm">
              {reviewCard.value} {reviewCard.label}
            </p>
            <p className="mt-0.5 truncate text-[10px] text-body sm:text-xs">{reviewCard.caption}</p>
          </div>
        </div>

        <div className="absolute bottom-3 left-0 w-[150px] rounded-xl border border-border bg-white p-3 shadow-card sm:bottom-4 sm:w-[196px] sm:p-4">
          <p className="text-xs font-semibold text-navy sm:text-sm">{chart.title}</p>
          <div role="img" aria-label={chart.summary} className="mt-2 sm:mt-3">
            <div className="flex h-12 items-end gap-1.5 sm:h-16 sm:gap-2">
              {chart.bars.map((bar, index) => (
                <span
                  key={`${bar.day}-${index}`}
                  className={cn("flex-1 rounded-t-sm", index % 2 === 0 ? "bg-indigo" : "bg-electric-light")}
                  style={{ height: `${(bar.hours / maxHours) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-1 flex gap-1.5 sm:mt-1.5 sm:gap-2">
              {chart.bars.map((bar, index) => (
                <span key={`${bar.day}-${index}`} className="flex-1 text-center text-[9px] leading-none text-body sm:text-[10px]">
                  {bar.day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

export default WorkingProcess;
