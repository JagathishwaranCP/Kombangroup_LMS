import { hero } from "../../data/content";
import Button from "../ui/Button";
import Container from "../ui/Container";

const Hero = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="overflow-hidden bg-gradient-to-b from-white via-[#F4F7FC] to-bg"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 pb-8 pt-[5.5rem] sm:gap-8 sm:pb-10 sm:pt-24 md:gap-10 md:pb-12 md:pt-28 lg:grid-cols-2 lg:gap-12 lg:pb-14 lg:pt-28 xl:gap-16">
          <div className="flex w-full min-w-0 flex-col items-stretch text-left sm:items-start">
            <h1
              id="hero-title"
              className="text-[clamp(1.5rem,3.2vw+0.6rem,3rem)] font-bold leading-[1.22] tracking-tight text-navy"
            >
              <span className="block">{hero.title.line1}</span>
              <span className="block">{hero.title.line2}</span>
              <span className="block text-indigo">{hero.title.line2Accent}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-[0.9375rem] font-normal leading-relaxed text-body sm:mt-4 md:text-base lg:text-[1.05rem]">
              {hero.description}
            </p>
            <div className="mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button href={hero.primaryCta.href} className="w-full sm:w-auto">
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="outline"
                external
                className="w-full normal-case tracking-normal sm:w-auto"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="relative w-full min-w-0">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-electric/20 via-indigo/15 to-transparent blur-2xl sm:-inset-4 sm:rounded-[32px]"
            />

            <figure className="relative overflow-hidden rounded-2xl border border-border/80 bg-white shadow-card-hover sm:rounded-[24px]">
              <div className="relative aspect-[16/11] overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9.5]">
                <img
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={hero.image.width}
                  height={hero.image.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 ease-out hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {hero.mediaCaption.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/80 sm:text-sm">
                    {hero.mediaCaption.subtitle}
                  </p>
                </figcaption>
              </div>

              <ul className="grid grid-cols-3 divide-x divide-border border-t border-border bg-[#FBFCFE]">
                {hero.mediaStats.map((stat) => (
                  <li key={stat.label} className="px-1.5 py-2.5 text-center sm:px-4 sm:py-4">
                    <p className="text-sm font-bold tracking-tight text-navy sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-body sm:text-xs">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
