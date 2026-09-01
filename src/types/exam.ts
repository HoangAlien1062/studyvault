// ============================================================
// EXAM MODULE — DATA MODEL
// Không hard-code "multiple_choice" rải rác — luôn dùng QuestionType.
// Xem /src/lib/examStore.ts để biết nơi dữ liệu này được lưu/đọc.
// ============================================================

export type QuestionType = "multiple_choice" | "true_false" | "short_answer";

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionSource = "user" | "ai" | "document";

export type QuestionStatus = "draft" | "reviewed" | "published";

// ---- Tài liệu (upload/chụp ảnh) — nguồn cho AI đọc & tạo câu hỏi ----
export type DocumentAiStatus = "pending" | "analyzing" | "ready" | "failed";

export interface ExamDocument {
  id: string;
  courseId?: string; // gán môn học sau khi AI phân tích hoặc người dùng chọn
  title: string;
  fileUrl: string; // public URL trên Supabase Storage
  storagePath: string;
  mimeType: string;
  fileSize: number;
  ocrText?: string; // nội dung AI đọc được
  suggestedTopic?: string;
  aiStatus: DocumentAiStatus;
  aiError?: string;
  createdAt: number;
}

export interface QuestionOption {
  id: string; // "A" | "B" | "C" | "D"
  text: string;
}

export interface TrueFalseStatement {
  id: string; // "a" | "b" | "c" | "d"
  text: string;
  correctAnswer: boolean;
}

export interface Question {
  id: string;
  courseId: string; // reference môn học hiện tại (Course.id) — không tạo subject riêng
  topic: string; // chủ đề, nhập tự do (vd "Hàm số")
  type: QuestionType;
  question: string;
  difficulty: Difficulty;

  // multiple_choice
  options?: QuestionOption[];
  correctAnswer?: string; // id đáp án đúng, vd "B"

  // true_false — luôn đúng 4 ý a/b/c/d
  statements?: TrueFalseStatement[];

  // short_answer
  acceptedAnswers?: string[];

  explanation?: string;
  imageUrl?: string; // ảnh minh họa (hình vẽ/đồ thị/sơ đồ) đi kèm câu hỏi, nếu có
  source: QuestionSource;
  status: QuestionStatus;
  documentId?: string;
  ownerId?: string; // user_id của người tạo — dùng để phân quyền sửa/xóa
  visibility?: "public" | "private"; // mặc định coi như "public" nếu không set (dữ liệu cũ)
  // AI rà soát trong lúc rảnh (không chặn lúc lưu câu hỏi):
  //   unreviewed = chưa rà soát, flagged = AI nghi ngờ sai, passed = AI xác nhận ổn,
  //   skipped = người tạo tự tin bỏ qua kiểm tra AI
  aiReviewStatus?: "unreviewed" | "flagged" | "passed" | "skipped";
  aiReviewNote?: string; // lý do AI cho là sai (khi flagged)
  aiReviewDisputed?: boolean; // người tạo không đồng ý với AI, cần admin xem lại
  createdAt: number;
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  topic?: string;
  questionIds: string[];
  timeLimitMinutes: number | null; // null = không giới hạn
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  ownerId?: string; // user_id của người tạo — dùng để phân quyền sửa/xóa
  visibility?: "public" | "private"; // mặc định coi như "public" nếu không set (dữ liệu cũ)
  createdAt: number;
}

// ---- Làm bài / chấm điểm ----

export type UserAnswer =
  | { questionId: string; type: "multiple_choice"; selected: string | null }
  | { questionId: string; type: "true_false"; selected: Partial<Record<string, boolean>> }
  | { questionId: string; type: "short_answer"; selected: string };

export interface AnswerResult {
  questionId: string;
  points: number; // điểm đạt được cho câu này (0 - 1)
  maxPoints: number; // luôn 1
  correctCount?: number; // riêng true_false: số ý đúng / 4
  isCorrect: boolean; // true_false: đạt trọn 1.00 điểm
  isUnanswered: boolean;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  displayName: string;
  userId?: string; // user_id thật (nếu đã đăng nhập) — dùng để nối vào Duel/thách đấu
  duelId?: string; // nếu bài làm này là 1 lượt trong 1 cuộc thách đấu (Duel)

  earnedPoints: number;
  maxPoints: number;
  normalizedScore: number; // thang 10, làm tròn 1 chữ số thập phân

  correctCount: number; // số câu đạt trọn điểm
  wrongCount: number;
  unansweredCount: number;

  results: AnswerResult[];
  answers: UserAnswer[]; // lựa chọn gốc của người dùng, dùng để hiện review

  startedAt: number;
  submittedAt: number;
  timeSpentSeconds: number;
}

// ---- Thách đấu Solo (1 vs 1, không đồng bộ — cùng làm 1 đề, so điểm sau) ----
export interface Duel {
  id: string;
  examId: string;
  challengerId: string;
  challengerName: string;
  challengerAttemptId?: string;
  opponentId?: string;
  opponentName?: string;
  opponentAttemptId?: string;
  status: "waiting" | "completed";
  createdAt: number;
}

// ---- Đề mẫu (bảng điểm Đúng/Sai — quy tắc bắt buộc, KHÔNG tuyến tính) ----
export const TRUE_FALSE_SCORE_TABLE: Record<number, number> = {
  0: 0,
  1: 0.1,
  2: 0.25,
  3: 0.5,
  4: 1.0,
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

export const QUESTION_TYPE_LABEL: Record<QuestionType, string> = {
  multiple_choice: "Trắc nghiệm",
  true_false: "Đúng / Sai",
  short_answer: "Trả lời ngắn",
};
