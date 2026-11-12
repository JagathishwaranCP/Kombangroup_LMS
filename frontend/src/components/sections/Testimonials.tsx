import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../../data/content";
import { cn } from "../../utils/cn";
import { Dot } from "../decor/Shapes";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials.items[activeIndex];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="overflow-hidden bg-bg-grey py-20 md:py-28"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="order-last lg:order-none">
          <SectionHeading
            id="testimonials-title"
            align="left"
            tag={testimonials.tag}
            title={testimonials.title}
          />

          <div className="mt-8 max-w-[560px] rounded-xl bg-primary-card p-8 shadow-card-dark">
            {/* All quotes share one grid cell, so the card keeps the height of the
                longest one and the avatar buttons never move when switching. */}
            <div className="grid">
              {testimonials.items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <figure
                    key={item.name}
                    aria-hidden={!isActive}
                    className={cn(
                      "col-start-1 row-start-1 transition-[opacity,visibility] duration-300",
                      isActive ? "visible opacity-100" : "invisible opacity-0",
                    )}
                  >
                    <p className="text-[13px] tracking-wide text-body-dark">{item.origin}</p>
                    <blockquote className="mt-3 max-w-[480px] text-sm font-light leading-relaxed tracking-wide text-white md:text-[15px]">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-5">
                      <span className="block font-semibold text-gold">{item.name}</span>
                      {item.role && (
                        <span className="block text-[13px] tracking-wide text-body-dark">{item.role}</span>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            <div role="group" aria-label={testimonials.switcherLabel} className="mt-6 flex h-14 items-center gap-4">
              {testimonials.items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`${testimonials.showLabel} ${item.name}`}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "shrink-0 overflow-hidden rounded-full transition-all duration-200",
                      isActive
                        ? "size-[52px] ring-2 ring-gold ring-offset-2 ring-offset-primary-card"
                        : "size-10 opacity-70 hover:opacity-100",
                    )}
                  >
                    <img
                      src={item.avatar.src}
                      alt=""
                      width={item.avatar.width}
                      height={item.avatar.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto size-[280px] sm:size-[340px]">
          <Dot className="-left-5 -top-3 size-24 bg-electric-grad" />
          <Dot className="-bottom-5 -right-5 size-40 bg-primary" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active.name}
              src={active.portrait.src}
              alt={active.portrait.alt}
              width={active.portrait.width}
              height={active.portrait.height}
              loading="lazy"
              decoding="async"
              {...fade}
              className="absolute inset-0 h-full w-full rounded-full object-cover"
            />
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  );
};

export default Testimonials;
