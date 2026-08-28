import { Link } from "react-router-dom";
import type { Chapter, Course, Teacher } from "../../types";
import { chapterDurationLabel } from "../../lib/catalog";
import ProgressBar from "../ui/ProgressBar";

interface ChapterCardProps {
  course: Course;
  teacher: Teacher;
  chapter: Chapter;
  progressPct?: number;
}

export default function ChapterCard({ course, teacher, chapter, progressPct }: ChapterCardProps) {
  return (
    <Link
      to={`/courses/${course.id}/teachers/${teacher.id}/chapters/${chapter.id}`}
      className="surface-card p-5 flex items-center gap-5 group animate-fadeUp"
    >
      <div className="shrink-0 font-mono text-lg text-cue/80 tabular-nums w-14 text-center">
        {String(chapter.order).padStart(2, "0")}
        <span className="text-ink-500">:00</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-semibold text-ash-200 truncate">{chapter.name}</h3>
        <p className="text-xs text-ash-500 mt-1 font-mono">
          {chapter.lessons.length} bài học · {chapterDurationLabel(chapter)}
        </p>
        {typeof progressPct === "number" && (
          <div className="mt-3 max-w-xs">
            <ProgressBar value={progressPct} />
          </div>
        )}
      </div>
      <span className="text-cue text-lg shrink-0 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
