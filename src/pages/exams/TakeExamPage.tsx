import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import MathText from "../../components/ui/MathText";
import { FieldGroup, Input } from "../../components/ui/Field";
import ExamTimer from "../../components/exams/ExamTimer";
import QuestionAnswerInput from "../../components/exams/QuestionAnswerInput";
import { useExamData, useExamDataReady, useExamDisplayName, useMyExamAttemptIds } from "../../hooks/useExamData";
import { saveAttempt } from "../../lib/examStore";
import { gradeExam } from "../../lib/examScoring";
import { clearExamDraft, loadExamDraft, saveExamDraft } from "../../lib/examDraft";
import { getCourse } from "../../lib/catalog";
import type { Question, UserAnswer } from "../../types/exam";

// Xáo trộn có seed (không random mỗi lần render) để thứ tự ổn định
// xuyên suốt lượt làm bài / khi refresh trang.
function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function TakeExamPage() {
  const { examId = "" } = useParams();
  const navigate = useNavigate();
  const ready = useExamDataReady();
  const { exams, questions } = useExamData();
  const { displayName, setDisplayName } = useExamDisplayName();
  const { addMyAttemptId } = useMyExamAttemptIds();

  const exam = exams.find((e) => e.id === examId);
  const course = exam ? getCourse(exam.courseId) : undefined;

  const orderedQuestions: Question[] = useMemo(() => {
    if (!exam) return [];
    const byId = new Map(questions.map((q) => [q.id, q]));
    const list = exam.questionIds.map((id) => byId.get(id)).filter((q): q is Question => Boolean(q));
    const ordered = exam.shuffleQuestions ? seededShuffle(list, examId) : list;
    if (!exam.shuffleAnswers) return ordered;
    return ordered.map((q) =>
      q.type === "multiple_choice" && q.options
        ? { ...q, options: seededShuffle(q.options, examId + q.id) }
        : q
    );
  }, [exam, questions, examId]);

  const [name, setName] = useState(displayName);
  const [started, setStarted] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);

  // Khôi phục draft nếu có (refresh trang / mất mạng tạm thời).
  useEffect(() => {
    if (!examId) return;
    const draft = loadExamDraft(examId);
    if (draft) {
      setName(draft.displayName);
      setStartedAt(draft.startedAt);
      setAnswers(Object.fromEntries(draft.answers.map((a) => [a.questionId, a])));
      setStarted(true);
    }
  }, [examId]);

  useEffect(() => {
    if (!started || !startedAt || !exam) return;
    saveExamDraft({
      examId,
      displayName: name,
      startedAt,
      answers: Object.values(answers),
    });
  }, [started, startedAt, exam, examId, name, answers]);

  if (!ready) return <div className="container-page py-10 text-sm text-ash-500">Đang tải...</div>;

  if (!exam) {
    return (
      <div className="container-page py-10">
        <p className="text-ash-400">Không tìm thấy đề kiểm tra này.</p>
        <Button className="mt-4" onClick={() => navigate("/exams")}>
          Quay lại
        </Button>
      </div>
    );
  }

  function handleStart() {
    const finalName = name.trim() || "Học sinh";
    setDisplayName(finalName);
    setName(finalName);
    setStartedAt(Date.now());
    setStarted(true);
  }

  function handleAnswer(answer: UserAnswer) {
    setAnswers((prev) => ({ ...prev, [answer.questionId]: answer }));
  }

  function doSubmit() {
    if (!startedAt || !exam) return;
    const graded = gradeExam({
      examId: exam.id,
      displayName: name.trim() || "Học sinh",
      questions: orderedQuestions,
      answers: Object.values(answers),
      startedAt,
      submittedAt: Date.now(),
    });
    const attempt = saveAttempt(graded);
    addMyAttemptId(attempt.id);
    clearExamDraft(examId);
    navigate(`/exams/${examId}/result/${attempt.id}`);
  }

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = orderedQuestions.length - answeredCount;

  // ---- Màn hình giới thiệu / nhập tên ----
  if (!started) {
    return (
      <div className="container-page py-10 max-w-lg">
        <Card className="space-y-5 text-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-cue font-mono">{course?.shortName}</p>
            <h1 className="text-xl font-display font-bold text-ash-200 mt-1">{exam.title}</h1>
          </div>
          <p className="text-sm text-ash-400">
            {orderedQuestions.length} câu
            {exam.timeLimitMinutes ? ` · ${exam.timeLimitMinutes} phút` : " · không giới hạn thời gian"}
          </p>
          {exam.timeLimitMinutes && (
            <p className="text-xs text-signal-live">⚠️ Thời gian sẽ bắt đầu ngay khi bạn nhấn bắt đầu.</p>
          )}
          <FieldGroup label="Tên người làm bài">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên của bạn" />
          </FieldGroup>
          <Button className="w-full" onClick={handleStart}>
            Bắt đầu làm bài
          </Button>
        </Card>
      </div>
    );
  }

  const q = orderedQuestions[current];
  const deadline = exam.timeLimitMinutes ? (startedAt ?? Date.now()) + exam.timeLimitMinutes * 60_000 : null;

  return (
    <div className="container-page py-6 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-cue font-mono">{course?.shortName}</p>
          <h1 className="font-display font-semibold text-ash-200">{exam.title}</h1>
        </div>
        {deadline && <ExamTimer deadline={deadline} onExpire={() => setConfirmingSubmit(true)} />}
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          <Card className="space-y-4">
            <p className="text-xs font-mono text-ash-500">Câu {current + 1} / {orderedQuestions.length}</p>
            <p className="text-sm text-ash-200 leading-relaxed">
              <MathText text={q.question} />
            </p>
            {q.imageUrl && (
              <img
                src={q.imageUrl}
                alt="Ảnh minh họa câu hỏi"
                className="max-h-64 rounded-lg border border-ink-600"
              />
            )}
            <QuestionAnswerInput question={q} answer={answers[q.id]} onChange={handleAnswer} />
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
              ← Trước
            </Button>
            {current < orderedQuestions.length - 1 ? (
              <Button onClick={() => setCurrent((c) => c + 1)}>Tiếp →</Button>
            ) : (
              <Button onClick={() => setConfirmingSubmit(true)}>Nộp bài</Button>
            )}
          </div>
        </div>

        <div className="hidden lg:block w-56 shrink-0">
          <Card>
            <p className="text-xs font-medium text-ash-400 mb-3">CÂU HỎI</p>
            <div className="grid grid-cols-5 gap-2">
              {orderedQuestions.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(idx)}
                  className={`h-9 rounded-lg text-xs font-mono font-medium border transition-colors ${
                    idx === current
                      ? "border-cue bg-cue/10 text-cue"
                      : answers[item.id]
                      ? "border-signal-done/40 bg-signal-done/10 text-signal-done"
                      : "border-ink-600 text-ash-500"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile: thanh điều hướng câu hỏi cuộn ngang */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-1">
        {orderedQuestions.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrent(idx)}
            className={`h-9 w-9 shrink-0 rounded-lg text-xs font-mono font-medium border transition-colors ${
              idx === current
                ? "border-cue bg-cue/10 text-cue"
                : answers[item.id]
                ? "border-signal-done/40 bg-signal-done/10 text-signal-done"
                : "border-ink-600 text-ash-500"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {confirmingSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 px-4">
          <Card className="max-w-sm w-full space-y-4 text-center">
            {unansweredCount > 0 ? (
              <p className="text-sm text-ash-300">
                Bạn chưa trả lời <span className="text-signal-live font-semibold">{unansweredCount}</span> câu.
                <br />
                Bạn có chắc muốn nộp bài?
              </p>
            ) : (
              <p className="text-sm text-ash-300">Nộp bài kiểm tra này?</p>
            )}
            <div className="flex gap-2 justify-center">
              <Button variant="secondary" onClick={() => setConfirmingSubmit(false)}>
                Quay lại
              </Button>
              <Button onClick={doSubmit}>Nộp bài</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
