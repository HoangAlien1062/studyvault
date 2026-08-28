import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import VideoPlayer from "../components/video/VideoPlayer";
import VideoControls from "../components/video/VideoControls";
import VideoPlaylist from "../components/video/VideoPlaylist";
import {
  findLessonWithContext,
  getAdjacentLessons,
  getChapterLessonsWithContext,
  getLessonMaterials,
} from "../lib/catalog";
import { useFavorites, useHistory, useProgress } from "../hooks/useUserData";

export default function LessonPlayer() {
  const { lessonId = "" } = useParams();
  const navigate = useNavigate();
  const lesson = findLessonWithContext(lessonId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getProgress, toggleCompleted, setProgress } = useProgress();
  const { recordView } = useHistory();

  useEffect(() => {
    if (lesson) {
      const current = getProgress(lesson.id);
      recordView(lesson.id, current.progress);
      if (current.progress === 0) setProgress(lesson.id, 8);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  if (!lesson) return <Navigate to="/courses" replace />;

  const { prev, next } = getAdjacentLessons(lesson.id);
  const playlist = getChapterLessonsWithContext(lesson.course.id, lesson.teacher.id, lesson.chapter.id);
  const progressEntry = getProgress(lesson.id);
  const materials = getLessonMaterials(lesson);

  return (
    <div className="container-page py-8">
      <div className="mb-5">
        <Breadcrumb
          items={[
            { label: lesson.course.name, to: `/courses/${lesson.course.id}` },
            {
              label: lesson.teacher.name,
              to: `/courses/${lesson.course.id}/teachers/${lesson.teacher.id}`,
            },
            {
              label: lesson.chapter.name,
              to: `/courses/${lesson.course.id}/teachers/${lesson.teacher.id}/chapters/${lesson.chapter.id}`,
            },
            { label: lesson.title },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-5 min-w-0">
          <VideoPlayer lesson={lesson} />

          <div>
            <h1 className="text-xl font-display font-bold text-ash-200">{lesson.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-sm text-ash-400">
              <span>👨‍🏫 {lesson.teacher.name}</span>
              <span>📚 {lesson.course.name}</span>
              <span>📁 {lesson.chapter.name}</span>
              <span>⏱ {lesson.duration}</span>
            </div>
          </div>

          <VideoControls
            hasPrev={Boolean(prev)}
            hasNext={Boolean(next)}
            completed={progressEntry.completed}
            favorited={isFavorite(lesson.id)}
            onPrev={() => prev && navigate(`/lesson/${prev.id}`)}
            onNext={() => next && navigate(`/lesson/${next.id}`)}
            onToggleCompleted={() => toggleCompleted(lesson.id)}
            onToggleFavorite={() => toggleFavorite(lesson.id)}
          />

          <div className="surface-card p-5">
            <h2 className="text-sm font-display font-semibold text-ash-200 mb-2">Mô tả bài học</h2>
            <p className="text-sm text-ash-400 leading-relaxed">{lesson.description}</p>
          </div>

          {materials.length > 0 && (
            <div className="surface-card p-5">
              <h2 className="text-sm font-display font-semibold text-ash-200 mb-3">
                Tài liệu đính kèm
              </h2>
              <div className="space-y-2">
                {materials.map((material) => (
                  <a
                    key={material.id}
                    href={material.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-ink-600/70 bg-ink-700/40 px-3.5 py-2.5 text-sm text-ash-300 transition-colors duration-150 hover:border-ink-500 hover:text-ash-200"
                  >
                    <span className="text-base shrink-0">📄</span>
                    <span className="flex-1 min-w-0 truncate">{material.name}</span>
                    <span className="timecode shrink-0">Tải xuống ↓</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <VideoPlaylist lessons={playlist} activeLessonId={lesson.id} getProgress={getProgress} />
        </div>
      </div>
    </div>
  );
}
