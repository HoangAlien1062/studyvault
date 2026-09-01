import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { useAuth } from "../hooks/useAuth";
import { useExamData, useExamDataReady } from "../hooks/useExamData";
import { getCourse } from "../lib/catalog";

export default function SoloPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const ready = useExamDataReady();
  const { duels, exams, attempts } = useExamData();

  if (authLoading || !ready) {
    return <div className="container-page py-16 text-center text-sm text-ash-500">Đang tải...</div>;
  }

  if (!user) {
    return (
      <div className="container-page py-16 flex justify-center">
        <Card className="w-full max-w-sm text-center space-y-4">
          <div className="text-3xl">⚔️</div>
          <div>
            <h1 className="font-display font-semibold text-ash-200">Thách đấu Solo</h1>
            <p className="text-sm text-ash-400 mt-1">
              Đăng nhập để mời bạn bè làm cùng 1 đề và so điểm trực tiếp.
            </p>
          </div>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </Card>
      </div>
    );
  }

  const myDuels = duels
    .filter((d) => d.challengerId === user.id || d.opponentId === user.id)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Kiểm tra", to: "/exams" }, { label: "Solo" }]} />

      <div>
        <h1 className="text-xl font-display font-bold text-ash-200">⚔️ Thách đấu Solo</h1>
        <p className="text-sm text-ash-400 mt-1">
          Làm xong 1 đề, bấm "Thách đấu" ở trang kết quả để lấy link mời bạn bè cùng làm đề đó — ai
          điểm cao hơn (hoặc làm nhanh hơn nếu hòa điểm) thắng.
        </p>
      </div>

      <Button onClick={() => navigate("/exams")}>Chọn đề để bắt đầu</Button>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-ash-200">Các trận của bạn</h2>
        {myDuels.length === 0 ? (
          <EmptyState
            icon="⚔️"
            title="Chưa có trận thách đấu nào"
            description="Hoàn thành một đề kiểm tra rồi bấm Thách đấu để tạo trận đầu tiên."
          />
        ) : (
          myDuels.map((duel) => {
            const exam = exams.find((e) => e.id === duel.examId);
            const course = exam ? getCourse(exam.courseId) : undefined;
            const isChallenger = duel.challengerId === user.id;
            const meName = isChallenger ? duel.challengerName : duel.opponentName;
            const opponentName = isChallenger ? duel.opponentName : duel.challengerName;

            let myScore: number | null = null;
            let opponentScore: number | null = null;
            if (duel.status === "completed") {
              const myAttemptId = isChallenger ? duel.challengerAttemptId : duel.opponentAttemptId;
              const oppAttemptId = isChallenger ? duel.opponentAttemptId : duel.challengerAttemptId;
              myScore = attempts.find((a) => a.id === myAttemptId)?.normalizedScore ?? null;
              opponentScore = attempts.find((a) => a.id === oppAttemptId)?.normalizedScore ?? null;
            }

            return (
              <Card
                key={duel.id}
                className="flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => navigate(`/duel/${duel.id}`)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {course && <Badge>{course.shortName}</Badge>}
                    <Badge tone={duel.status === "completed" ? "done" : "cue"}>
                      {duel.status === "completed" ? "Đã xong" : "Đang chờ"}
                    </Badge>
                  </div>
                  <p className="font-medium text-ash-200 truncate">{exam?.title ?? "Đề đã bị xóa"}</p>
                  <p className="text-xs text-ash-500 mt-0.5">
                    {meName ?? "Bạn"} vs {opponentName ?? "?"}
                  </p>
                </div>
                {duel.status === "completed" && myScore !== null && opponentScore !== null && (
                  <p className="font-mono text-sm font-semibold shrink-0">
                    <span className={myScore >= opponentScore ? "text-signal-done" : "text-ash-400"}>
                      {myScore.toFixed(1)}
                    </span>
                    <span className="text-ash-600"> - </span>
                    <span className={opponentScore > myScore ? "text-signal-done" : "text-ash-400"}>
                      {opponentScore.toFixed(1)}
                    </span>
                  </p>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
