import { Link } from "react-router-dom";
import type { LessonWithContext } from "../../types";

interface LessonRowProps {
  lesson: LessonWithContext;
  active?: boolean;
  completed?: boolean;
  progress?: number;
}

function statusIcon(active?: boolean, completed?: boolean) {
  if (active) return <span className="text-cue">▶</span>;
  if (completed) return <span className="text-signal-done">✓</span>;
  return <span className="text-ash-500">○</span>;
}

export default function LessonRow({ lesson, active, completed, progress }: LessonRowProps) {
  return (
    <Link
      to={`/lesson/${lesson.id}`}
      className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all duration-200 group ${
        active
          ? "bg-cue/10 border-cue/40"
          : "bg-ink-800 border-ink-600/70 hover:border-ink-500 hover:bg-ink-700/50"
      }`}
    >
      <div className="w-6 text-center text-base shrink-0">{statusIcon(active, completed)}</div>
      <div className="font-mono text-xs text-ash-500 w-6 shrink-0">
        {String(lesson.order).padStart(2, "0")}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${active ? "text-cue" : "text-ash-200"}`}
        >
          {lesson.title}
        </p>
        {typeof progress === "number" && progress > 0 && !completed && (
          <div className="mt-1.5 h-1 w-32 rounded-full bg-ink-600 overflow-hidden">
            <div className="h-full bg-cue rounded-full" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <div className="timecode shrink-0">{lesson.duration}</div>
    </Link>
  );
}
