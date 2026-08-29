// Lưu draft answers khi đang làm bài, để refresh trang / mất mạng tạm
// thời không làm mất câu trả lời đã chọn. Xóa draft khi nộp bài xong.

import type { UserAnswer } from "../types/exam";

export interface ExamDraft {
  examId: string;
  displayName: string;
  startedAt: number;
  answers: UserAnswer[];
}

function key(examId: string): string {
  return `studyvault.exam.draft.${examId}`;
}

export function loadExamDraft(examId: string): ExamDraft | null {
  try {
    const raw = localStorage.getItem(key(examId));
    return raw ? (JSON.parse(raw) as ExamDraft) : null;
  } catch {
    return null;
  }
}

export function saveExamDraft(draft: ExamDraft): void {
  try {
    localStorage.setItem(key(draft.examId), JSON.stringify(draft));
  } catch {
    // bỏ qua nếu storage không khả dụng
  }
}

export function clearExamDraft(examId: string): void {
  try {
    localStorage.removeItem(key(examId));
  } catch {
    // ignore
  }
}
