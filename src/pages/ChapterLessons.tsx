import { Navigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import LessonList from "../components/lessons/LessonList";
import { getChapterLessonsWithContext, getCourse, getTeacher, chapterDurationLabel, getChapter } from "../lib/catalog";
import { useProgress } from "../hooks/useUserData";

export default function ChapterLessons() {
  const { courseId = "", teacherId = "", chapterId = "" } = useParams();
  const course = getCourse(courseId);
  const teacher = getTeacher(courseId, teacherId);
  const chapter = getChapter(courseId, teacherId, chapterId);
  const { getProgress } = useProgress();

  if (!course || !teacher || !chapter) return <Navigate to="/courses" replace />;

  const lessons = getChapterLessonsWithContext(courseId, teacherId, chapterId);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Môn học", to: "/courses" },
          { label: course.name, to: `/courses/${course.id}` },
          { label: teacher.name, to: `/courses/${course.id}/teachers/${teacher.id}` },
          { label: chapter.name },
        ]}
      />

      <div>
        <p className="text-xs text-ash-500 font-mono">
          {course.name} · {teacher.name}
        </p>
        <h1 className="text-2xl font-display font-bold text-ash-200 mt-1">{chapter.name}</h1>
        <p className="text-sm text-ash-400 mt-1">{chapter.description}</p>
        <p className="text-xs text-ash-500 mt-2 font-mono">
          {lessons.length} bài học · {chapterDurationLabel(chapter)}
        </p>
      </div>

      <LessonList lessons={lessons} getProgress={getProgress} />
    </div>
  );
}
