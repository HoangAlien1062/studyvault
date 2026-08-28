import { Link } from "react-router-dom";
import type { Course } from "../../types";
import { countCourseLessons, countCourseChapters } from "../../lib/catalog";

export default function CourseCard({ course }: { course: Course }) {
  const teacherCount = course.teachers.length;
  const lessonCount = countCourseLessons(course);
  const chapterCount = countCourseChapters(course);

  return (
    <Link
      to={`/courses/${course.id}`}
      className="surface-card p-6 flex flex-col group animate-fadeUp"
    >
      <div
        className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${course.color}1A`, color: course.color }}
      >
        {course.icon}
      </div>
      <h3 className="font-display font-semibold text-lg text-ash-200">{course.shortName}</h3>
      <p className="text-sm text-ash-400 mt-1 line-clamp-2">{course.description}</p>

      <div className="mt-5 flex items-center gap-4 text-xs text-ash-500 font-mono">
        <span>{teacherCount} giáo viên</span>
        <span className="h-1 w-1 rounded-full bg-ink-600" />
        <span>{chapterCount} chương</span>
        <span className="h-1 w-1 rounded-full bg-ink-600" />
        <span>{lessonCount} bài</span>
      </div>

      <div className="mt-5 pt-4 border-t border-ink-600/70 flex items-center justify-between">
        <span className="text-sm font-medium text-cue">Xem môn học</span>
        <span className="text-cue transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
