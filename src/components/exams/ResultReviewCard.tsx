import Card from "../ui/Card";
import Badge from "../ui/Badge";
import MathText from "../ui/MathText";
import type { AnswerResult, Question, UserAnswer } from "../../types/exam";

interface ResultReviewCardProps {
  index: number;
  question: Question;
  answer: UserAnswer | undefined;
  result: AnswerResult;
}

export default function ResultReviewCard({ index, question, answer, result }: ResultReviewCardProps) {
  const tone = result.isUnanswered ? "neutral" : result.isCorrect ? "done" : "live";
  const label = result.isUnanswered ? "○ Bỏ trống" : result.isCorrect ? "✓ Chính xác" : "✗ Sai";

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-ash-200">Câu {index + 1}</span>
        <div className="flex items-center gap-2">
          {question.type === "true_false" && (
            <Badge tone="neutral">
              {result.correctCount ?? 0} / {question.statements?.length ?? 4} ý
            </Badge>
          )}
          <Badge tone={tone as "neutral" | "done" | "live"}>{label}</Badge>
          <span className="timecode">{result.points.toFixed(2)} / 1.00</span>
        </div>
      </div>

      <p className="text-sm text-ash-200">
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
        <ul className="space-y-1 text-sm">
          {question.options.map((opt) => {
            const isSelected = answer?.type === "multiple_choice" && answer.selected === opt.id;
            const isAnswerKey = opt.id === question.correctAnswer;
            return (
              <li
                key={opt.id}
                className={`px-3 py-1.5 rounded-lg border ${
                  isAnswerKey
                    ? "border-signal-done/40 bg-signal-done/10 text-signal-done"
                    : isSelected
                    ? "border-signal-live/40 bg-signal-live/10 text-signal-live"
                    : "border-transparent text-ash-400"
                }`}
              >
                {opt.id}. <MathText text={opt.text} />
                {isAnswerKey && " — đáp án đúng"}
                {isSelected && !isAnswerKey && " — bạn chọn"}
              </li>
            );
          })}
        </ul>
      )}

      {question.type === "true_false" && question.statements && (
        <ul className="space-y-1 text-sm">
          {question.statements.map((st) => {
            const userVal = answer?.type === "true_false" ? answer.selected[st.id] : undefined;
            const correct = userVal === st.correctAnswer;
            return (
              <li key={st.id} className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border border-ink-600">
                <span className="text-ash-300">
                  {st.id}) <MathText text={st.text} />
                </span>
                <span className={correct ? "text-signal-done" : "text-signal-live"}>
                  {userVal === undefined ? "○" : correct ? "✓" : "✗"} {st.correctAnswer ? "Đúng" : "Sai"}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {question.type === "short_answer" && (
        <div className="text-sm space-y-1">
          <p className="text-ash-400">
            Bạn trả lời:{" "}
            <span className={result.isCorrect ? "text-signal-done" : "text-signal-live"}>
              {(answer?.type === "short_answer" && answer.selected) || "(bỏ trống)"}
            </span>
          </p>
          <p className="text-ash-400">
            Đáp án đúng: <span className="text-signal-done">{question.acceptedAnswers?.join(" / ")}</span>
          </p>
        </div>
      )}

      {question.explanation && (
        <p className="text-xs text-ash-500 border-t border-ink-600 pt-2">
          <span className="font-medium text-ash-400">Giải thích: </span>
          {question.explanation}
        </p>
      )}
    </Card>
  );
}
