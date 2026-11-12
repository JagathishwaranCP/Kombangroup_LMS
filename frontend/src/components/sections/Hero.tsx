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
        <div className="grid grid-cols-1 items-center gap-6 pb-6 pt-20 md:gap-8 md:pb-8 md:pt-24 lg:grid-cols-2 lg:gap-10 lg:pb-10 lg:pt-24">
          <div className="flex w-full max-w-[540px] flex-col items-start text-left">
            <h1
              id="hero-title"
              className="text-[30px] font-bold leading-[1.28] tracking-tight text-navy sm:text-[34px] lg:text-[40px]"
            >
              <span className="block">{hero.title.line1}</span>
              <span className="block">{hero.title.line2}</span>
              <span className="block text-indigo">{hero.title.line2Accent}</span>
            </h1>
            <p className="mt-3 max-w-[480px] text-[15px] font-normal leading-relaxed text-body md:text-base">
              {hero.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button
                href={hero.secondaryCta.href}
                variant="outline"
                external
                className="normal-case tracking-normal"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="relative w-full">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-electric/20 via-indigo/15 to-transparent blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -right-3 top-8 hidden h-24 w-24 rounded-full bg-indigo/10 blur-xl lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-2 -left-2 hidden h-20 w-20 rounded-full bg-electric/15 blur-xl lg:block"
            />

            <figure className="relative overflow-hidden rounded-[24px] border border-border/80 bg-white shadow-card-hover">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={hero.image.width}
                  height={hero.image.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full scale-[1.02] object-cover object-[center_35%] transition-transform duration-700 ease-out hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {hero.mediaCaption.title}
                  </p>
                  <p className="mt-0.5 text-xs text-white/80 sm:text-sm">
                    {hero.mediaCaption.subtitle}
                  </p>
                </figcaption>
              </div>

              <ul className="grid grid-cols-3 divide-x divide-border border-t border-border bg-[#FBFCFE]">
                {hero.mediaStats.map((stat) => (
                  <li key={stat.label} className="px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-base font-bold tracking-tight text-navy sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-body sm:text-xs">
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
