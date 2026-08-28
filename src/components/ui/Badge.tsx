import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "cue" | "done" | "live";
}

const tones: Record<string, string> = {
  neutral: "bg-ink-700 text-ash-400 border-ink-600",
  cue: "bg-cue/10 text-cue border-cue/30",
  done: "bg-signal-done/10 text-signal-done border-signal-done/30",
  live: "bg-signal-live/10 text-signal-live border-signal-live/30",
};

export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
