import { useEffect, useState } from "react";
import type { LessonWithContext } from "../../types";
import { getLessonVideos } from "../../lib/catalog";

// Component DUY NHẤT chịu trách nhiệm hiển thị video.
//
// Một bài học có thể có NHIỀU video (lesson.videos). Nếu có hơn 1 video,
// component hiện thêm dải tab để chuyển giữa các video. Nguồn iframe
// luôn lấy từ video đang chọn — không hard-code URL ở trang nào khác.
//
//   Không có video nào   → hiển thị placeholder "Video chưa được kết nối"
//   Có video             → <iframe src={video.embedUrl}> responsive 16:9

export default function VideoPlayer({ lesson }: { lesson: LessonWithContext }) {
  const videos = getLessonVideos(lesson);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset về video đầu tiên mỗi khi chuyển sang bài học khác.
  useEffect(() => {
    setActiveIndex(0);
  }, [lesson.id]);

  const active = videos[activeIndex] ?? null;

  return (
    <div className="space-y-3">
      {videos.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors duration-150 ${
                index === activeIndex
                  ? "bg-cue/10 text-cue border-cue/30"
                  : "bg-ink-700 text-ash-400 border-ink-600 hover:text-ash-200 hover:border-ink-500"
              }`}
            >
              {video.title || `Video ${index + 1}`}
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-video w-full overflow-hidden rounded-xl2 bg-ink-950 border border-ink-600/70">
        {active ? (
          <iframe
            key={active.id}
            src={active.embedUrl}
            title={`${lesson.title} — ${active.title || "Video"}`}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6 animate-fadeUp">
            <div className="h-16 w-16 rounded-full bg-ink-800 border border-ink-600 flex items-center justify-center text-2xl text-ash-400">
              ▶
            </div>
            <p className="text-sm font-medium text-ash-300">Video chưa được kết nối</p>
            <p className="text-xs text-ash-500 max-w-xs">
              Vào <span className="text-cue/80 font-medium">Cài đặt → Bài học</span> để thêm video
              cho bài học này.
            </p>
          </div>
        )}
        <span className="absolute top-3 left-3 timecode bg-ink-950/70 px-2 py-1 rounded pointer-events-none">
          {lesson.duration}
        </span>
      </div>
    </div>
  );
}
