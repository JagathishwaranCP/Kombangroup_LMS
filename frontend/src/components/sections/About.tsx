import { about } from "../../data/content";
import { Dot } from "../decor/Shapes";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const About = () => (
  <section id="about" aria-labelledby="about-title" className="bg-white py-10 sm:py-12 md:py-16">
    <Container className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
      <Reveal className="relative mx-auto mb-6 w-full max-w-[420px] sm:mb-8 md:max-w-[460px] lg:mb-0">
        <Dot className="right-0 top-0 size-20 -translate-y-[30%] translate-x-[6%] bg-electric-grad sm:size-[7.25rem] sm:-translate-y-[38%] sm:translate-x-[10%] md:size-[9.25rem] md:-translate-y-[36%] md:translate-x-[16%]" />
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={about.image.width}
          height={about.image.height}
          loading="lazy"
          decoding="async"
          className="relative aspect-[4/5] w-full rounded-2xl object-cover sm:rounded-3xl"
        />
        <div className="absolute -bottom-5 left-2 flex size-20 flex-col items-center justify-center rounded-full bg-primary text-center ring-[3px] ring-electric sm:-bottom-6 sm:-left-2 sm:size-[110px] md:-left-6">
          <span className="text-2xl font-extrabold leading-none text-electric-light sm:text-[32px]">
            {about.badge.value}
          </span>
          <span className="mt-0.5 max-w-[70px] text-[9px] leading-tight text-white sm:mt-1 sm:max-w-[84px] sm:text-[11px]">
            {about.badge.label}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="min-w-0">
        <SectionHeading
          id="about-title"
          align="left"
          tag={about.tag}
          title={about.title}
          description={about.description}
        />

        <ul className="mt-6 space-y-4">
          {about.features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-3 sm:gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-electric-grad text-white sm:size-12">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-navy sm:text-base">
                  {title}
                </h3>
                <p className="mt-1 text-sm font-light leading-relaxed tracking-wide text-body">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Button href={about.cta.href} variant="outline" className="mt-6 w-full normal-case tracking-normal sm:w-auto">
          {about.cta.label}
        </Button>
      </Reveal>
    </Container>
  </section>
);

export default About;
