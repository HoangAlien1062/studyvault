import Breadcrumb from "../components/layout/Breadcrumb";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import { findLessonWithContext } from "../lib/catalog";
import { useFavorites, useProgress } from "../hooks/useUserData";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { getProgress } = useProgress();

  const lessons = favorites
    .map((id) => findLessonWithContext(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Đã lưu" }]} />
      <h1 className="text-2xl font-display font-bold text-ash-200">Đã lưu</h1>

      {lessons.length === 0 ? (
        <EmptyState
          icon="⭐"
          title="Chưa có bài học nào được lưu"
          description="Nhấn nút Lưu ở trang xem video để thêm bài học vào đây."
        />
      ) : (
        <div className="space-y-2.5">
          {lessons.map((lesson) => {
            const progress = getProgress(lesson.id);
            return (
              <div
                key={lesson.id}
                className="flex items-center gap-4 rounded-xl border border-ink-600/70 bg-ink-800 px-4 py-3.5"
              >
                <div className="h-11 w-11 rounded-lg bg-ink-700 flex items-center justify-center text-lg shrink-0">
                  {lesson.thumbnail}
                </div>
                <Link to={`/lesson/${lesson.id}`} className="flex-1 min-w-0 group">
                  <p className="text-xs text-ash-500 font-mono truncate">
                    {lesson.course.name} · {lesson.teacher.name} · {lesson.chapter.name}
                  </p>
                  <p className="text-sm font-medium text-ash-200 group-hover:text-cue transition-colors truncate">
                    {lesson.title}
                  </p>
                </Link>
                <span className="timecode shrink-0">{lesson.duration}</span>
                {progress.completed && <span className="text-signal-done shrink-0">✓</span>}
                <Button variant="ghost" size="sm" onClick={() => toggleFavorite(lesson.id)}>
                  Bỏ lưu
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
