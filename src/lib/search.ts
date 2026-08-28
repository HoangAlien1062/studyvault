import { getAllLessonsWithContext } from "./catalog";
import type { LessonWithContext } from "../types";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // bỏ dấu tiếng Việt để search "khong dau" vẫn ra kết quả
}

export interface SearchFilters {
  courseId?: string;
  teacherId?: string;
  status?: "all" | "completed" | "in-progress" | "not-started";
}

export function searchLessons(
  query: string,
  filters: SearchFilters = {},
  progressLookup?: (lessonId: string) => { completed: boolean; progress: number } | undefined
): LessonWithContext[] {
  const q = normalize(query.trim());
  const all = getAllLessonsWithContext();

  return all.filter((lesson) => {
    if (filters.courseId && lesson.course.id !== filters.courseId) return false;
    if (filters.teacherId && lesson.teacher.id !== filters.teacherId) return false;

    if (filters.status && filters.status !== "all") {
      const p = progressLookup?.(lesson.id);
      const completed = p?.completed ?? false;
      const inProgress = !completed && (p?.progress ?? 0) > 0;
      if (filters.status === "completed" && !completed) return false;
      if (filters.status === "in-progress" && !inProgress) return false;
      if (filters.status === "not-started" && (completed || inProgress)) return false;
    }

    if (!q) return true;

    const haystack = normalize(
      [
        lesson.title,
        lesson.description,
        lesson.course.name,
        lesson.teacher.name,
        lesson.chapter.name,
      ].join(" ")
    );
    return haystack.includes(q);
  });
}
