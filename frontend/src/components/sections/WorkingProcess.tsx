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
  <section id="process" aria-labelledby="process-title" className="overflow-hidden bg-primary py-20 md:py-28">
    <Container className="grid items-center gap-16 lg:grid-cols-2">
      <Reveal>
        <SectionHeading
          id="process-title"
          align="left"
          tone="dark"
          tag={workingProcess.tag}
          title={workingProcess.title}
          description={workingProcess.description}
        />

        <ol className="mt-10 space-y-5">
          {workingProcess.steps.map((step) => (
            <li key={step.title} className="flex items-start gap-5">
              <SlantedIconPanel icon={step.icon} />
              <div className="pt-1">
                <h3 className="text-base font-semibold uppercase tracking-wider text-white">{step.title}</h3>
                <p className="mt-1.5 max-w-[380px] text-sm font-light leading-relaxed tracking-wide text-body-dark">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal
        delay={0.1}
        className="relative order-first mx-auto h-[440px] w-full max-w-[440px] lg:order-none lg:h-[500px]"
      >
        <Dot className="left-[54%] top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 bg-electric-grad shadow-[0_0_120px_rgba(59,102,254,0.45)] lg:size-[380px]" />
        <Dot className="right-4 top-8 size-5 bg-electric-light" />

        {/* Sits right of centre so the floating cards on the left stay clear of the face. */}
        <PersonFigure
          image={workingProcess.image}
          className="absolute bottom-0 left-[58%] h-[380px] w-[260px] -translate-x-1/2 lg:left-[60%] lg:h-[440px] lg:w-[300px]"
        />

        <div className="absolute left-0 top-0 flex animate-float items-center gap-3 rounded-xl bg-white p-3 pr-4 shadow-card-dark">
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
                className="size-8 rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-navy">
              {reviewCard.value} {reviewCard.label}
            </p>
            <p className="mt-0.5 text-xs text-body">{reviewCard.caption}</p>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 w-[196px] rounded-xl bg-white p-4 shadow-card-dark">
          <p className="text-sm font-semibold text-navy">{chart.title}</p>
          <div role="img" aria-label={chart.summary} className="mt-3">
            <div className="flex h-16 items-end gap-2">
              {chart.bars.map((bar, index) => (
                <span
                  key={`${bar.day}-${index}`}
                  className={cn("flex-1 rounded-t-sm", index % 2 === 0 ? "bg-indigo" : "bg-electric-light")}
                  style={{ height: `${(bar.hours / maxHours) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex gap-2">
              {chart.bars.map((bar, index) => (
                <span key={`${bar.day}-${index}`} className="flex-1 text-center text-[10px] leading-none text-body">
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
