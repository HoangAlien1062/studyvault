import { useNavigate } from "react-router-dom";
import { siteConfig } from "../config/site";
import SearchBar from "../components/search/SearchBar";
import CourseGrid from "../components/courses/CourseGrid";
import LessonCard from "../components/lessons/LessonCard";
import EmptyState from "../components/ui/EmptyState";
import { getAllCourses, findLessonWithContext } from "../lib/catalog";
import { useHistory, useProgress } from "../hooks/useUserData";

export default function Home() {
  const navigate = useNavigate();
  const courses = getAllCourses();
  const { history } = useHistory();
  const { getProgress } = useProgress();

  const continueWatching = history
    .filter((h) => !getProgress(h.lessonId).completed)
    .slice(0, 4)
    .map((h) => ({ lesson: findLessonWithContext(h.lessonId), progress: getProgress(h.lessonId).progress }))
    .filter((x): x is { lesson: NonNullable<ReturnType<typeof findLessonWithContext>>; progress: number } =>
      Boolean(x.lesson)
    );

  return (
    <div className="container-page py-8 sm:py-12 space-y-12">
      <section className="text-center max-w-2xl mx-auto pt-4 sm:pt-8">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-ash-200">
          {siteConfig.tagline}
        </h1>
        <p className="mt-3 text-ash-400">{siteConfig.description}</p>
        <div className="mt-7 max-w-xl mx-auto">
          <SearchBar
            size="hero"
            onSearch={(q) => q && navigate(`/search?q=${encodeURIComponent(q)}`)}
            placeholder="Tìm kiếm bài học, giáo viên, chủ đề..."
          />
        </div>
      </section>

      {continueWatching.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-ash-200">Tiếp tục học</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {continueWatching.map(({ lesson, progress }) => (
              <LessonCard key={lesson.id} lesson={lesson} progress={progress} />
            ))}
          </div>
        </section>
      )}

      {continueWatching.length === 0 && (
        <EmptyState
          icon="🎬"
          title="Chưa có bài học nào đang xem"
          description="Bắt đầu học một bài để thấy tiến độ của bạn ở đây."
        />
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-ash-200">📝 Kiểm tra</h2>
          <button onClick={() => navigate("/exams")} className="text-sm text-cue hover:underline">
            Xem tất cả →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <button
            onClick={() => navigate("/exams")}
            className="text-left rounded-xl border border-ink-600 bg-ink-800/40 p-5 hover:border-cue/50 transition-colors"
          >
            <div className="text-2xl mb-2">✏️</div>
            <p className="font-display font-semibold text-ash-200">Làm bài kiểm tra</p>
            <p className="text-sm text-ash-500 mt-1">Chọn đề theo môn học và bắt đầu ngay</p>
          </button>
          <button
            onClick={() => navigate("/exams/leaderboard")}
            className="text-left rounded-xl border border-ink-600 bg-ink-800/40 p-5 hover:border-cue/50 transition-colors"
          >
            <div className="text-2xl mb-2">🏆</div>
            <p className="font-display font-semibold text-ash-200">Bảng xếp hạng</p>
            <p className="text-sm text-ash-500 mt-1">Xem điểm số của bạn và mọi người</p>
          </button>
          <button
            onClick={() => navigate("/exams/history")}
            className="text-left rounded-xl border border-ink-600 bg-ink-800/40 p-5 hover:border-cue/50 transition-colors"
          >
            <div className="text-2xl mb-2">📜</div>
            <p className="font-display font-semibold text-ash-200">Lịch sử làm bài</p>
            <p className="text-sm text-ash-500 mt-1">Xem lại các đề đã làm trước đây</p>
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-ash-200">Khóa học / Môn học</h2>
        </div>
        <CourseGrid courses={courses} />
      </section>
    </div>
  );
}
