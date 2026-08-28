import { Link } from "react-router-dom";
import type { LessonWithContext } from "../../types";
import EmptyState from "../ui/EmptyState";

export default function SearchResults({
  results,
  query,
}: {
  results: LessonWithContext[];
  query: string;
}) {
  if (results.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Không tìm thấy kết quả"
        description={
          query
            ? `Không có bài học nào khớp với "${query}". Thử từ khóa khác hoặc bỏ bớt bộ lọc.`
            : "Nhập từ khóa để tìm môn học, giáo viên, chương hoặc bài học."
        }
      />
    );
  }

  return (
    <div>
      <p className="text-sm text-ash-500 mb-4 font-mono">{results.length} kết quả</p>
      <div className="space-y-2.5">
        {results.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/lesson/${lesson.id}`}
            className="flex items-center gap-4 rounded-xl border border-ink-600/70 bg-ink-800 px-4 py-3.5 hover:border-ink-500 hover:bg-ink-700/50 transition-all duration-200 group"
          >
            <div className="h-10 w-10 rounded-lg bg-ink-700 flex items-center justify-center text-lg shrink-0">
              {lesson.thumbnail}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-ash-500 font-mono truncate">
                {lesson.course.name} / {lesson.teacher.name} / {lesson.chapter.name}
              </p>
              <p className="text-sm font-medium text-ash-200 mt-0.5 truncate group-hover:text-cue transition-colors">
                {lesson.title}
              </p>
            </div>
            <div className="timecode shrink-0">{lesson.duration}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
