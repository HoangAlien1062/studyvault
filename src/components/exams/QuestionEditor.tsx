import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { FieldGroup, Input, Select, Textarea } from "../ui/Field";
import type { Course } from "../../types";
import type { Difficulty, Question, QuestionType, TrueFalseStatement } from "../../types/exam";
import type { QuestionInput } from "../../lib/examStore";

const emptyStatements = (): TrueFalseStatement[] => [
  { id: "a", text: "", correctAnswer: true },
  { id: "b", text: "", correctAnswer: true },
  { id: "c", text: "", correctAnswer: true },
  { id: "d", text: "", correctAnswer: true },
];

interface QuestionEditorProps {
  courses: Course[];
  initial?: Question;
  onCancel: () => void;
  onSave: (input: QuestionInput) => void;
}

export default function QuestionEditor({ courses, initial, onCancel, onSave }: QuestionEditorProps) {
  const [courseId, setCourseId] = useState(initial?.courseId ?? courses[0]?.id ?? "");
  const [topic, setTopic] = useState(initial?.topic ?? "");
  const [type, setType] = useState<QuestionType>(initial?.type ?? "multiple_choice");
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? "medium");
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [explanation, setExplanation] = useState(initial?.explanation ?? "");

  const [options, setOptions] = useState(
    initial?.options ?? [
      { id: "A", text: "" },
      { id: "B", text: "" },
      { id: "C", text: "" },
      { id: "D", text: "" },
    ]
  );
  const [correctAnswer, setCorrectAnswer] = useState(initial?.correctAnswer ?? "A");
  const [statements, setStatements] = useState<TrueFalseStatement[]>(
    initial?.statements ?? emptyStatements()
  );
  const [acceptedAnswers, setAcceptedAnswers] = useState(
    (initial?.acceptedAnswers ?? [""]).join(", ")
  );

  const canSave = courseId && topic.trim() && question.trim();

  function handleSubmit() {
    if (!canSave) return;
    const base = {
      courseId,
      topic: topic.trim(),
      type,
      question: question.trim(),
      difficulty,
      explanation: explanation.trim() || undefined,
      source: initial?.source ?? ("user" as const),
      status: initial?.status ?? ("published" as const),
      documentId: initial?.documentId,
    };

    if (type === "multiple_choice") {
      onSave({ ...base, options, correctAnswer });
    } else if (type === "true_false") {
      onSave({ ...base, statements });
    } else {
      onSave({
        ...base,
        acceptedAnswers: acceptedAnswers
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    }
  }

  return (
    <Card className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FieldGroup label="Môn học">
          <Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </FieldGroup>
        <FieldGroup label="Chủ đề">
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Vd: Hàm số" />
        </FieldGroup>
        <FieldGroup label="Độ khó">
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </Select>
        </FieldGroup>
      </div>

      <FieldGroup label="Loại câu hỏi">
        <Select value={type} onChange={(e) => setType(e.target.value as QuestionType)}>
          <option value="multiple_choice">Trắc nghiệm (4 đáp án)</option>
          <option value="true_false">Đúng / Sai (4 ý)</option>
          <option value="short_answer">Trả lời ngắn</option>
        </Select>
      </FieldGroup>

      <FieldGroup label="Nội dung câu hỏi">
        <Textarea rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
      </FieldGroup>

      {type === "multiple_choice" && (
        <div className="space-y-2">
          {options.map((opt, idx) => (
            <div key={opt.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCorrectAnswer(opt.id)}
                className={`shrink-0 h-8 w-8 rounded-lg border text-xs font-mono font-semibold transition-colors ${
                  correctAnswer === opt.id
                    ? "bg-cue text-ink-950 border-cue"
                    : "border-ink-600 text-ash-400 hover:border-cue/50"
                }`}
                title="Chọn làm đáp án đúng"
              >
                {opt.id}
              </button>
              <Input
                value={opt.text}
                onChange={(e) => {
                  const next = [...options];
                  next[idx] = { ...opt, text: e.target.value };
                  setOptions(next);
                }}
                placeholder={`Đáp án ${opt.id}`}
              />
            </div>
          ))}
          <p className="text-xs text-ash-500">Bấm vào chữ cái để đánh dấu đáp án đúng.</p>
        </div>
      )}

      {type === "true_false" && (
        <div className="space-y-2">
          {statements.map((st, idx) => (
            <div key={st.id} className="flex items-center gap-2">
              <span className="shrink-0 w-6 text-xs font-mono text-ash-500">{st.id})</span>
              <Input
                value={st.text}
                onChange={(e) => {
                  const next = [...statements];
                  next[idx] = { ...st, text: e.target.value };
                  setStatements(next);
                }}
                placeholder={`Ý ${st.id}`}
              />
              <div className="flex shrink-0 gap-1">
                {(["Đúng", "Sai"] as const).map((label) => {
                  const val = label === "Đúng";
                  const active = st.correctAnswer === val;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        const next = [...statements];
                        next[idx] = { ...st, correctAnswer: val };
                        setStatements(next);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
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
      )}

      {type === "short_answer" && (
        <FieldGroup label="Đáp án chấp nhận (cách nhau bằng dấu phẩy)">
          <Input
            value={acceptedAnswers}
            onChange={(e) => setAcceptedAnswers(e.target.value)}
            placeholder="Vd: 2, 2.0, 2,0"
          />
        </FieldGroup>
      )}

      <FieldGroup label="Giải thích (tùy chọn)">
        <Textarea rows={2} value={explanation} onChange={(e) => setExplanation(e.target.value)} />
      </FieldGroup>

      <div className="flex items-center gap-2 pt-1">
        <Button onClick={handleSubmit} disabled={!canSave}>
          Lưu câu hỏi
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Hủy
        </Button>
      </div>
    </Card>
  );
}
