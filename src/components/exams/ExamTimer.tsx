import { useEffect, useRef, useState } from "react";

interface ExamTimerProps {
  deadline: number; // epoch ms
  onExpire: () => void;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function ExamTimer({ deadline, onExpire }: ExamTimerProps) {
  const [remaining, setRemaining] = useState(deadline - Date.now());
  const expiredRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = deadline - Date.now();
      setRemaining(left);
      if (left <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline, onExpire]);

  const isLow = remaining <= 2 * 60 * 1000;

  return (
    <div
      className={`flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1.5 rounded-lg border ${
        isLow
          ? "text-signal-live border-signal-live/40 bg-signal-live/10 animate-pulse"
          : "text-ash-200 border-ink-600 bg-ink-800"
      }`}
    >
      ⏱ {formatTime(remaining)}
    </div>
  );
}
