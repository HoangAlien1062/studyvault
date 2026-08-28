// ============================================================
// CONTENT STORE — lưu Môn học / Giáo viên / Chương / Bài học lên
// Supabase (bảng "study_content", 1 dòng JSON duy nhất, id = "main").
//
// Nhờ vậy, chỉnh sửa trong trang Cài đặt trên MỘT thiết bị sẽ hiện
// đúng như vậy khi mở web trên thiết bị KHÁC — không còn phụ thuộc
// localStorage của từng máy nữa.
//
// Cách hoạt động:
//   1. Khi app khởi động, đọc dữ liệu từ Supabase (nếu bảng chưa có
//      dòng nào, tự động ghi dữ liệu mặc định trong courses.ts lên
//      làm dòng đầu tiên).
//   2. Mọi thao tác thêm/sửa/xóa cập nhật ngay trên UI (optimistic),
//      đồng thời gửi lên Supabase ở nền.
//   3. Có đăng ký realtime — nếu dữ liệu trên Supabase đổi (từ thiết
//      bị khác, hoặc do chính mình sửa), UI tự cập nhật theo, không
//      cần tải lại trang.
// ============================================================

import { courses as seedCourses } from "../data/courses";
import type { Chapter, Course, Lesson, LessonMaterial, LessonVideo, Teacher } from "../types";
import { STORAGE_EVENT, notifyStorageChange } from "./storage";
import { supabase } from "./supabaseClient";

const TABLE = "study_content";
const ROW_ID = "main";

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

let current: Course[] = deepClone(seedCourses);
let ready = false;

export { STORAGE_EVENT };

export function getCourses(): Course[] {
  return current;
}

// true khi đã hoàn tất lần đọc dữ liệu đầu tiên từ Supabase (hoặc xác
// định là không có Supabase để dùng). Dùng để hiện màn hình "Đang tải"
// tránh chớp dữ liệu mặc định rồi đổi sang dữ liệu thật.
export function isContentReady(): boolean {
  return ready;
}

function setReady() {
  ready = true;
  notifyStorageChange();
}

async function persistRemote(next: Course[]): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: next, updated_at: new Date().toISOString() });
  if (error) {
    // eslint-disable-next-line no-console
    console.error("[StudyVault] Không lưu được dữ liệu lên Supabase:", error.message);
  }
}

// Cập nhật UI ngay lập tức, rồi gửi lên Supabase ở nền (fire-and-forget).
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
      current = data.data as Course[];
    } else {
      // Chưa có dòng nào trên Supabase — ghi dữ liệu mặc định lên làm gốc.
      await persistRemote(current);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[StudyVault] Không tải được dữ liệu từ Supabase, dùng dữ liệu mặc định:", err);
  } finally {
    setReady();
  }

  // Đồng bộ realtime: khi dữ liệu trên Supabase đổi (từ thiết bị khác),
  // cập nhật lại UI mà không cần tải lại trang.
  supabase
    .channel("study_content_sync")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: TABLE, filter: `id=eq.${ROW_ID}` },
      (payload) => {
        const next = (payload.new as { data?: Course[] } | null)?.data;
        if (next) {
          current = next;
          notifyStorageChange();
        }
      }
    )
    .subscribe();
}

void initialize();

export function resetToDefaultContent(): void {
  current = deepClone(seedCourses);
  persist();
}

// ---------------------------------------------------------------
// ID helpers
// ---------------------------------------------------------------

function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
  return base || "item";
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function namedId(prefix: string, name: string): string {
  return `${slugify(name)}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
}

// ---------------------------------------------------------------
// Lookup helpers (mutate a cloned tree in place)
// ---------------------------------------------------------------

function findCourse(tree: Course[], courseId: string): Course | undefined {
  return tree.find((c) => c.id === courseId);
}

function findTeacher(tree: Course[], courseId: string, teacherId: string): Teacher | undefined {
  return findCourse(tree, courseId)?.teachers.find((t) => t.id === teacherId);
}

function findChapter(
  tree: Course[],
  courseId: string,
  teacherId: string,
  chapterId: string
): Chapter | undefined {
  return findTeacher(tree, courseId, teacherId)?.chapters.find((c) => c.id === chapterId);
}

// ---------------------------------------------------------------
// Course CRUD
// ---------------------------------------------------------------

export type CourseInput = Omit<Course, "id" | "teachers">;

export function createCourse(input: CourseInput): Course {
  const course: Course = { ...input, id: namedId("course", input.name), teachers: [] };
  current = [...deepClone(current), course];
  persist();
  return course;
}

export function updateCourse(courseId: string, patch: Partial<CourseInput>): void {
  const next = deepClone(current);
  const course = findCourse(next, courseId);
  if (course) Object.assign(course, patch);
  current = next;
  persist();
}

export function deleteCourse(courseId: string): void {
  current = deepClone(current).filter((c) => c.id !== courseId);
  persist();
}

// ---------------------------------------------------------------
// Teacher CRUD
// ---------------------------------------------------------------

export type TeacherInput = Omit<Teacher, "id" | "chapters">;

export function createTeacher(courseId: string, input: TeacherInput): Teacher | null {
  const next = deepClone(current);
  const course = findCourse(next, courseId);
  if (!course) return null;
  const teacher: Teacher = { ...input, id: namedId("teacher", input.name), chapters: [] };
  course.teachers.push(teacher);
  current = next;
  persist();
  return teacher;
}

export function updateTeacher(
  courseId: string,
  teacherId: string,
  patch: Partial<TeacherInput>
): void {
  const next = deepClone(current);
  const teacher = findTeacher(next, courseId, teacherId);
  if (teacher) Object.assign(teacher, patch);
  current = next;
  persist();
}

export function deleteTeacher(courseId: string, teacherId: string): void {
  const next = deepClone(current);
  const course = findCourse(next, courseId);
  if (course) course.teachers = course.teachers.filter((t) => t.id !== teacherId);
  current = next;
  persist();
}

// ---------------------------------------------------------------
// Chapter CRUD
// ---------------------------------------------------------------

export type ChapterInput = Omit<Chapter, "id" | "lessons">;

export function createChapter(
  courseId: string,
  teacherId: string,
  input: ChapterInput
): Chapter | null {
  const next = deepClone(current);
  const teacher = findTeacher(next, courseId, teacherId);
  if (!teacher) return null;
  const chapter: Chapter = { ...input, id: namedId("chapter", input.name), lessons: [] };
  teacher.chapters.push(chapter);
  current = next;
  persist();
  return chapter;
}

export function updateChapter(
  courseId: string,
  teacherId: string,
  chapterId: string,
  patch: Partial<ChapterInput>
): void {
  const next = deepClone(current);
  const chapter = findChapter(next, courseId, teacherId, chapterId);
  if (chapter) Object.assign(chapter, patch);
  current = next;
  persist();
}

export function deleteChapter(courseId: string, teacherId: string, chapterId: string): void {
  const next = deepClone(current);
  const teacher = findTeacher(next, courseId, teacherId);
  if (teacher) teacher.chapters = teacher.chapters.filter((c) => c.id !== chapterId);
  current = next;
  persist();
}

// ---------------------------------------------------------------
// Lesson CRUD — bao gồm nhiều video (videos[]) và tài liệu (materials[])
// ---------------------------------------------------------------

export interface LessonInput {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  order: number;
  videos: LessonVideo[];
  materials: LessonMaterial[];
}

export function createLesson(
  courseId: string,
  teacherId: string,
  chapterId: string,
  input: LessonInput
): Lesson | null {
  const next = deepClone(current);
  const chapter = findChapter(next, courseId, teacherId, chapterId);
  if (!chapter) return null;
  const lesson: Lesson = {
    id: namedId("lesson", input.title),
    title: input.title,
    description: input.description,
    duration: input.duration,
    thumbnail: input.thumbnail,
    order: input.order,
    videos: input.videos,
    materials: input.materials,
    embedUrl: null,
    videoUrl: null,
    googleDriveFileId: null,
  };
  chapter.lessons.push(lesson);
  current = next;
  persist();
  return lesson;
}

export function updateLesson(
  courseId: string,
  teacherId: string,
  chapterId: string,
  lessonId: string,
  patch: Partial<LessonInput>
): void {
  const next = deepClone(current);
  const chapter = findChapter(next, courseId, teacherId, chapterId);
  const lesson = chapter?.lessons.find((l) => l.id === lessonId);
  if (lesson) Object.assign(lesson, patch);
  current = next;
  persist();
}

export function deleteLesson(
  courseId: string,
  teacherId: string,
  chapterId: string,
  lessonId: string
): void {
  const next = deepClone(current);
  const chapter = findChapter(next, courseId, teacherId, chapterId);
  if (chapter) chapter.lessons = chapter.lessons.filter((l) => l.id !== lessonId);
  current = next;
  persist();
}
