import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { Input } from "../components/ui/Field";
import { useExamData, useExamDataReady } from "../hooks/useExamData";
import { useAuth } from "../hooks/useAuth";
import { getCourse } from "../lib/catalog";

// Trang chủ giờ chỉ xoay quanh Kiểm tra — không còn phần video/khóa
// học/tìm kiếm chung nữa (những phần đó vẫn có thể truy cập qua các
// mục khác trong Sidebar nếu cần).
export default function Home() {
  const navigate = useNavigate();
  const ready = useExamDataReady();
  const { exams } = useExamData();
  const { user, isAdmin } = useAuth();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [courseFilter, setCourseFilter] = useState("all");

  // Chỉ hiện đề công khai, hoặc đề riêng tư của chính mình. Admin thấy hết.
  const visibleExams = useMemo(() => {
    if (isAdmin) return exams;
    return exams.filter((e) => e.visibility !== "private" || e.ownerId === user?.id);
  }, [exams, isAdmin, user?.id]);

  const courseOptions = useMemo(() => {
    const ids = Array.from(new Set(visibleExams.map((e) => e.courseId)));
    return ids.map((id) => getCourse(id)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [visibleExams]);

  const filteredExams = useMemo(() => {
    return visibleExams.filter((e) => {
      if (courseFilter !== "all" && e.courseId !== courseFilter) return false;
      const course = getCourse(e.courseId);
      const haystack = `${e.title} ${e.topic ?? ""} ${course?.name ?? ""}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [visibleExams, query, courseFilter]);

  return (
    <div className="container-page py-8 sm:py-12 space-y-8">
      <section className="text-center max-w-xl mx-auto pt-2 sm:pt-6">
        <div className="text-4xl mb-2">📝</div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ash-200">Ôn luyện & Kiểm tra</h1>
        <p className="mt-2 text-ash-400">Chọn đề, làm bài và theo dõi tiến bộ của bạn.</p>
      </section>

      {/* Gộp mọi lối tắt vào một khu vực duy nhất */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => navigate("/exams/create")}
          className="flex flex-col items-center gap-2 rounded-xl border border-cue/40 bg-cue/10 px-4 py-5 hover:border-cue/70 hover:bg-cue/15 transition-colors"
        >
          <span className="text-2xl">➕</span>
          <span className="text-sm font-medium text-cue">Tạo đề mới</span>
        </button>
        <button
          onClick={() => navigate("/exams/leaderboard")}
          className="flex flex-col items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/40 px-4 py-5 hover:border-cue/50 hover:bg-ink-800/70 transition-colors"
        >
          <span className="text-2xl">🏆</span>
          <span className="text-sm font-medium text-ash-200">Xếp hạng</span>
        </button>
        <button
          onClick={() => navigate("/exams/history")}
          className="flex flex-col items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/40 px-4 py-5 hover:border-cue/50 hover:bg-ink-800/70 transition-colors"
        >
          <span className="text-2xl">🕘</span>
          <span className="text-sm font-medium text-ash-200">Lịch sử làm bài</span>
        </button>
        <button
          onClick={() => setCourseFilter("all")}
          className="flex flex-col items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/40 px-4 py-5 hover:border-cue/50 hover:bg-ink-800/70 transition-colors"
        >
          <span className="text-2xl">📚</span>
          <span className="text-sm font-medium text-ash-200">Tất cả đề</span>
        </button>
      </section>

      {/* Bộ lọc đề kiểm tra */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Tìm đề theo tên, chủ đề, môn học..."
            className="sm:flex-1"
          />
          {courseOptions.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setCourseFilter("all")}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                  courseFilter === "all"
                    ? "border-cue bg-cue/10 text-cue"
                    : "border-ink-600 text-ash-400 hover:text-ash-200"
                }`}
              >
                Tất cả
              </button>
              {courseOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCourseFilter(c.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                    courseFilter === c.id
                      ? "border-cue bg-cue/10 text-cue"
                      : "border-ink-600 text-ash-400 hover:text-ash-200"
                  }`}
                >
                  {c.shortName ?? c.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {!ready ? (
          <p className="text-sm text-ash-500">Đang tải...</p>
        ) : filteredExams.length === 0 ? (
          <EmptyState
            icon="📝"
            title={exams.length === 0 ? "Chưa có đề kiểm tra" : "Không tìm thấy đề phù hợp"}
            description={
              exams.length === 0
                ? "Đề kiểm tra sẽ được quản trị viên thêm sớm — quay lại sau nhé."
                : "Thử đổi từ khóa tìm kiếm hoặc bộ lọc môn học."
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.map((exam) => {
              const course = getCourse(exam.courseId);
              return (
                <Card
                  key={exam.id}
                  className="space-y-3 cursor-pointer hover:border-cue/50 transition-colors"
                  onClick={() => navigate(`/exams/${exam.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <Badge>{course?.shortName ?? "?"}</Badge>
                    {exam.topic && <Badge tone="cue">{exam.topic}</Badge>}
                    {exam.visibility === "private" && <Badge>🔒 Riêng tư</Badge>}
                  </div>
                  <h3 className="font-display font-semibold text-ash-200 leading-snug">{exam.title}</h3>
                  <p className="text-xs text-ash-500">
                    {exam.questionIds.length} câu
                    {exam.timeLimitMinutes ? ` · ${exam.timeLimitMinutes} phút` : " · không giới hạn"}
                  </p>
                  <Button size="sm" className="w-full mt-1">
                    Bắt đầu làm bài
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
