import Button from "../ui/Button";

interface VideoControlsProps {
  hasPrev: boolean;
  hasNext: boolean;
  completed: boolean;
  favorited: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleCompleted: () => void;
  onToggleFavorite: () => void;
}

export default function VideoControls({
  hasPrev,
  hasNext,
  completed,
  favorited,
  onPrev,
  onNext,
  onToggleCompleted,
  onToggleFavorite,
}: VideoControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button variant="secondary" size="sm" disabled={!hasPrev} onClick={onPrev} icon="←">
        Bài trước
      </Button>
      <Button
        variant={completed ? "primary" : "secondary"}
        size="sm"
        onClick={onToggleCompleted}
        icon={completed ? "✓" : "○"}
      >
        {completed ? "Đã học" : "Đánh dấu đã học"}
      </Button>
      <Button
        variant={favorited ? "primary" : "secondary"}
        size="sm"
        onClick={onToggleFavorite}
        icon={favorited ? "★" : "☆"}
      >
        {favorited ? "Đã lưu" : "Lưu"}
      </Button>
      <Button variant="secondary" size="sm" disabled={!hasNext} onClick={onNext}>
        Bài tiếp →
      </Button>
    </div>
  );
}
