import { Link } from "react-router-dom";
import type { LessonWithContext } from "../../types";

interface VideoPlaylistProps {
  lessons: LessonWithContext[];
  activeLessonId: string;
  getProgress: (lessonId: string) => { progress: number; completed: boolean };
}

function statusIcon(active: boolean, completed: boolean) {
  if (active) return "▶";
  if (completed) return "✓";
  return "○";
}

export default function VideoPlaylist({ lessons, activeLessonId, getProgress }: VideoPlaylistProps) {
  return (
    <div className="surface-card p-4">
      <h2 className="text-sm font-display font-semibold text-ash-200 px-2 mb-2">Playlist</h2>
      <div className="space-y-1 max-h-[560px] overflow-y-auto pr-1">
        {lessons.map((lesson) => {
          const active = lesson.id === activeLessonId;
          const { completed } = getProgress(lesson.id);
          return (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                active
                  ? "bg-cue/10 text-cue"
                  : "text-ash-300 hover:bg-ink-700/60 hover:text-ash-200"
              }`}
            >
              <span className={`w-4 text-center shrink-0 ${completed && !active ? "text-signal-done" : ""}`}>
                {statusIcon(active, completed)}
              </span>
              <span className="flex-1 min-w-0 truncate">{lesson.title}</span>
              <span className="timecode shrink-0">{lesson.duration}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
