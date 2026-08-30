import { Input } from "../ui/Field";
import MathText from "../ui/MathText";
import type { Question, UserAnswer } from "../../types/exam";

interface QuestionAnswerInputProps {
  question: Question;
  answer: UserAnswer | undefined;
  onChange: (answer: UserAnswer) => void;
}

export default function QuestionAnswerInput({ question, answer, onChange }: QuestionAnswerInputProps) {
  if (question.type === "multiple_choice") {
    const selected = answer?.type === "multiple_choice" ? answer.selected : null;
    return (
      <div className="space-y-2.5" role="radiogroup" aria-label="Chọn 1 đáp án">
        {question.options?.map((opt) => (
          <label
            key={opt.id}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
              selected === opt.id
                ? "border-cue bg-cue/10 text-ash-200"
                : "border-ink-600 text-ash-300 hover:border-ink-500 hover:bg-ink-700/40"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              className="accent-[#F2B84B]"
              checked={selected === opt.id}
              onChange={() => onChange({ questionId: question.id, type: "multiple_choice", selected: opt.id })}
            />
            <span className="text-sm">
              <span className="font-semibold mr-1.5">{opt.id}.</span>
              <MathText text={opt.text} />
            </span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "true_false") {
    const selected = answer?.type === "true_false" ? answer.selected : {};
    return (
      <div className="space-y-2.5">
        {question.statements?.map((st) => (
          <div
            key={st.id}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-lg border border-ink-600 px-4 py-3"
          >
            <span className="text-sm text-ash-300 flex-1">
              <span className="font-semibold mr-1.5">{st.id})</span>
              <MathText text={st.text} />
            </span>
            <div className="flex gap-1.5 shrink-0">
              {(["Đúng", "Sai"] as const).map((label) => {
                const val = label === "Đúng";
                const active = selected[st.id] === val;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      onChange({
                        questionId: question.id,
                        type: "true_false",
                        selected: { ...selected, [st.id]: val },
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      active
                        ? val
                          ? "bg-signal-done/10 text-signal-done border-signal-done/40"
                          : "bg-signal-live/10 text-signal-live border-signal-live/40"
                        : "border-ink-600 text-ash-500 hover:text-ash-300"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // short_answer
  const value = answer?.type === "short_answer" ? answer.selected : "";
  return (
    <Input
      value={value}
      onChange={(e) => onChange({ questionId: question.id, type: "short_answer", selected: e.target.value })}
      placeholder="Nhập câu trả lời..."
    />
  );
}
