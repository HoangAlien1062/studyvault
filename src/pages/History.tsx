import { Link } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import { findLessonWithContext } from "../lib/catalog";
import { useHistory } from "../hooks/useUserData";

function formatRelativeTime(ms: number): string {
  const diff = Date.now() - ms;
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.round(hours / 24);
  return `${days} ngày trước`;
}

export default function History() {
  const { history, clearHistory } = useHistory();

  const entries = history
    .map((h) => ({ entry: h, lesson: findLessonWithContext(h.lessonId) }))
    .filter((x): x is { entry: (typeof history)[number]; lesson: NonNullable<ReturnType<typeof findLessonWithContext>> } =>
      Boolean(x.lesson)
    );

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Lịch sử xem" }]} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-ash-200">Lịch sử xem</h1>
        {entries.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearHistory}>
            Xóa lịch sử
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <EmptyState
          icon="🕘"
          title="Chưa có lịch sử xem"
          description="Các bài học bạn xem gần đây sẽ hiển thị ở đây."
        />
      ) : (
        <div className="space-y-2.5">
          {entries.map(({ entry, lesson }) => (
            <Link
              key={entry.lessonId}
              to={`/lesson/${lesson.id}`}
              className="flex items-center gap-4 rounded-xl border border-ink-600/70 bg-ink-800 px-4 py-3.5 hover:border-ink-500 hover:bg-ink-700/50 transition-all duration-200 group"
            >
              <div className="h-11 w-11 rounded-lg bg-ink-700 flex items-center justify-center text-lg shrink-0">
                {lesson.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ash-200 group-hover:text-cue transition-colors truncate">
                  {lesson.title}
                </p>
                <p className="text-xs text-ash-500 mt-0.5 truncate">
                  {lesson.course.shortName} · {lesson.teacher.name} · {formatRelativeTime(entry.watchedAt)}
                </p>
                <div className="mt-2 max-w-xs">
                  <ProgressBar value={entry.progress} showLabel size="sm" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
