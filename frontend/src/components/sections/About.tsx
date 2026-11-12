import { about } from "../../data/content";
import { Dot } from "../decor/Shapes";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const About = () => (
  <section id="about" aria-labelledby="about-title" className="bg-white py-20 md:py-28">
    <Container className="grid items-center gap-16 lg:grid-cols-2">
      <Reveal className="relative mx-auto w-full max-w-[460px]">
        <Dot className="right-0 top-0 size-[7.25rem] -translate-y-[38%] translate-x-[10%] bg-electric-grad md:size-[9.25rem] md:-translate-y-[36%] md:translate-x-[16%]" />
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={about.image.width}
          height={about.image.height}
          loading="lazy"
          decoding="async"
          className="relative aspect-[4/5] w-full rounded-3xl object-cover"
        />
        <div className="absolute -bottom-6 -left-2 flex size-[110px] flex-col items-center justify-center rounded-full bg-primary text-center ring-[3px] ring-electric md:-left-6">
          <span className="text-[32px] font-extrabold leading-none text-electric-light">{about.badge.value}</span>
          <span className="mt-1 max-w-[84px] text-[11px] leading-tight text-white">{about.badge.label}</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <SectionHeading
          id="about-title"
          align="left"
          tag={about.tag}
          title={about.title}
          description={about.description}
        />

        <ul className="mt-8 space-y-6">
          {about.features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-electric-grad text-white">
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wider text-navy">{title}</h3>
                <p className="mt-1 text-sm font-light leading-relaxed tracking-wide text-body">{description}</p>
              </div>
            </li>
          ))}
        </ul>

        <Button href={about.cta.href} variant="outline" className="mt-9">
          {about.cta.label}
        </Button>
      </Reveal>
    </Container>
  </section>
);

export default About;
