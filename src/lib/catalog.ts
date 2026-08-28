import { getCourses } from "./contentStore";
import type {
  Chapter,
  Course,
  Lesson,
  LessonMaterial,
  LessonVideo,
  LessonWithContext,
  Teacher,
} from "../types";

export function getAllCourses(): Course[] {
  return getCourses();
}

export function getCourse(courseId: string): Course | undefined {
  return getCourses().find((c) => c.id === courseId);
}

export function getTeacher(courseId: string, teacherId: string): Teacher | undefined {
  return getCourse(courseId)?.teachers.find((t) => t.id === teacherId);
}

export function getChapter(
  courseId: string,
  teacherId: string,
  chapterId: string
): Chapter | undefined {
  return getTeacher(courseId, teacherId)?.chapters.find((c) => c.id === chapterId);
}

export function countLessons(chapters: Chapter[]): number {
  return chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
}

export function countTeacherLessons(teacher: Teacher): number {
  return countLessons(teacher.chapters);
}

export function countCourseLessons(course: Course): number {
  return course.teachers.reduce((sum, t) => sum + countTeacherLessons(t), 0);
}

export function countCourseChapters(course: Course): number {
  return course.teachers.reduce((sum, t) => sum + t.chapters.length, 0);
}

// Duration strings are "mm:ss" — sum them into total minutes for display.
export function durationToSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

export function secondsToLabel(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.round((totalSeconds % 3600) / 60);
  if (h > 0) return `${h} giờ ${m} phút`;
  return `${m} phút`;
}

export function chapterDurationLabel(chapter: Chapter): string {
  const total = chapter.lessons.reduce((sum, l) => sum + durationToSeconds(l.duration), 0);
  return secondsToLabel(total);
}

export function courseDurationSeconds(course: Course): number {
  let total = 0;
  for (const t of course.teachers) {
    for (const c of t.chapters) {
      for (const l of c.lessons) total += durationToSeconds(l.duration);
    }
  }
  return total;
}

// Flatten every lesson in the catalog with full breadcrumb context.
// Used by search, favorites, history and the video player (prev/next).
export function getAllLessonsWithContext(): LessonWithContext[] {
  const result: LessonWithContext[] = [];
  for (const course of getCourses()) {
    for (const teacher of course.teachers) {
      for (const chapter of teacher.chapters) {
        for (const lesson of chapter.lessons) {
          result.push({ ...lesson, course, teacher, chapter });
        }
      }
    }
  }
  return result;
}

export function findLessonWithContext(lessonId: string): LessonWithContext | undefined {
  return getAllLessonsWithContext().find((l) => l.id === lessonId);
}

export function getChapterLessonsWithContext(
  courseId: string,
  teacherId: string,
  chapterId: string
): LessonWithContext[] {
  const course = getCourse(courseId);
  const teacher = getTeacher(courseId, teacherId);
  const chapter = getChapter(courseId, teacherId, chapterId);
  if (!course || !teacher || !chapter) return [];
  return chapter.lessons
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((lesson) => ({ ...lesson, course, teacher, chapter }));
}

export function getAdjacentLessons(lessonId: string): {
  prev: LessonWithContext | null;
  next: LessonWithContext | null;
} {
  const current = findLessonWithContext(lessonId);
  if (!current) return { prev: null, next: null };
  const siblings = getChapterLessonsWithContext(
    current.course.id,
    current.teacher.id,
    current.chapter.id
  );
  const index = siblings.findIndex((l) => l.id === lessonId);
  return {
    prev: index > 0 ? siblings[index - 1] : null,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null,
  };
}

// --- Video & tài liệu ---
// Một bài học có thể có nhiều video (lesson.videos). Nếu chưa có mảng
// videos nhưng vẫn còn embedUrl kiểu cũ, tự động coi đó là "Video 1"
// để không phá vỡ dữ liệu đã nhập trước đây.
export function getLessonVideos(lesson: Lesson): LessonVideo[] {
  if (lesson.videos && lesson.videos.length > 0) return lesson.videos;
  if (lesson.embedUrl) {
    return [{ id: `${lesson.id}-legacy`, title: "Video 1", embedUrl: lesson.embedUrl }];
  }
  return [];
}

export function getLessonMaterials(lesson: Lesson): LessonMaterial[] {
  return lesson.materials ?? [];
}

// VideoPlayer chỉ render iframe khi có ít nhất 1 video hợp lệ.
export function lessonHasVideo(lesson: Lesson): boolean {
  return getLessonVideos(lesson).length > 0;
}
