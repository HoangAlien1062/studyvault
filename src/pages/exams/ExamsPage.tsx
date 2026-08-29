import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import { Input } from "../../components/ui/Field";
import { useExamData, useExamDataReady } from "../../hooks/useExamData";
import { getCourse } from "../../lib/catalog";

// Ghi chú: "Ngân hàng câu hỏi" và "Tạo đề" giờ nằm trong khu vực quản
// trị (⚙ Cài đặt / /admin) — chỉ admin (nhập đúng mật khẩu) mới thấy.
// Trang này (dành cho mọi người) chỉ còn Làm bài + Xếp hạng.
const ACTIONS = [
  {
    icon: "🏆",
    title: "Xếp hạng",
    description: "So điểm với người khác",
    cta: "Xem bảng xếp hạng",
    to: "/exams/leaderboard",
  },
  {
    icon: "🕘",
    title: "Lịch sử làm bài",
    description: "Xem lại các lần bạn đã làm",
    cta: "Xem lịch sử",
    to: "/exams/history",
  },
];

export default function ExamsPage() {
  const navigate = useNavigate();
  const ready = useExamDataReady();
  const { exams } = useExamData();
  const [query, setQuery] = useState("");

  const filteredExams = exams.filter((e) => {
    const course = getCourse(e.courseId);
    const haystack = `${e.title} ${e.topic ?? ""} ${course?.name ?? ""}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <div className="container-page py-8 sm:py-12 space-y-10">
      <section>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ash-200">Kiểm tra</h1>
        <p className="mt-1.5 text-ash-400">Ôn luyện bằng AI và kiểm tra kiến thức của bạn.</p>
        <div className="mt-5 max-w-xl">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Tìm kiếm đề, môn học, chủ đề..."
          />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {ACTIONS.map((action) => (
          <Card key={action.title} className="flex flex-col gap-3">
            <div className="text-3xl">{action.icon}</div>
            <div>
              <h3 className="font-display font-semibold text-ash-200">{action.title}</h3>
              <p className="text-sm text-ash-400 mt-1">{action.description}</p>
            </div>
            <Button className="mt-1 self-start" onClick={() => navigate(action.to)}>
              {action.cta}
            </Button>
          </Card>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-ash-200">Đề kiểm tra</h2>
        </div>

        {!ready ? (
          <p className="text-sm text-ash-500">Đang tải...</p>
        ) : filteredExams.length === 0 ? (
          <EmptyState
            icon="📝"
            title="Chưa có đề kiểm tra"
            description="Đề kiểm tra sẽ được quản trị viên thêm sớm — quay lại sau nhé."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExams.map((exam) => {
              const course = getCourse(exam.courseId);
              return (
                <Card key={exam.id} className="space-y-3 cursor-pointer" onClick={() => navigate(`/exams/${exam.id}`)}>
                  <div className="flex items-center gap-2">
                    <Badge>{course?.shortName ?? "?"}</Badge>
                    {exam.topic && <Badge tone="cue">{exam.topic}</Badge>}
                  </div>
                  <h3 className="font-display font-semibold text-ash-200">{exam.title}</h3>
                  <p className="text-xs text-ash-500">
                    {exam.questionIds.length} câu
                    {exam.timeLimitMinutes ? ` · ${exam.timeLimitMinutes} phút` : " · không giới hạn"}
                  </p>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
