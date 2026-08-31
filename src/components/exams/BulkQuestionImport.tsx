import { useMemo, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { FieldGroup, Select, Textarea } from "../ui/Field";
import type { Course } from "../../types";
import type { Difficulty, QuestionType, TrueFalseStatement } from "../../types/exam";
import { createQuestion } from "../../lib/examStore";

const OPTION_IDS = ["A", "B", "C", "D"] as const;
const STATEMENT_IDS = ["a", "b", "c", "d"] as const;

const PLACEHOLDERS: Record<QuestionType, string> = {
  multiple_choice: `Cho hàm số f(x) = x^2, giá trị f(2) là?~ 2~ 4~ 6~ 8~ 4
Thủ đô của Việt Nam là?~ Hà Nội~ Huế~ Đà Nẵng~ TP.HCM~ Hà Nội`,
  true_false: `Thủ đô của Việt Nam là?~ Hà Nội~ Huế~ Đà Nẵng~ TP.HCM~ Hà Nội
Thủ đô của Việt Nam là?~ Hà Nội~ Huế~ Đà Nẵng~ TP.HCM~ Hà Nội~ Huế`,
  short_answer: `1 + 1 = ?~ 2
Thủ đô của Việt Nam là gì?~ Hà Nội~ Ha Noi`,
};

const FORMAT_HINT: Record<QuestionType, string> = {
  multiple_choice:
    "Câu hỏi~ Đáp án 1~ Đáp án 2~ Đáp án 3~ Đáp án 4~ Đáp án đúng — phần cuối ghi lại đúng nội dung đáp án đúng.",
  true_false:
    "Câu hỏi~ Ý a~ Ý b~ Ý c~ Ý d~ [các ý đúng] — sau 4 ý, liệt kê tiếp (0-4 lần) đúng nội dung những ý ĐÚNG. Ý nào không được liệt kê coi là Sai. Vd chỉ 1 ý đúng: liệt kê 1 lần; 2 ý đúng: liệt kê 2 lần...",
  short_answer:
    "Câu hỏi~ Đáp án chấp nhận 1~ Đáp án chấp nhận 2 (tùy chọn)... — có thể liệt kê nhiều cách viết đáp án đúng.",
};

interface ParsedRow {
  line: number;
  raw: string;
  question?: string;
  options?: string[];
  correctIndex?: number;
  statements?: TrueFalseStatement[];
  acceptedAnswers?: string[];
  error?: string;
}

// Tách bằng "~" — an toàn khi đáp án chứa dấu phẩy (vd số thập phân "1,5").
function splitLine(line: string): string[] {
  return line.split("~").map((part) => part.trim());
}

function parseMultipleChoice(parts: string[], line: number, raw: string): ParsedRow {
  if (parts.length !== 6) {
    return {
      line,
      raw,
      error: `Cần đúng 6 phần (câu hỏi, 4 đáp án, đáp án đúng) — tìm thấy ${parts.length}`,
    };
  }
  const [question, ...rest] = parts;
  const options = rest.slice(0, 4);
  const correctText = rest[4];

  if (!question) return { line, raw, error: "Thiếu nội dung câu hỏi" };
  if (options.some((o) => !o)) return { line, raw, error: "Thiếu một trong 4 đáp án" };
  if (!correctText) return { line, raw, error: "Thiếu đáp án đúng ở cuối dòng" };

  const correctIndex = options.findIndex((o) => o.toLowerCase() === correctText.toLowerCase());
  if (correctIndex === -1) {
    return { line, raw, error: `Đáp án đúng "${correctText}" không khớp với 4 đáp án đã nhập` };
  }
  return { line, raw, question, options, correctIndex };
}

function parseTrueFalse(parts: string[], line: number, raw: string): ParsedRow {
  if (parts.length < 5) {
    return {
      line,
      raw,
      error: `Cần ít nhất 5 phần (câu hỏi + 4 ý a/b/c/d) — tìm thấy ${parts.length}`,
    };
  }
  if (parts.length > 9) {
    return { line, raw, error: `Quá nhiều phần (tối đa 4 ý đúng được liệt kê) — tìm thấy ${parts.length}` };
  }
  const [question, ...rest] = parts;
  const statementTexts = rest.slice(0, 4);
  const correctTexts = rest.slice(4);

  if (!question) return { line, raw, error: "Thiếu nội dung câu hỏi" };
  if (statementTexts.some((s) => !s)) return { line, raw, error: "Thiếu một trong 4 ý a/b/c/d" };

  const usedIndexes = new Set<number>();
  for (const ct of correctTexts) {
    const idx = statementTexts.findIndex(
      (s, i) => s.toLowerCase() === ct.toLowerCase() && !usedIndexes.has(i)
    );
    if (idx === -1) {
      return { line, raw, error: `Ý đúng "${ct}" không khớp với 4 ý a/b/c/d đã nhập` };
    }
    usedIndexes.add(idx);
  }

  const statements: TrueFalseStatement[] = statementTexts.map((text, i) => ({
    id: STATEMENT_IDS[i],
    text,
    correctAnswer: usedIndexes.has(i),
  }));

  return { line, raw, question, statements };
}

function parseShortAnswer(parts: string[], line: number, raw: string): ParsedRow {
  if (parts.length < 2) {
    return { line, raw, error: "Cần ít nhất 2 phần (câu hỏi + đáp án)" };
  }
  const [question, ...rest] = parts;
  const acceptedAnswers = rest.filter(Boolean);
  if (!question) return { line, raw, error: "Thiếu nội dung câu hỏi" };
  if (acceptedAnswers.length === 0) return { line, raw, error: "Thiếu đáp án" };
  return { line, raw, question, acceptedAnswers };
}

function parseLine(raw: string, line: number, type: QuestionType): ParsedRow {
  if (!raw.trim()) return { line, raw, error: "Dòng trống" };
  const parts = splitLine(raw);
  if (type === "multiple_choice") return parseMultipleChoice(parts, line, raw);
  if (type === "true_false") return parseTrueFalse(parts, line, raw);
  return parseShortAnswer(parts, line, raw);
}

interface BulkQuestionImportProps {
  courses: Course[];
  currentUserId?: string;
  onDone: () => void;
}

export default function BulkQuestionImport({ courses, currentUserId, onDone }: BulkQuestionImportProps) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [type, setType] = useState<QuestionType>("multiple_choice");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [savedCount, setSavedCount] = useState<number | null>(null);

  const rows = useMemo<ParsedRow[]>(() => {
    return text
      .split("\n")
      .map((raw, idx) => parseLine(raw, idx + 1, type))
      .filter((row) => row.raw.trim() !== "");
  }, [text, type]);

  const validRows = rows.filter((r) => !r.error);
  const errorRows = rows.filter((r) => r.error);
  const canSubmit = courseId && topic.trim() && validRows.length > 0 && !submitting;

  function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    for (const row of validRows) {
      if (!row.question) continue;
      const base = {
        courseId,
        topic: topic.trim(),
        difficulty,
        source: "user" as const,
        status: "published" as const,
        ownerId: currentUserId,
        visibility: "public" as const,
      };
      if (type === "multiple_choice" && row.options && row.correctIndex !== undefined) {
        createQuestion({
          ...base,
          type: "multiple_choice",
          question: row.question,
          options: row.options.map((textOpt, i) => ({ id: OPTION_IDS[i], text: textOpt })),
          correctAnswer: OPTION_IDS[row.correctIndex],
        });
      } else if (type === "true_false" && row.statements) {
        createQuestion({
          ...base,
          type: "true_false",
          question: row.question,
          statements: row.statements,
        });
      } else if (type === "short_answer" && row.acceptedAnswers) {
        createQuestion({
          ...base,
          type: "short_answer",
          question: row.question,
          acceptedAnswers: row.acceptedAnswers,
        });
      }
    }
    setSavedCount(validRows.length);
    setSubmitting(false);
    setText("");
  }

  return (
    <Card className="space-y-5">
      <div>
        <h2 className="text-sm font-display font-semibold text-ash-200">Thêm nhanh nhiều câu</h2>
        <p className="text-xs text-ash-500 mt-1">
          Mỗi dòng 1 câu, tách các phần bằng dấu <code>~</code>. {FORMAT_HINT[type]}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <FieldGroup label="Loại câu hỏi">
          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value as QuestionType);
              setSavedCount(null);
            }}
          >
            <option value="multiple_choice">Trắc nghiệm (4 đáp án)</option>
            <option value="true_false">Đúng / Sai (4 ý)</option>
            <option value="short_answer">Trả lời ngắn</option>
          </Select>
        </FieldGroup>
        <FieldGroup label="Môn học">
          <Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </FieldGroup>
        <FieldGroup label="Chủ đề (áp dụng cho cả lô)">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Vd: Hàm số"
            className="w-full rounded-lg bg-ink-700/70 border border-ink-600 text-ash-200 placeholder:text-ash-500 text-sm px-3.5 py-2.5 outline-none transition-all duration-200 focus:border-cue/60 focus:shadow-[0_0_0_3px_rgba(242,184,75,0.12)]"
          />
        </FieldGroup>
        <FieldGroup label="Độ khó (áp dụng cho cả lô)">
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </Select>
        </FieldGroup>
      </div>

      <FieldGroup label="Danh sách câu hỏi (mỗi dòng 1 câu)">
        <Textarea
          rows={8}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSavedCount(null);
          }}
          placeholder={PLACEHOLDERS[type]}
          className="font-mono text-xs"
        />
      </FieldGroup>

      {rows.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge tone="done">{validRows.length} câu hợp lệ</Badge>
            {errorRows.length > 0 && <Badge tone="live">{errorRows.length} dòng lỗi</Badge>}
          </div>
          {errorRows.length > 0 && (
            <ul className="text-xs text-signal-live space-y-1 max-h-32 overflow-y-auto">
              {errorRows.map((row) => (
                <li key={row.line}>
                  Dòng {row.line}: {row.error}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {savedCount !== null && (
        <p className="text-sm text-signal-done">✓ Đã thêm {savedCount} câu hỏi vào ngân hàng.</p>
      )}

      <div className="flex items-center gap-2 pt-1">
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          Thêm {validRows.length > 0 ? validRows.length : ""} câu hỏi
        </Button>
        <Button variant="ghost" onClick={onDone}>
          Xong
        </Button>
      </div>
    </Card>
  );
}
