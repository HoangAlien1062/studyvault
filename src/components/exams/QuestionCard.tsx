import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import MathText from "../ui/MathText";
import { DIFFICULTY_LABEL, QUESTION_TYPE_LABEL, type Question } from "../../types/exam";
import { getCourse } from "../../lib/catalog";

const DIFFICULTY_TONE = { easy: "done", medium: "cue", hard: "live" } as const;

interface QuestionCardProps {
  question: Question;
  onEdit?: () => void;
  onDelete?: () => void;
  onApprove?: () => void;
  onDispute?: () => void;
  isOwner?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelected?: () => void;
}

export default function QuestionCard({
  question,
  onEdit,
  onDelete,
  onApprove,
  onDispute,
  isOwner,
  selectable,
  selected,
  onToggleSelected,
}: QuestionCardProps) {
  const course = getCourse(question.courseId);

  return (
    <Card className={`space-y-3 relative ${selectable && selected ? "ring-2 ring-cue" : ""}`}>
      {selectable && (
        <label className="absolute top-3 right-3 z-10">
          <input
            type="checkbox"
            checked={Boolean(selected)}
            onChange={onToggleSelected}
            className="h-5 w-5 accent-cue cursor-pointer"
            aria-label="Chọn câu hỏi này"
          />
        </label>
      )}
      <div className="flex flex-wrap items-center gap-2 pr-8">
        <Badge>{course?.shortName ?? "?"}</Badge>
        <Badge>{question.topic}</Badge>
        <Badge tone="cue">{QUESTION_TYPE_LABEL[question.type]}</Badge>
        <Badge tone={DIFFICULTY_TONE[question.difficulty]}>{DIFFICULTY_LABEL[question.difficulty]}</Badge>
        {question.source === "ai" && <Badge tone="live">🧠 AI</Badge>}
        {question.status === "draft" && <Badge tone="live">Chưa duyệt</Badge>}
        {question.status === "reviewed" && <Badge tone="cue">Đã xem, chưa publish</Badge>}
        {question.visibility === "private" && <Badge>🔒 Riêng tư</Badge>}
        {isOwner && <Badge tone="cue">Của bạn</Badge>}
        {(!question.aiReviewStatus || question.aiReviewStatus === "unreviewed") && (
          <Badge>⏳ Chờ AI rà soát</Badge>
        )}
        {question.aiReviewStatus === "flagged" && !question.aiReviewDisputed && (
          <Badge tone="live">🚩 AI nghi ngờ sai</Badge>
        )}
        {question.aiReviewStatus === "flagged" && question.aiReviewDisputed && (
          <Badge tone="live">🚩 Chờ admin xem lại</Badge>
        )}
      </div>

      {question.aiReviewStatus === "flagged" && question.aiReviewNote && (
        <div className="rounded-lg border border-signal-live/30 bg-signal-live/10 px-3.5 py-2.5 text-xs text-ash-300">
          <p className="text-signal-live font-medium mb-1">🚩 AI nghi ngờ câu này có vấn đề:</p>
          <p>{question.aiReviewNote}</p>
          {!question.aiReviewDisputed && (isOwner || Boolean(onEdit)) && onDispute && (
            <div className="flex gap-2 mt-2">
              <Button variant="ghost" size="sm" onClick={onDispute}>
                Tôi chắc chắn đúng — báo admin xem lại
              </Button>
            </div>
          )}
        </div>
      )}

      <p className="text-sm text-ash-200 leading-relaxed">
        <MathText text={question.question} />
      </p>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Ảnh minh họa câu hỏi"
          className="max-h-56 rounded-lg border border-ink-600"
        />
      )}

      {question.type === "multiple_choice" && question.options && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-ash-400">
          {question.options.map((opt) => (
            <li
              key={opt.id}
              className={opt.id === question.correctAnswer ? "text-signal-done font-medium" : ""}
            >
              {opt.id}. <MathText text={opt.text} />
            </li>
          ))}
        </ul>
      )}

      {question.type === "true_false" && question.statements && (
        <ul className="space-y-1 text-xs text-ash-400">
          {question.statements.map((st) => (
            <li key={st.id}>
              {st.id}) <MathText text={st.text} /> —{" "}
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
        {onEdit && (
          <Button variant="secondary" size="sm" onClick={onEdit}>
            Sửa
          </Button>
        )}
        {question.status !== "published" && onApprove && (
          <Button variant="primary" size="sm" onClick={onApprove}>
            ✓ Duyệt & đưa vào đề
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" size="sm" onClick={onDelete}>
            Xóa
          </Button>
        )}
        {!onEdit && !onDelete && <p className="text-xs text-ash-500">Câu hỏi của người dùng khác</p>}
      </div>
    </Card>
  );
}
