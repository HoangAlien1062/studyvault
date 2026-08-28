import { Link } from "react-router-dom";
import type { LessonWithContext } from "../../types";
import ProgressBar from "../ui/ProgressBar";

export default function LessonCard({
  lesson,
  progress = 0,
}: {
  lesson: LessonWithContext;
  progress?: number;
}) {
  return (
    <Link
      to={`/lesson/${lesson.id}`}
      className="surface-card overflow-hidden flex flex-col group animate-fadeUp"
    >
      <div className="relative aspect-video bg-gradient-to-br from-ink-700 to-ink-800 flex items-center justify-center overflow-hidden">
        <span className="text-4xl opacity-60">{lesson.thumbnail}</span>
        <div className="absolute inset-0 flex items-center justify-center bg-ink-950/0 group-hover:bg-ink-950/30 transition-colors duration-300">
          <div className="h-11 w-11 rounded-full bg-cue/90 text-ink-950 flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
            ▶
          </div>
        </div>
        <span className="absolute bottom-2 right-2 timecode bg-ink-950/80 px-1.5 py-0.5 rounded">
          {lesson.duration}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs text-ash-500 font-mono truncate">
          {lesson.course.shortName} · {lesson.chapter.name}
        </p>
        <h3 className="text-sm font-medium text-ash-200 mt-1 line-clamp-2">{lesson.title}</h3>
        <div className="mt-3">
          <ProgressBar value={progress} showLabel />
        </div>
      </div>
    </Link>
  );
}
