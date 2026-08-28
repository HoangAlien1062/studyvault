interface ProgressBarProps {
  value: number; // 0-100
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function ProgressBar({ value, showLabel = false, size = "md" }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  const height = size === "sm" ? "h-1" : "h-1.5";

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`scrubber-track ${height}`}>
        <div className="scrubber-fill" style={{ width: `${pct}%` }} />
        <div className="scrubber-handle" style={{ left: `calc(${pct}% - 6px)` }} />
      </div>
      {showLabel && <span className="timecode shrink-0">{Math.round(pct)}%</span>}
    </div>
  );
}
