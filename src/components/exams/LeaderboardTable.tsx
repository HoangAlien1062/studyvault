import Card from "../ui/Card";
import type { ExamAttempt } from "../../types/exam";

const MEDALS = ["🥇", "🥈", "🥉"];

interface LeaderboardTableProps {
  attempts: ExamAttempt[];
}

// Xếp hạng công bằng: điểm cao hơn trước; nếu bằng điểm, thời gian làm
// bài thấp hơn xếp trên (không chỉ sort theo điểm).
export function sortLeaderboard(attempts: ExamAttempt[]): ExamAttempt[] {
  return [...attempts].sort((a, b) => {
    if (b.normalizedScore !== a.normalizedScore) return b.normalizedScore - a.normalizedScore;
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });
}

export default function LeaderboardTable({ attempts }: LeaderboardTableProps) {
  const ranked = sortLeaderboard(attempts);

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="divide-y divide-ink-600/70">
        {ranked.map((attempt, idx) => (
          <div key={attempt.id} className="flex items-center gap-4 px-5 py-3.5">
            <span className="w-8 text-center text-base shrink-0">{MEDALS[idx] ?? idx + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ash-200 truncate">{attempt.displayName}</p>
              <p className="text-xs text-ash-500">
                {Math.floor(attempt.timeSpentSeconds / 60)} phút {attempt.timeSpentSeconds % 60} giây
              </p>
            </div>
            <span className="font-mono text-sm font-semibold text-cue shrink-0">
              {attempt.normalizedScore.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
