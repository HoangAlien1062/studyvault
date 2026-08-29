import { useRef, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { FieldGroup, Input, Select, Textarea } from "../ui/Field";
import type { Course } from "../../types";
import type { Difficulty, Question, QuestionType } from "../../types/exam";
import { createDocument, createQuestion, updateDocument, uploadDocumentFile } from "../../lib/examStore";

// Flow (mục 52-53 spec):
// Chọn môn → Upload/chụp tài liệu → AI đọc → chọn số câu/độ khó → AI tạo → preview → lưu (draft)

type Step = "setup" | "analyzing" | "configure" | "generating" | "preview";

interface GeneratedQuestion {
  type: QuestionType;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  options?: { id: string; text: string }[];
  correctAnswer?: string;
  statements?: { id: string; text: string; correctAnswer: boolean }[];
  acceptedAnswers?: string[];
  explanation?: string;
  include: boolean;
}

interface AIQuestionGeneratorProps {
  courses: Course[];
  onDone: () => void;
}

export default function AIQuestionGenerator({ courses, onDone }: AIQuestionGeneratorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("setup");
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [topic, setTopic] = useState("");
  const [pastedText, setPastedText] = useState("");
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const [mcCount, setMcCount] = useState(10);
  const [tfCount, setTfCount] = useState(0);
  const [saCount, setSaCount] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty | "mixed">("medium");

  const [generated, setGenerated] = useState<GeneratedQuestion[]>([]);
  const [saving, setSaving] = useState(false);

  const course = courses.find((c) => c.id === courseId);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Không đọc được file."));
      reader.readAsDataURL(file);
    });
  }

  async function handleFileSelected(file: File | undefined) {
    if (!file) return;
    setError(null);
    setWarning(null);
    setFileName(file.name);
    setStep("analyzing");

    try {
      const { fileUrl, storagePath } = await uploadDocumentFile(file);
      const doc = createDocument({
        courseId: courseId || undefined,
        title: file.name,
        fileUrl,
        storagePath,
        mimeType: file.type,
        fileSize: file.size,
        aiStatus: "analyzing",
      });
      setDocumentId(doc.id);

      const imageBase64 = await fileToBase64(file);
      const res = await fetch("/api/analyze-document", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ imageBase64, mimeType: file.type }),
      });
      const data = await res.json();

      if (!res.ok) {
        updateDocument(doc.id, { aiStatus: "failed", aiError: data.error });
        setError(data.error || "Không thể đọc tài liệu.");
        setStep("setup");
        return;
      }

      updateDocument(doc.id, {
        aiStatus: "ready",
        ocrText: data.extractedText,
        suggestedTopic: data.suggestedTopic,
      });
      setExtractedText(data.extractedText);
      if (data.suggestedTopic && !topic.trim()) setTopic(data.suggestedTopic);
      if (data.warning) setWarning(data.warning);
      setStep("configure");
    } catch (err) {
      setError((err as Error).message);
      setStep("setup");
    }
  }

  function useTextDirectly() {
    if (!pastedText.trim()) return;
    setExtractedText(pastedText.trim());
    setError(null);
    setStep("configure");
  }

  async function handleGenerate() {
    setError(null);
    setStep("generating");
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: extractedText,
          courseName: course?.name,
          topic: topic.trim() || undefined,
          counts: { multiple_choice: mcCount, true_false: tfCount, short_answer: saCount },
          difficulty,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "AI tạo câu hỏi thất bại.");
        setStep("configure");
        return;
      }
      setGenerated(
        (data.questions as GeneratedQuestion[]).map((q) => ({ ...q, include: true }))
      );
      setStep("preview");
    } catch (err) {
      setError((err as Error).message);
      setStep("configure");
    }
  }

  function toggleInclude(index: number) {
    setGenerated((prev) => prev.map((q, i) => (i === index ? { ...q, include: !q.include } : q)));
  }

  function handleSaveAll() {
    if (!courseId) return;
    setSaving(true);
    const toSave = generated.filter((q) => q.include);
    toSave.forEach((q) => {
      const payload: Omit<Question, "id" | "createdAt"> = {
        courseId,
        topic: topic.trim() || "Chưa phân loại",
        type: q.type,
        question: q.question,
        difficulty: q.difficulty,
        options: q.options,
        correctAnswer: q.correctAnswer,
        statements: q.statements,
        acceptedAnswers: q.acceptedAnswers,
        explanation: q.explanation,
        source: "ai",
        status: "draft", // mục 55: AI tạo luôn ở trạng thái draft, phải duyệt mới đưa vào đề chính thức
        documentId: documentId ?? undefined,
      };
      createQuestion(payload);
    });
    setSaving(false);
    onDone();
  }

  const totalRequested = mcCount + tfCount + saCount;

  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-ash-200">🧠 Tạo câu hỏi bằng AI</h3>
        <Badge tone="cue">AI</Badge>
      </div>

      {error && (
        <div className="rounded-lg border border-signal-live/30 bg-signal-live/10 px-3.5 py-2.5 text-sm text-signal-live">
          {error}
        </div>
      )}
      {warning && (
        <div className="rounded-lg border border-ink-600 bg-ink-800/60 px-3.5 py-2.5 text-sm text-ash-400">
          ⚠️ {warning}
        </div>
      )}

      {step === "setup" && (
        <div className="space-y-4">
          <FieldGroup label="Môn học">
            <Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FieldGroup>

          <div>
            <p className="text-xs font-medium text-ash-400 mb-1.5">Tài liệu nguồn</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-dashed border-ink-600 bg-ink-800/40 p-5 text-center hover:border-cue/50 transition-colors"
              >
                <div className="text-2xl mb-1">📄</div>
                <p className="text-sm text-ash-200 font-medium">Chọn file</p>
                <p className="text-xs text-ash-500 mt-0.5">JPG, PNG, WEBP</p>
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="rounded-lg border border-dashed border-ink-600 bg-ink-800/40 p-5 text-center hover:border-cue/50 transition-colors"
              >
                <div className="text-2xl mb-1">📷</div>
                <p className="text-sm text-ash-200 font-medium">Chụp tài liệu</p>
                <p className="text-xs text-ash-500 mt-0.5">Dùng camera thiết bị</p>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              aria-label="Chọn file tài liệu"
              onChange={(e) => handleFileSelected(e.target.files?.[0])}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              aria-label="Chụp tài liệu"
              onChange={(e) => handleFileSelected(e.target.files?.[0])}
            />
          </div>

          <div className="relative">
            <div className="text-center text-xs text-ash-500 mb-2">— hoặc dán sẵn nội dung —</div>
            <Textarea
              rows={4}
              placeholder="Dán nội dung bài học / đề đã có sẵn vào đây..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" variant="secondary" disabled={!pastedText.trim()} onClick={useTextDirectly}>
                Dùng nội dung này
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === "analyzing" && (
        <div className="py-10 text-center space-y-3">
          <div className="text-3xl animate-pulse">🧠</div>
          <p className="text-sm text-ash-300">Đang phân tích tài liệu{fileName ? `: ${fileName}` : ""}...</p>
          <p className="text-xs text-ash-500">AI đang đọc nội dung, có thể mất vài giây</p>
        </div>
      )}

      {step === "configure" && (
        <div className="space-y-4">
          <div className="rounded-lg border border-ink-600 bg-ink-800/40 p-3.5">
            <p className="text-xs text-ash-500 mb-1">Nội dung đã đọc được (có thể chỉnh trước khi tạo câu hỏi)</p>
            <Textarea
              rows={6}
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Chủ đề">
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="vd: Hàm số" />
            </FieldGroup>
            <FieldGroup label="Độ khó">
              <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty | "mixed")}>
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
                <option value="mixed">Hỗn hợp</option>
              </Select>
            </FieldGroup>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FieldGroup label="Trắc nghiệm">
              <Input type="number" min={0} max={40} value={mcCount} onChange={(e) => setMcCount(Number(e.target.value) || 0)} />
            </FieldGroup>
            <FieldGroup label="Đúng / Sai">
              <Input type="number" min={0} max={40} value={tfCount} onChange={(e) => setTfCount(Number(e.target.value) || 0)} />
            </FieldGroup>
            <FieldGroup label="Trả lời ngắn">
              <Input type="number" min={0} max={40} value={saCount} onChange={(e) => setSaCount(Number(e.target.value) || 0)} />
            </FieldGroup>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setStep("setup")}
              className="text-xs text-ash-400 hover:text-ash-200"
            >
              ← Chọn tài liệu khác
            </button>
            <Button
              disabled={!courseId || totalRequested <= 0 || !extractedText.trim()}
              onClick={handleGenerate}
            >
              Tạo {totalRequested > 0 ? `${totalRequested} câu hỏi` : "câu hỏi"}
            </Button>
          </div>
        </div>
      )}

      {step === "generating" && (
        <div className="py-10 text-center space-y-3">
          <div className="text-3xl animate-pulse">✨</div>
          <p className="text-sm text-ash-300">AI đang tạo câu hỏi...</p>
        </div>
      )}

      {step === "preview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-ash-300">
              Đã tạo <strong className="text-ash-200">{generated.length}</strong> câu — bỏ chọn câu nào bạn
              không muốn lưu:
            </p>
            <Badge tone="neutral">Trạng thái: draft</Badge>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {generated.map((q, i) => (
              <label
                key={i}
                className={`flex gap-3 rounded-lg border p-3.5 cursor-pointer transition-colors ${
                  q.include ? "border-ink-600 bg-ink-800/40" : "border-ink-700 bg-ink-900/40 opacity-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={q.include}
                  onChange={() => toggleInclude(i)}
                  className="mt-1 h-4 w-4 accent-cue"
                  aria-label={`Bao gồm câu ${i + 1}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge tone="cue">
                      {q.type === "multiple_choice" ? "Trắc nghiệm" : q.type === "true_false" ? "Đúng/Sai" : "Trả lời ngắn"}
                    </Badge>
                    <span className="text-[11px] text-ash-500">
                      {q.difficulty === "easy" ? "Dễ" : q.difficulty === "hard" ? "Khó" : "Trung bình"}
                    </span>
                  </div>
                  <p className="text-sm text-ash-200">{q.question}</p>
                  {q.type === "multiple_choice" && q.options && (
                    <ul className="mt-1.5 text-xs text-ash-400 space-y-0.5">
                      {q.options.map((opt) => (
                        <li key={opt.id} className={opt.id === q.correctAnswer ? "text-signal-done" : ""}>
                          {opt.id}. {opt.text} {opt.id === q.correctAnswer ? "✓" : ""}
                        </li>
                      ))}
                    </ul>
                  )}
                  {q.type === "true_false" && q.statements && (
                    <ul className="mt-1.5 text-xs text-ash-400 space-y-0.5">
                      {q.statements.map((s) => (
                        <li key={s.id} className={s.correctAnswer ? "text-signal-done" : ""}>
                          {s.id}) {s.text} — {s.correctAnswer ? "Đúng" : "Sai"}
                        </li>
                      ))}
                    </ul>
                  )}
                  {q.type === "short_answer" && q.acceptedAnswers && (
                    <p className="mt-1.5 text-xs text-signal-done">
                      Đáp án: {q.acceptedAnswers.join(" / ")}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button type="button" onClick={() => setStep("configure")} className="text-xs text-ash-400 hover:text-ash-200">
              ← Tạo lại với cấu hình khác
            </button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={onDone}>
                Hủy
              </Button>
              <Button disabled={saving || generated.every((q) => !q.include)} onClick={handleSaveAll}>
                Lưu {generated.filter((q) => q.include).length} câu vào ngân hàng
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
