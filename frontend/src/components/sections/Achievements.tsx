import { achievements } from "../../data/content";
import DotGrid from "../decor/DotGrid";
import OutlineTriangle from "../decor/OutlineTriangle";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import StatCard from "../ui/StatCard";

const Achievements = () => (
  <section
    id="achievements"
    aria-labelledby="achievements-title"
    className="relative overflow-hidden py-10 sm:py-12 md:py-16"
  >
    <DotGrid cols={3} rows={4} className="right-[7%] top-20 hidden text-indigo/30 md:block" />
    <OutlineTriangle className="bottom-14 left-[6%] hidden size-16 rotate-[15deg] text-electric/30 lg:block" />

    <Container className="relative">
      <Reveal>
        <SectionHeading
          id="achievements-title"
          tag={achievements.tag}
          title={achievements.title}
          description={achievements.description}
        />
      </Reveal>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {achievements.stats.map((stat, index) => (
          <li key={stat.label}>
            <Reveal delay={index * 0.1} className="h-full">
              <StatCard {...stat} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);

export default Achievements;
