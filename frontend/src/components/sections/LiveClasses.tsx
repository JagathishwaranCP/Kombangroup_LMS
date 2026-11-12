import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Eye, Mic, PhoneOff, Star, Video } from "lucide-react";
import { liveClasses } from "../../data/content";
import { cn } from "../../utils/cn";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const controlClass = "grid size-10 place-items-center rounded-full text-white backdrop-blur";

const LiveClasses = () => {
  const [activeId, setActiveId] = useState(liveClasses.items[0].id);
  const active = liveClasses.items.find((item) => item.id === activeId) ?? liveClasses.items[0];

  return (
    <section id="live-classes" aria-labelledby="live-classes-title" className="bg-panel py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="live-classes-title"
            tag={liveClasses.tag}
            title={liveClasses.title}
            description={liveClasses.description}
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="order-last lg:order-none">
            <ul aria-label={liveClasses.listLabel} className="space-y-4">
              {liveClasses.items.map((item) => {
                const isActive = item.id === active.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl border-l-[3px] bg-white p-3 text-left transition duration-200",
                        isActive
                          ? "border-electric shadow-card-hover"
                          : "border-transparent shadow-card hover:-translate-y-1 hover:shadow-card-hover",
                      )}
                    >
                      <img
                        src={item.thumb.src}
                        alt={item.thumb.alt}
                        width={item.thumb.width}
                        height={item.thumb.height}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-20 shrink-0 rounded-lg object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold leading-snug text-navy">{item.title}</span>
                        <span className="block text-[15px] font-semibold leading-snug text-navy">
                          {item.subtitle}
                        </span>
                        <span className="mt-1.5 flex items-center gap-4 text-[13px] tracking-wide text-body">
                          <span className="flex items-center gap-1.5">
                            <Star size={14} className="fill-gold text-gold" aria-hidden="true" />
                            <span className="sr-only">{liveClasses.ratingLabel}</span>
                            {item.rating}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BookOpen size={14} className="text-electric" aria-hidden="true" />
                            {item.lessons} {liveClasses.lessonsLabel}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-primary shadow-card-hover">
              <AnimatePresence initial={false}>
                <motion.img
                  key={active.id}
                  src={active.image.src}
                  alt={active.image.alt}
                  width={active.image.width}
                  height={active.image.height}
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-sm bg-accent px-2.5 py-1 text-xs font-semibold tracking-wide text-primary">
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  {liveClasses.liveBadge}
                </span>
                <span className="flex items-center gap-1.5 rounded-sm bg-primary/70 px-2.5 py-1 text-xs tracking-wide text-white backdrop-blur">
                  <Eye size={14} aria-hidden="true" />
                  {active.viewers}
                </span>
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent p-4 pt-14">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={active.host.avatar.src}
                    alt=""
                    width={active.host.avatar.width}
                    height={active.host.avatar.height}
                    loading="lazy"
                    decoding="async"
                    className="size-10 shrink-0 rounded-full object-cover ring-2 ring-white/70"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{active.host.name}</p>
                    <p className="text-xs text-body-dark">{active.host.role}</p>
                  </div>
                </div>

                {/* Mockup only: the call controls are decorative, not real buttons. */}
                <div aria-hidden="true" className="flex shrink-0 items-center gap-2">
                  <span className={cn(controlClass, "bg-white/20")}>
                    <Mic size={18} />
                  </span>
                  <span className={cn(controlClass, "bg-white/20")}>
                    <Video size={18} />
                  </span>
                  <span className={cn(controlClass, "bg-red-600")}>
                    <PhoneOff size={18} />
                  </span>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default LiveClasses;
