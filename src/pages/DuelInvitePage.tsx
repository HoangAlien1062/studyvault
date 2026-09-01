import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useExamData, useExamDataReady } from "../hooks/useExamData";
import { useAuth } from "../hooks/useAuth";
import { chargeSoloStake, SOLO_STAKE } from "../lib/coins";

export default function DuelInvitePage() {
  const { duelId = "" } = useParams();
  const navigate = useNavigate();
  const ready = useExamDataReady();
  const { duels, exams, attempts } = useExamData();
  const { user, profile, loading: authLoading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  if (!ready || authLoading) return <div className="container-page py-16 text-center text-sm text-ash-500">Đang tải...</div>;

  const duel = duels.find((d) => d.id === duelId);

  if (!duel) {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-ash-400">Không tìm thấy lời thách đấu này.</p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Về trang chủ
        </Button>
      </div>
    );
  }

  const exam = exams.find((e) => e.id === duel.examId);
  const isChallenger = user?.id === duel.challengerId;
  const link = typeof window !== "undefined" ? `${window.location.origin}/duel/${duel.id}` : "";

  if (!user) {
    return (
      <div className="container-page py-16 flex justify-center">
        <Card className="w-full max-w-sm text-center space-y-4">
          <div className="text-3xl">⚔️</div>
          <p className="text-sm text-ash-300">
            <strong className="text-ash-200">{duel.challengerName}</strong> thách đấu bạn với đề{" "}
            <strong className="text-ash-200">{exam?.title ?? "?"}</strong>!
          </p>
          <p className="text-xs text-ash-500">Đăng nhập để chấp nhận thách đấu.</p>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </Card>
      </div>
    );
  }

  // Đã hoàn thành cả 2 phía — hiện màn so kết quả.
  if (duel.status === "completed") {
    const challengerAttempt = attempts.find((a) => a.id === duel.challengerAttemptId);
    const opponentAttempt = attempts.find((a) => a.id === duel.opponentAttemptId);
    const cScore = challengerAttempt?.normalizedScore ?? 0;
    const oScore = opponentAttempt?.normalizedScore ?? 0;
    const cTime = challengerAttempt?.timeSpentSeconds ?? 0;
    const oTime = opponentAttempt?.timeSpentSeconds ?? 0;
    const winner =
      cScore !== oScore ? (cScore > oScore ? "challenger" : "opponent") : cTime <= oTime ? "challenger" : "opponent";

    const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

    return (
      <div className="container-page py-8 flex justify-center">
        <Card className="w-full max-w-md space-y-5 text-center">
          <div className="text-3xl">⚔️</div>
          <h1 className="font-display font-semibold text-ash-200">Kết quả thách đấu</h1>
          <p className="text-xs text-ash-500">{exam?.title}</p>

          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded-xl border p-4 ${
                winner === "challenger" ? "border-cue bg-cue/10" : "border-ink-600 bg-ink-800/40"
              }`}
            >
              {winner === "challenger" && <p className="text-xs text-cue mb-1">🏆 Thắng</p>}
              <p className="text-sm text-ash-300 truncate">{duel.challengerName}</p>
              <p className="text-2xl font-display font-bold text-ash-200 mt-1">{cScore.toFixed(1)}</p>
              <p className="text-xs text-ash-500 mt-1">{fmtTime(cTime)}</p>
            </div>
            <div
              className={`rounded-xl border p-4 ${
                winner === "opponent" ? "border-cue bg-cue/10" : "border-ink-600 bg-ink-800/40"
              }`}
            >
              {winner === "opponent" && <p className="text-xs text-cue mb-1">🏆 Thắng</p>}
              <p className="text-sm text-ash-300 truncate">{duel.opponentName}</p>
              <p className="text-2xl font-display font-bold text-ash-200 mt-1">{oScore.toFixed(1)}</p>
              <p className="text-xs text-ash-500 mt-1">{fmtTime(oTime)}</p>
            </div>
          </div>

          <div className="flex gap-2 justify-center pt-2">
            <Button variant="secondary" onClick={() => navigate("/exams/history")}>
              Lịch sử làm bài
            </Button>
            <Button onClick={() => navigate("/")}>Về trang chủ</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Đang chờ — người thách đấu thấy link để chia sẻ, đối thủ thấy nút chấp nhận.
  return (
    <div className="container-page py-16 flex justify-center">
      <Card className="w-full max-w-sm text-center space-y-4">
        <div className="text-3xl">⚔️</div>
        {isChallenger ? (
          <>
            <h1 className="font-display font-semibold text-ash-200">Đang chờ đối thủ...</h1>
            <p className="text-sm text-ash-400">
              Gửi link này cho bạn bè để họ chấp nhận thách đấu đề{" "}
              <strong className="text-ash-200">{exam?.title ?? "?"}</strong>:
            </p>
            <div className="flex gap-2">
              <input
                readOnly
                value={link}
                className="flex-1 rounded-lg bg-ink-800 border border-ink-600 px-3 py-2 text-xs text-ash-300"
                onFocus={(e) => e.target.select()}
              />
              <Button
                size="sm"
                onClick={() => {
                  navigator.clipboard?.writeText(link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Đã copy!" : "Copy"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-ash-300">
              <strong className="text-ash-200">{duel.challengerName}</strong> thách đấu bạn với đề{" "}
              <strong className="text-ash-200">{exam?.title ?? "?"}</strong>!
            </p>
            <p className="text-xs text-ash-500">Điểm của bạn sẽ được so với điểm của {duel.challengerName} sau khi bạn làm xong.</p>
            <p className="text-xs text-ash-400">
              Trận này tốn <strong className="text-cue">{SOLO_STAKE} 🪙</strong> — số dư của bạn:{" "}
              <strong className="text-ash-200">{profile?.coins ?? 0} 🪙</strong>. Thắng nhận lại{" "}
              {SOLO_STAKE * 2} 🪙, thua mất {SOLO_STAKE} 🪙, hòa được hoàn lại.
            </p>
            {acceptError && <p className="text-xs text-signal-danger">⚠️ {acceptError}</p>}
            <Button
              className="w-full"
              disabled={accepting}
              onClick={async () => {
                setAccepting(true);
                setAcceptError(null);
                const { ok, balance } = await chargeSoloStake(user.id, duel.id);
                if (!ok) {
                  setAcceptError(`Cần ${SOLO_STAKE} coin để chấp nhận, bạn hiện có ${balance ?? profile?.coins ?? 0} coin.`);
                  setAccepting(false);
                  return;
                }
                navigate(`/exams/${duel.examId}?duel=${duel.id}`);
              }}
            >
              {accepting ? "Đang xử lý..." : `Chấp nhận & làm bài (tốn ${SOLO_STAKE} 🪙)`}
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
