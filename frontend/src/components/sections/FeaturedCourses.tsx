import { useEffect, useRef } from "react";
import { featuredCourses } from "../../data/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CourseCard from "../ui/CourseCard";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/** Duplicate the list so the loop can wrap seamlessly. */
const loopItems = [...featuredCourses.items, ...featuredCourses.items];

const AUTO_SPEED = 0.6;
const RESUME_MS = 1800;

const FeaturedCourses = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;

    const tick = () => {
      if (!pausedRef.current) {
        const half = scroller.scrollWidth / 2;
        scroller.scrollLeft += AUTO_SPEED;
        if (scroller.scrollLeft >= half) {
          scroller.scrollLeft -= half;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  };

  const scheduleResume = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_MS);
  };

  return (
    <section id="courses" aria-labelledby="courses-title" className="overflow-hidden pb-10 sm:pb-12 md:pb-16">
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="courses-title"
            align="left"
            tag={featuredCourses.tag}
            title={featuredCourses.title}
          />
          <Button to={featuredCourses.cta.to} withArrow className="w-full shrink-0 self-stretch sm:mb-1 sm:w-auto sm:self-auto">
            {featuredCourses.cta.label}
          </Button>
        </Reveal>
      </Container>

      <div className="relative mt-5 md:mt-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:w-12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:w-12"
        />

        <div
          ref={scrollerRef}
          className="courses-scroller overflow-x-auto px-5 md:px-8 lg:px-12 xl:px-16"
          onMouseEnter={pause}
          onMouseLeave={scheduleResume}
          onTouchStart={pause}
          onTouchEnd={scheduleResume}
          onWheel={() => {
            pause();
            scheduleResume();
          }}
          onPointerDown={pause}
          onPointerUp={scheduleResume}
          onScroll={() => {
            const scroller = scrollerRef.current;
            if (!scroller) return;
            const half = scroller.scrollWidth / 2;
            if (scroller.scrollLeft >= half) {
              scroller.scrollLeft -= half;
            } else if (scroller.scrollLeft <= 0) {
              scroller.scrollLeft += half;
            }
          }}
        >
          <ul className="flex w-max gap-4">
            {loopItems.map((course, index) => (
              <li
                key={`${course.title}-${index}`}
                className="w-[min(78vw,300px)] shrink-0 sm:w-[300px] md:w-[320px] xl:w-[340px]"
              >
                <CourseCard
                  course={course}
                  labels={featuredCourses.meta}
                  action={featuredCourses.explore}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
