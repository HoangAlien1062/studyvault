import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import CourseHeader from "../components/courses/CourseHeader";
import TeacherGrid from "../components/teachers/TeacherGrid";
import EmptyState from "../components/ui/EmptyState";
import { getCourse, countCourseChapters, countCourseLessons } from "../lib/catalog";

type Tab = "overview" | "teachers" | "chapters";

export default function CourseDetail() {
  const { courseId = "" } = useParams();
  const course = getCourse(courseId);
  const [tab, setTab] = useState<Tab>("overview");

  const allChapters = useMemo(
    () =>
      course
        ? course.teachers.flatMap((t) => t.chapters.map((c) => ({ chapter: c, teacher: t })))
        : [],
    [course]
  );

  if (!course) return <Navigate to="/courses" replace />;

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Tổng quan" },
    { key: "teachers", label: "Giáo viên" },
    { key: "chapters", label: "Chương / Chủ đề" },
  ];

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Môn học", to: "/courses" },
          { label: course.name },
        ]}
      />
      <CourseHeader course={course} />

      <div className="flex gap-1 border-b border-ink-600/70">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-200 -mb-px ${
              tab === t.key
                ? "border-cue text-cue"
                : "border-transparent text-ash-400 hover:text-ash-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Giáo viên" value={course.teachers.length} />
          <StatCard label="Chương" value={countCourseChapters(course)} />
          <StatCard label="Bài học" value={countCourseLessons(course)} />
          <div className="sm:col-span-3 surface-card p-6">
            <h3 className="font-display font-semibold text-ash-200 mb-2">Giới thiệu</h3>
            <p className="text-sm text-ash-400 leading-relaxed">{course.description}</p>
          </div>
        </div>
      )}

      {tab === "teachers" && <TeacherGrid course={course} teachers={course.teachers} />}

      {tab === "chapters" &&
        (allChapters.length === 0 ? (
          <EmptyState icon="🗂️" title="Chưa có chương nào" />
        ) : (
          <div className="space-y-6">
            {course.teachers.map((teacher) => (
              <div key={teacher.id}>
                <p className="text-xs font-mono uppercase tracking-wider text-ash-500 mb-2.5">
                  {teacher.name}
                </p>
                <div className="space-y-2.5">
                  {teacher.chapters
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((chapter) => (
                      <Link
                        key={chapter.id}
                        to={`/courses/${course.id}/teachers/${teacher.id}/chapters/${chapter.id}`}
                        className="flex items-center gap-4 rounded-xl border border-ink-600/70 bg-ink-800 px-4 py-3 hover:border-ink-500 hover:bg-ink-700/50 transition-all duration-200"
                      >
                        <span className="font-mono text-cue/80 text-sm w-7">
                          {String(chapter.order).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-sm text-ash-200">{chapter.name}</span>
                        <span className="timecode">{chapter.lessons.length} bài</span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface-card p-5">
      <p className="text-2xl font-display font-bold text-ash-200 font-mono">{value}</p>
      <p className="text-xs text-ash-500 mt-1">{label}</p>
    </div>
  );
}
