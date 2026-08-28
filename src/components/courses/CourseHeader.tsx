import type { Course } from "../../types";
import {
  countCourseChapters,
  countCourseLessons,
  courseDurationSeconds,
  secondsToLabel,
} from "../../lib/catalog";

export default function CourseHeader({ course }: { course: Course }) {
  const stats = [
    { label: "Giáo viên", value: course.teachers.length },
    { label: "Chương", value: countCourseChapters(course) },
    { label: "Bài học", value: countCourseLessons(course) },
    { label: "Tổng thời lượng", value: secondsToLabel(courseDurationSeconds(course)) },
  ];

  return (
    <div className="surface-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
      <div
        className="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
        style={{ backgroundColor: `${course.color}1A`, color: course.color }}
      >
        {course.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-display font-bold text-ash-200">{course.name}</h1>
        <p className="mt-1.5 text-sm text-ash-400 max-w-2xl">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="font-mono text-sm font-semibold text-ash-200">{s.value}</span>
              <span className="text-xs text-ash-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
