import { BookOpen, Star, Users } from "lucide-react";
import type { Course } from "../../data/content";
import Button from "./Button";

interface CourseCardProps {
  course: Course;
  labels: { lessons: string; students: string; rating: string };
  action: { label: string; to: string };
}

const CourseCard = ({ course, labels, action }: CourseCardProps) => (
  <article className="h-full rounded-2xl bg-white p-3 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover">
    <img
      src={course.image.src}
      alt={course.image.alt}
      width={course.image.width}
      height={course.image.height}
      loading="lazy"
      decoding="async"
      className="aspect-[4/3] w-full rounded-xl object-cover"
    />
    <div className="px-2 pb-2 pt-4">
      <span className="inline-block rounded-sm bg-panel px-2.5 py-1 text-[13px] tracking-wide text-electric">
        {course.category}
      </span>
      <h3 className="mt-3 text-base font-semibold uppercase leading-snug tracking-wider text-navy">
        {course.title}
      </h3>
      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] tracking-wide text-body">
        {course.lessons && (
          <li className="flex items-center gap-1.5">
            <BookOpen size={15} className="text-electric" aria-hidden="true" />
            {course.lessons} {labels.lessons}
          </li>
        )}
        {course.students && (
          <li className="flex items-center gap-1.5">
            <Users size={15} className="text-electric" aria-hidden="true" />
            {course.students} {labels.students}
          </li>
        )}
        {course.rating !== "" && (
          <li className="flex items-center gap-1.5">
            <Star size={15} className="fill-gold text-gold" aria-hidden="true" />
            <span className="sr-only">{labels.rating}</span>
            {course.rating}
          </li>
        )}
      </ul>
      <div className="mt-4 border-t border-border pt-3">
        <Button to={action.to} size="sm">
          {action.label}
        </Button>
      </div>
    </div>
  </article>
);

export default CourseCard;
