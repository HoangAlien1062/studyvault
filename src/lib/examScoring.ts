// ============================================================
// CHẤM ĐIỂM — logic thuần (pure), không phụ thuộc UI.
//
// LƯU Ý QUAN TRỌNG: ở Phase 1 (chưa có backend), hàm này chạy ở
// trình duyệt vì project hiện tại chưa có server. Được viết dưới
// dạng pure function từ (question, answer) → kết quả để khi Phase 2
// thêm Supabase Edge Function, có thể copy nguyên hàm này sang chạy
// ở server mà không sửa gì — tránh việc tin điểm gửi thẳng từ client.
// ============================================================

import type { AnswerResult, ExamAttempt, Question, UserAnswer } from "../types/exam";
import { TRUE_FALSE_SCORE_TABLE as SCORE_TABLE } from "../types/exam";

function normalizeShortAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .replace(/,/g, "."); // "2,0" ~ "2.0"
}

export function gradeQuestion(question: Question, answer: UserAnswer | undefined): AnswerResult {
  const base = { questionId: question.id, maxPoints: 1 as const };

  if (!answer) {
    return { ...base, points: 0, isCorrect: false, isUnanswered: true };
  }

  if (question.type === "multiple_choice" && answer.type === "multiple_choice") {
    if (!answer.selected) return { ...base, points: 0, isCorrect: false, isUnanswered: true };
    const isCorrect = answer.selected === question.correctAnswer;
    return { ...base, points: isCorrect ? 1 : 0, isCorrect, isUnanswered: false };
  }

  if (question.type === "true_false" && answer.type === "true_false") {
    const statements = question.statements ?? [];
    const answered = Object.keys(answer.selected).length;
    if (answered === 0) return { ...base, points: 0, isCorrect: false, isUnanswered: true, correctCount: 0 };

    let correctCount = 0;
    for (const st of statements) {
      if (answer.selected[st.id] === st.correctAnswer) correctCount += 1;
    }
    const points = SCORE_TABLE[correctCount] ?? 0;
    return {
      ...base,
      points,
      correctCount,
      isCorrect: correctCount === statements.length,
      isUnanswered: false,
    };
  }

  if (question.type === "short_answer" && answer.type === "short_answer") {
    const raw = answer.selected?.trim() ?? "";
    if (!raw) return { ...base, points: 0, isCorrect: false, isUnanswered: true };
    const accepted = (question.acceptedAnswers ?? (question.correctAnswer ? [question.correctAnswer] : [])).map(
      normalizeShortAnswer
    );
    const isCorrect = accepted.includes(normalizeShortAnswer(raw));
    return { ...base, points: isCorrect ? 1 : 0, isCorrect, isUnanswered: false };
  }

  return { ...base, points: 0, isCorrect: false, isUnanswered: true };
}

export interface GradeExamInput {
  examId: string;
  displayName: string;
  questions: Question[];
  answers: UserAnswer[];
  startedAt: number;
  submittedAt: number;
}

export function gradeExam(input: GradeExamInput): Omit<ExamAttempt, "id"> {
  const answerByQuestion = new Map(input.answers.map((a) => [a.questionId, a]));
  const results = input.questions.map((q) => gradeQuestion(q, answerByQuestion.get(q.id)));

  const earnedPoints = results.reduce((sum, r) => sum + r.points, 0);
  const maxPoints = results.reduce((sum, r) => sum + r.maxPoints, 0);
  // Không làm tròn sớm — chỉ round ở bước hiển thị cuối cùng.
  const normalizedScore = maxPoints > 0 ? Math.round(((earnedPoints / maxPoints) * 10) * 10) / 10 : 0;

  const correctCount = results.filter((r) => r.isCorrect).length;
  const unansweredCount = results.filter((r) => r.isUnanswered).length;
  const wrongCount = results.length - correctCount - unansweredCount;

  return {
    examId: input.examId,
    displayName: input.displayName,
    earnedPoints,
    maxPoints,
    normalizedScore,
    correctCount,
    wrongCount,
    unansweredCount,
    results,
    answers: input.answers,
    startedAt: input.startedAt,
    submittedAt: input.submittedAt,
    timeSpentSeconds: Math.round((input.submittedAt - input.startedAt) / 1000),
  };
}
