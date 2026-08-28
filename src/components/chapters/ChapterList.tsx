import type { Chapter, Course, Teacher } from "../../types";
import ChapterCard from "./ChapterCard";
import EmptyState from "../ui/EmptyState";

export default function ChapterList({
  course,
  teacher,
  chapters,
  getProgress,
}: {
  course: Course;
  teacher: Teacher;
  chapters: Chapter[];
  getProgress?: (chapter: Chapter) => number;
}) {
  if (chapters.length === 0) {
    return (
      <EmptyState
        icon="🗂️"
        title="Chưa có chương nào"
        description="Thêm chương vào mảng chapters của giáo viên này trong /src/data/courses.ts."
      />
    );
  }

  const sorted = [...chapters].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-3">
      {sorted.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          course={course}
          teacher={teacher}
          chapter={chapter}
          progressPct={getProgress?.(chapter)}
        />
      ))}
    </div>
  );
}
