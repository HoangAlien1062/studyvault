import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ResultReviewCard from "../../components/exams/ResultReviewCard";
import { useExamData, useExamDataReady } from "../../hooks/useExamData";

export default function ExamResultPage() {
  const { examId = "", attemptId = "" } = useParams();
  const navigate = useNavigate();
  const ready = useExamDataReady();
  const { exams, questions, attempts } = useExamData();

  if (!ready) return <div className="container-page py-10 text-sm text-ash-500">Đang tải...</div>;

  const exam = exams.find((e) => e.id === examId);
  const attempt = attempts.find((a) => a.id === attemptId);

  if (!exam || !attempt) {
    return (
      <div className="container-page py-10">
        <p className="text-ash-400">Không tìm thấy kết quả này.</p>
        <Button className="mt-4" onClick={() => navigate("/exams")}>
          Quay lại
        </Button>
      </div>
    );
  }

  const byId = new Map(questions.map((q) => [q.id, q]));
  const answerByQuestion = new Map(attempt.answers.map((a) => [a.questionId, a]));

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Kiểm tra", to: "/exams" }, { label: exam.title, to: `/exams/${exam.id}` }, { label: "Kết quả" }]} />

      <Card className="text-center space-y-4 max-w-lg mx-auto">
        <p className="text-3xl">🎉</p>
        <h1 className="text-lg font-display font-semibold text-ash-200">Hoàn thành!</h1>
        <p className="text-4xl font-display font-bold text-cue">
          {attempt.normalizedScore.toFixed(1)} <span className="text-lg text-ash-500">/ 10</span>
        </p>
        <p className="text-xs text-ash-500 font-mono">
          {attempt.earnedPoints.toFixed(2)} / {attempt.maxPoints.toFixed(2)} điểm
        </p>
        <div className="flex justify-center gap-6 text-sm pt-2">
          <div>
            <p className="text-signal-done font-semibold">{attempt.correctCount}</p>
            <p className="text-xs text-ash-500">Đúng</p>
          </div>
          <div>
            <p className="text-signal-live font-semibold">{attempt.wrongCount}</p>
            <p className="text-xs text-ash-500">Sai</p>
          </div>
          <div>
            <p className="text-ash-400 font-semibold">{attempt.unansweredCount}</p>
            <p className="text-xs text-ash-500">Bỏ trống</p>
          </div>
          <div>
            <p className="text-ash-400 font-semibold">
              {Math.floor(attempt.timeSpentSeconds / 60)}:{(attempt.timeSpentSeconds % 60).toString().padStart(2, "0")}
            </p>
            <p className="text-xs text-ash-500">Thời gian</p>
          </div>
        </div>
        <div className="flex gap-2 justify-center pt-2">
          <Button variant="secondary" onClick={() => navigate("/exams/leaderboard")}>
            🏆 Xếp hạng
          </Button>
          <Button variant="ghost" onClick={() => navigate("/exams/history")}>
            Lịch sử kiểm tra
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-ash-200">Xem lại đáp án</h2>
        {attempt.results.map((result, idx) => {
          const question = byId.get(result.questionId);
          if (!question) return null;
          return (
            <ResultReviewCard
              key={result.questionId}
              index={idx}
              question={question}
              answer={answerByQuestion.get(result.questionId)}
              result={result}
            />
          );
        })}
      </div>
    </div>
  );
}
