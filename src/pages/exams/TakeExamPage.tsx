import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import MathText from "../../components/ui/MathText";
import ExamTimer from "../../components/exams/ExamTimer";
import QuestionAnswerInput from "../../components/exams/QuestionAnswerInput";
import { useExamData, useExamDataReady, useMyExamAttemptIds } from "../../hooks/useExamData";
import { useAuth } from "../../hooks/useAuth";
import { saveAttempt, joinDuel } from "../../lib/examStore";
import { claimExamCompleteReward, settleDuelStakes } from "../../lib/coins";
import { notifyStorageChange } from "../../lib/storage";
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
  const [searchParams] = useSearchParams();
  const duelId = searchParams.get("duel") || undefined;
  const navigate = useNavigate();
  const ready = useExamDataReady();
  const { exams, questions, duels, attempts } = useExamData();
  const { user, profile, loading: authLoading } = useAuth();
  const { addMyAttemptId } = useMyExamAttemptIds();

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "Học sinh";

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
      setStartedAt(draft.startedAt);
      setAnswers(Object.fromEntries(draft.answers.map((a) => [a.questionId, a])));
      setStarted(true);
    }
  }, [examId]);

  useEffect(() => {
    if (!started || !startedAt || !exam) return;
    saveExamDraft({
      examId,
      displayName,
      startedAt,
      answers: Object.values(answers),
    });
  }, [started, startedAt, exam, examId, displayName, answers]);

  if (!ready || authLoading) return <div className="container-page py-10 text-sm text-ash-500">Đang tải...</div>;

  // Bắt buộc đăng nhập mới được làm bài kiểm tra (để lưu đúng kết quả
  // theo tài khoản, tránh gian lận đổi tên khi làm bài).
  if (!user) {
    return (
      <div className="container-page py-16 flex justify-center">
        <Card className="w-full max-w-sm space-y-4 text-center">
          <div className="text-3xl">🔒</div>
          <div>
            <h1 className="font-display font-semibold text-ash-200">Cần đăng nhập để làm bài</h1>
            <p className="text-sm text-ash-400 mt-1">
              Đăng nhập để kết quả được lưu đúng theo tài khoản của bạn và lên được bảng xếp hạng.
            </p>
          </div>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </Card>
      </div>
    );
  }

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
      displayName,
      questions: orderedQuestions,
      answers: Object.values(answers),
      startedAt,
      submittedAt: Date.now(),
    });
    const attempt = saveAttempt({ ...graded, userId: user?.id, duelId });
    addMyAttemptId(attempt.id);
    clearExamDraft(examId);
    if (user) {
      // Mức cố định +5 coin/lần hoàn thành (mục 4) — idempotent theo attempt.id
      // nên nếu component re-render/gọi lại không bị cộng trùng.
      claimExamCompleteReward(user.id, attempt.id).then(() => notifyStorageChange());
    }
    if (duelId && user) {
      // Bài làm này là lượt của đối thủ trong 1 cuộc thách đấu — nối kết quả vào Duel.
      joinDuel(duelId, user.id, displayName, attempt.id);
      const duel = duels.find((d) => d.id === duelId);
      if (duel) {
        const challengerAttempt = attempts.find((a) => a.id === duel.challengerAttemptId);
        // Mục 5: thắng nhận x2 cược, thua mất cược, hòa (điểm + thời gian) hoàn lại cả 2.
        settleDuelStakes(
          duel.challengerId,
          user.id,
          duelId,
          challengerAttempt?.normalizedScore ?? 0,
          graded.normalizedScore,
          challengerAttempt?.timeSpentSeconds ?? 0,
          graded.timeSpentSeconds
        ).then(() => notifyStorageChange());
      }
      navigate(`/duel/${duelId}`);
      return;
    }
    navigate(`/exams/${examId}/result/${attempt.id}`);
  }

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = orderedQuestions.length - answeredCount;

  // ---- Màn hình giới thiệu / nhập tên ----
  if (!started) {
    return (
      <div className="container-page py-10 max-w-lg">
        <Card className="space-y-5 text-center">
          <div className="text-3xl">📝</div>
          <div>
            <p className="text-xs uppercase tracking-wider text-cue font-mono">{course?.shortName}</p>
            <h1 className="text-xl font-display font-bold text-ash-200 mt-1">{exam.title}</h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-ash-400 py-2 border-y border-ink-700">
            <span>📋 {orderedQuestions.length} câu</span>
            <span>⏱ {exam.timeLimitMinutes ? `${exam.timeLimitMinutes} phút` : "Không giới hạn"}</span>
          </div>
          {exam.timeLimitMinutes && (
            <p className="text-xs text-signal-live">⚠️ Thời gian sẽ bắt đầu ngay khi bạn nhấn bắt đầu.</p>
          )}
          <p className="text-sm text-ash-400">
            Làm bài với tên: <span className="text-ash-200 font-medium">{displayName}</span>
          </p>
          <Button className="w-full" size="md" onClick={handleStart}>
            Bắt đầu làm bài
          </Button>
        </Card>
      </div>
    );
  }

  const q = orderedQuestions[current];
  const deadline = exam.timeLimitMinutes ? (startedAt ?? Date.now()) + exam.timeLimitMinutes * 60_000 : null;

  return (
    <div className="container-page py-6 pb-36 lg:pb-6 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-cue font-mono">{course?.shortName}</p>
          <h1 className="font-display font-semibold text-ash-200 truncate">{exam.title}</h1>
        </div>
        {deadline && <ExamTimer deadline={deadline} onExpire={() => setConfirmingSubmit(true)} />}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-ash-500">
          <span>
            Đã trả lời <strong className="text-ash-300">{answeredCount}</strong>/{orderedQuestions.length} câu
          </span>
          <span>{Math.round((answeredCount / orderedQuestions.length) * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
          <div
            className="h-full bg-cue transition-all duration-300"
            style={{ width: `${(answeredCount / orderedQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-full bg-cue/10 text-cue text-xs font-mono font-semibold">
                {current + 1}/{orderedQuestions.length}
              </span>
            </div>
            <p className="text-[15px] text-ash-200 leading-relaxed">
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

          {/* Điều hướng — ẩn trên mobile, dùng thanh dưới cùng cố định thay thế */}
          <div className="hidden lg:flex items-center justify-between">
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
          <Card className="space-y-3">
            <p className="text-xs font-medium text-ash-400">CÂU HỎI</p>
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
            <div className="flex items-center gap-3 pt-1 text-[11px] text-ash-500">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-sm bg-signal-done/60" /> Đã làm
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-sm border border-ink-600" /> Chưa làm
              </span>
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

      {/* Mobile: thanh điều hướng cố định ở đáy màn hình (nằm trên thanh nav chính của app) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-50 border-t border-ink-700 bg-ink-900/95 backdrop-blur px-4 py-3 flex items-center gap-2 shadow-lg">
        <Button
          variant="secondary"
          className="flex-1"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          ← Trước
        </Button>
        {current < orderedQuestions.length - 1 ? (
          <Button className="flex-1" onClick={() => setCurrent((c) => c + 1)}>
            Tiếp →
          </Button>
        ) : (
          <Button className="flex-1" onClick={() => setConfirmingSubmit(true)}>
            Nộp bài
          </Button>
        )}
      </div>

      {confirmingSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 px-4">
          <Card className="max-w-sm w-full space-y-4 text-center">
            <div className="text-3xl">{unansweredCount > 0 ? "⚠️" : "✅"}</div>
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
              <Button variant="secondary" className="flex-1" onClick={() => setConfirmingSubmit(false)}>
                Quay lại
              </Button>
              <Button className="flex-1" onClick={doSubmit}>
                Nộp bài
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
