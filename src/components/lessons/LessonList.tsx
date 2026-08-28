import type { LessonWithContext } from "../../types";
import LessonRow from "./LessonRow";
import EmptyState from "../ui/EmptyState";

interface LessonListProps {
  lessons: LessonWithContext[];
  activeLessonId?: string;
  getProgress?: (lessonId: string) => { progress: number; completed: boolean };
}

export default function LessonList({ lessons, activeLessonId, getProgress }: LessonListProps) {
  if (lessons.length === 0) {
    return (
      <EmptyState
        icon="🎬"
        title="Chưa có bài học"
        description="Vào Cài đặt → chọn môn/giáo viên/chương để thêm bài học cho chương này."
      />
    );
  }

  return (
    <div className="space-y-2.5">
      {lessons.map((lesson) => {
        const p = getProgress?.(lesson.id);
        return (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            active={lesson.id === activeLessonId}
            completed={p?.completed}
            progress={p?.progress}
          />
        );
      })}
    </div>
  );
}
