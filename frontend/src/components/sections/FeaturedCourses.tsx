import { featuredCourses } from "../../data/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CourseCard from "../ui/CourseCard";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const FeaturedCourses = () => (
  // No top padding: this shares the light background of the section above it.
  <section id="courses" aria-labelledby="courses-title" className="pb-20 md:pb-28">
    <Container>
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="courses-title"
          align="left"
          tag={featuredCourses.tag}
          title={featuredCourses.title}
        />
        <Button to={featuredCourses.cta.to} withArrow className="shrink-0 self-start md:mb-2 md:self-auto">
          {featuredCourses.cta.label}
        </Button>
      </Reveal>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.items.map((course, index) => (
          <li key={course.title}>
            <Reveal delay={index * 0.1} className="h-full">
              <CourseCard course={course} labels={featuredCourses.meta} action={featuredCourses.explore} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);

export default FeaturedCourses;
