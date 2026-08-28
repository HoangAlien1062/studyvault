import { Link } from "react-router-dom";
import type { Course, Teacher } from "../../types";
import { countTeacherLessons } from "../../lib/catalog";

export default function TeacherCard({ course, teacher }: { course: Course; teacher: Teacher }) {
  return (
    <Link
      to={`/courses/${course.id}/teachers/${teacher.id}`}
      className="surface-card p-6 flex flex-col items-center text-center group animate-fadeUp"
    >
      <div className="h-16 w-16 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-105">
        {teacher.avatar}
      </div>
      <h3 className="font-display font-semibold text-ash-200">{teacher.name}</h3>
      <p className="text-xs text-ash-500 mt-0.5">{teacher.title}</p>

      <div className="mt-4 flex items-center gap-3 text-xs text-ash-500 font-mono">
        <span>{teacher.chapters.length} chương</span>
        <span className="h-1 w-1 rounded-full bg-ink-600" />
        <span>{countTeacherLessons(teacher)} bài học</span>
      </div>

      <div className="mt-5 pt-4 border-t border-ink-600/70 w-full">
        <span className="text-sm font-medium text-cue">Xem khóa học →</span>
      </div>
    </Link>
  );
}
