import { Navigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import ChapterList from "../components/chapters/ChapterList";
import { getCourse, getTeacher, countTeacherLessons } from "../lib/catalog";
import { useProgress } from "../hooks/useUserData";

export default function TeacherCourse() {
  const { courseId = "", teacherId = "" } = useParams();
  const course = getCourse(courseId);
  const teacher = getTeacher(courseId, teacherId);
  const { getProgress } = useProgress();

  if (!course || !teacher) return <Navigate to="/courses" replace />;

  function chapterProgress(chapterId: string) {
    const chapter = teacher!.chapters.find((c) => c.id === chapterId);
    if (!chapter || chapter.lessons.length === 0) return 0;
    const total = chapter.lessons.reduce((sum, l) => sum + getProgress(l.id).progress, 0);
    return total / chapter.lessons.length;
  }

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Môn học", to: "/courses" },
          { label: course.name, to: `/courses/${course.id}` },
          { label: teacher.name },
        ]}
      />

      <div className="surface-card p-6 flex items-center gap-5">
        <div className="h-14 w-14 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center text-2xl shrink-0">
          {teacher.avatar}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-display font-bold text-ash-200">{teacher.name}</h1>
          <p className="text-sm text-ash-400 mt-0.5">{course.name}</p>
          <p className="text-xs text-ash-500 mt-2 font-mono">
            {teacher.chapters.length} chương · {countTeacherLessons(teacher)} bài học
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-display font-semibold text-ash-300 mb-3">Chương / Chủ đề</h2>
        <ChapterList
          course={course}
          teacher={teacher}
          chapters={teacher.chapters}
          getProgress={(c) => chapterProgress(c.id)}
        />
      </div>
    </div>
  );
}
