// ============================================================
// EXAM STORE — lưu Ngân hàng câu hỏi / Đề kiểm tra / Kết quả lên
// Supabase (bảng "exam_content", 1 dòng JSON duy nhất, id = "main").
//
// Đi theo ĐÚNG pattern của contentStore.ts (môn học/giáo viên/chương/
// bài học) để nhất quán với kiến trúc hiện tại — không tạo hệ thống
// lưu trữ khác, không thêm auth. Xem contentStore.ts để đối chiếu.
// ============================================================

import { STORAGE_EVENT, notifyStorageChange } from "./storage";
import { supabase } from "./supabaseClient";
import type { Exam, ExamAttempt, ExamDocument, Question } from "../types/exam";

const TABLE = "exam_content";
const ROW_ID = "main";
const DOCUMENTS_BUCKET = "exam-documents";

interface ExamData {
  questions: Question[];
  exams: Exam[];
  attempts: ExamAttempt[];
  documents: ExamDocument[];
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

let current: ExamData = { questions: [], exams: [], attempts: [], documents: [] };
let ready = false;

export { STORAGE_EVENT };

export function getExamData(): ExamData {
  return current;
}

export function isExamDataReady(): boolean {
  return ready;
}

function setReady() {
  ready = true;
  notifyStorageChange();
}

async function persistRemote(next: ExamData): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: next, updated_at: new Date().toISOString() });
  if (error) {
    // eslint-disable-next-line no-console
    console.error("[StudyVault] Không lưu được dữ liệu Kiểm tra lên Supabase:", error.message);
  }
}

function persist(): void {
  notifyStorageChange();
  void persistRemote(current);
}

async function initialize(): Promise<void> {
  if (!supabase) {
    setReady();
    return;
  }
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", ROW_ID)
      .maybeSingle();

    if (error) throw error;

    if (data?.data) {
      // Bảo đảm tương thích ngược: các dòng cũ chưa có "documents".
      const loaded = data.data as ExamData;
      current = { ...loaded, documents: loaded.documents ?? [] };
    } else {
      await persistRemote(current);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      "[StudyVault] Không tải được dữ liệu Kiểm tra từ Supabase, dùng dữ liệu rỗng:",
      err
    );
  } finally {
    setReady();
  }

  supabase
    .channel("exam_content_sync")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: TABLE, filter: `id=eq.${ROW_ID}` },
      (payload) => {
        const next = (payload.new as { data?: ExamData } | null)?.data;
        if (next) {
          current = next;
          notifyStorageChange();
        }
      }
    )
    .subscribe();
}

void initialize();

export function generateExamId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------------------------------------------------------------
// Question CRUD
// ---------------------------------------------------------------

export type QuestionInput = Omit<Question, "id" | "createdAt">;

export function createQuestion(input: QuestionInput): Question {
  const question: Question = { ...input, id: generateExamId("q"), createdAt: Date.now() };
  current = { ...deepClone(current), questions: [...deepClone(current.questions), question] };
  persist();
  return question;
}

export function updateQuestion(questionId: string, patch: Partial<QuestionInput>): void {
  const next = deepClone(current);
  const q = next.questions.find((item) => item.id === questionId);
  if (q) Object.assign(q, patch);
  current = next;
  persist();
}

export function deleteQuestion(questionId: string): void {
  current = {
    ...deepClone(current),
    questions: deepClone(current.questions).filter((q) => q.id !== questionId),
  };
  persist();
}

/** Xóa nhiều câu hỏi cùng lúc (chọn nhiều để xóa). */
export function deleteQuestions(questionIds: string[]): void {
  const idSet = new Set(questionIds);
  current = {
    ...deepClone(current),
    questions: deepClone(current.questions).filter((q) => !idSet.has(q.id)),
  };
  persist();
}

/** Xóa toàn bộ câu hỏi đang hiển thị theo bộ lọc hiện tại (hoặc toàn bộ ngân hàng nếu không truyền ids). */
export function deleteAllQuestions(questionIds?: string[]): void {
  if (!questionIds) {
    current = { ...deepClone(current), questions: [] };
    persist();
    return;
  }
  deleteQuestions(questionIds);
}

// ---------------------------------------------------------------
// Exam CRUD
// ---------------------------------------------------------------

export type ExamInput = Omit<Exam, "id" | "createdAt">;

export function createExam(input: ExamInput): Exam {
  const exam: Exam = { ...input, id: generateExamId("exam"), createdAt: Date.now() };
  current = { ...deepClone(current), exams: [...deepClone(current.exams), exam] };
  persist();
  return exam;
}

export function updateExam(examId: string, patch: Partial<ExamInput>): void {
  const next = deepClone(current);
  const exam = next.exams.find((e) => e.id === examId);
  if (exam) Object.assign(exam, patch);
  current = next;
  persist();
}

export function deleteExam(examId: string): void {
  current = { ...deepClone(current), exams: deepClone(current.exams).filter((e) => e.id !== examId) };
  persist();
}

// ---------------------------------------------------------------
// Attempts (kết quả làm bài) — dùng chung cho History + Leaderboard
// ---------------------------------------------------------------

export function saveAttempt(input: Omit<ExamAttempt, "id">): ExamAttempt {
  const attempt: ExamAttempt = { ...input, id: generateExamId("attempt") };
  current = { ...deepClone(current), attempts: [...deepClone(current.attempts), attempt] };
  persist();
  return attempt;
}

// ---------------------------------------------------------------
// Documents (Ngân hàng tài liệu) — file lưu ở Supabase Storage,
// metadata lưu trong exam_content như questions/exams (nhất quán,
// không tạo bảng riêng).
// ---------------------------------------------------------------

export type DocumentInput = Omit<ExamDocument, "id" | "createdAt">;

export function createDocument(input: DocumentInput): ExamDocument {
  const document: ExamDocument = { ...input, id: generateExamId("doc"), createdAt: Date.now() };
  current = { ...deepClone(current), documents: [...deepClone(current.documents), document] };
  persist();
  return document;
}

export function updateDocument(documentId: string, patch: Partial<ExamDocument>): void {
  const next = deepClone(current);
  const doc = next.documents.find((item) => item.id === documentId);
  if (doc) Object.assign(doc, patch);
  current = next;
  persist();
}

export function deleteDocument(documentId: string): void {
  current = {
    ...deepClone(current),
    documents: deepClone(current.documents).filter((d) => d.id !== documentId),
  };
  persist();
}

/**
 * Upload file (ảnh/PDF) lên Supabase Storage, bucket "exam-documents".
 * Trả về URL public + storage path để lưu vào metadata document.
 * Nếu chưa cấu hình Supabase, ném lỗi rõ ràng để UI báo cho người dùng.
 */
export async function uploadDocumentFile(
  file: File
): Promise<{ fileUrl: string; storagePath: string }> {
  if (!supabase) {
    throw new Error(
      "Chưa cấu hình Supabase (.env.local) nên không thể lưu tài liệu lên Storage."
    );
  }
  const ext = file.name.split(".").pop() || "bin";
  const path = `${new Date().toISOString().slice(0, 10)}/${generateExamId("file")}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    throw new Error(`Tải tài liệu lên Storage thất bại: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(DOCUMENTS_BUCKET).getPublicUrl(path);
  return { fileUrl: data.publicUrl, storagePath: path };
}
