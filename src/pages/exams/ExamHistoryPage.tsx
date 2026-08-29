import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { useExamData, useExamDataReady, useMyExamAttemptIds } from "../../hooks/useExamData";
import { getCourse } from "../../lib/catalog";

export default function ExamHistoryPage() {
  const navigate = useNavigate();
  const ready = useExamDataReady();
  const { exams, attempts } = useExamData();
  const { myAttemptIds } = useMyExamAttemptIds();

  const myAttempts = myAttemptIds
    .map((id) => attempts.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .sort((a, b) => b.submittedAt - a.submittedAt);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Kiểm tra", to: "/exams" }, { label: "Lịch sử" }]} />
      <h1 className="text-xl font-display font-bold text-ash-200">Lịch sử kiểm tra</h1>

      {!ready ? (
        <p className="text-sm text-ash-500">Đang tải...</p>
      ) : myAttempts.length === 0 ? (
        <EmptyState
          icon="🕘"
          title="Chưa có lịch sử kiểm tra"
          description="Hoàn thành một bài kiểm tra để xem lại kết quả ở đây."
          action={<Button onClick={() => navigate("/exams")}>Làm bài kiểm tra</Button>}
        />
      ) : (
        <div className="space-y-3">
          {myAttempts.map((attempt) => {
            const exam = exams.find((e) => e.id === attempt.examId);
            const course = exam ? getCourse(exam.courseId) : undefined;
            return (
              <Card
                key={attempt.id}
                className="flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => exam && navigate(`/exams/${exam.id}/result/${attempt.id}`)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {course && <Badge>{course.shortName}</Badge>}
                    {exam?.topic && <Badge tone="cue">{exam.topic}</Badge>}
                  </div>
                  <p className="font-medium text-ash-200 truncate">{exam?.title ?? "Đề đã bị xóa"}</p>
                  <p className="text-xs text-ash-500 mt-0.5">
                    {attempt.results.length} câu · {Math.round(attempt.timeSpentSeconds / 60)} phút ·{" "}
                    {new Date(attempt.submittedAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <p className="font-mono text-lg font-semibold text-cue shrink-0">
                  {attempt.normalizedScore.toFixed(1)}/10
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
