import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { DIFFICULTY_LABEL, QUESTION_TYPE_LABEL, type Question } from "../../types/exam";
import { getCourse } from "../../lib/catalog";

const DIFFICULTY_TONE = { easy: "done", medium: "cue", hard: "live" } as const;

interface QuestionCardProps {
  question: Question;
  onEdit: () => void;
  onDelete: () => void;
  onApprove?: () => void;
}

export default function QuestionCard({ question, onEdit, onDelete, onApprove }: QuestionCardProps) {
  const course = getCourse(question.courseId);

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{course?.shortName ?? "?"}</Badge>
        <Badge>{question.topic}</Badge>
        <Badge tone="cue">{QUESTION_TYPE_LABEL[question.type]}</Badge>
        <Badge tone={DIFFICULTY_TONE[question.difficulty]}>{DIFFICULTY_LABEL[question.difficulty]}</Badge>
        {question.source === "ai" && <Badge tone="live">🧠 AI</Badge>}
        {question.status === "draft" && <Badge tone="live">Chưa duyệt</Badge>}
        {question.status === "reviewed" && <Badge tone="cue">Đã xem, chưa publish</Badge>}
      </div>

      <p className="text-sm text-ash-200 leading-relaxed">{question.question}</p>

      {question.type === "multiple_choice" && question.options && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-ash-400">
          {question.options.map((opt) => (
            <li
              key={opt.id}
              className={opt.id === question.correctAnswer ? "text-signal-done font-medium" : ""}
            >
              {opt.id}. {opt.text}
            </li>
          ))}
        </ul>
      )}

      {question.type === "true_false" && question.statements && (
        <ul className="space-y-1 text-xs text-ash-400">
          {question.statements.map((st) => (
            <li key={st.id}>
              {st.id}) {st.text} —{" "}
              <span className={st.correctAnswer ? "text-signal-done" : "text-signal-live"}>
                {st.correctAnswer ? "Đúng" : "Sai"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {question.type === "short_answer" && (
        <p className="text-xs text-ash-400">
          Đáp án: <span className="text-signal-done">{question.acceptedAnswers?.join(", ")}</span>
        </p>
      )}

      <div className="flex items-center gap-2 pt-1">
        <Button variant="secondary" size="sm" onClick={onEdit}>
          Sửa
        </Button>
        {question.status !== "published" && onApprove && (
          <Button variant="primary" size="sm" onClick={onApprove}>
            ✓ Duyệt & đưa vào đề
          </Button>
        )}
        <Button variant="danger" size="sm" onClick={onDelete}>
          Xóa
        </Button>
      </div>
    </Card>
  );
}
