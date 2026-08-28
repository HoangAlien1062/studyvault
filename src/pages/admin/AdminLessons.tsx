import { useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { FieldGroup, Input, Textarea } from "../../components/ui/Field";
import { useCourses } from "../../hooks/useUserData";
import { createLesson, deleteLesson, generateId, updateLesson } from "../../lib/contentStore";
import type { Lesson, LessonMaterial, LessonVideo } from "../../types";

interface LessonForm {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  order: number;
  videos: LessonVideo[];
  materials: LessonMaterial[];
}

function emptyForm(nextOrder: number): LessonForm {
  return {
    title: "",
    description: "",
    duration: "",
    thumbnail: "🎬",
    order: nextOrder,
    videos: [],
    materials: [],
  };
}

export default function AdminLessons() {
  const { courseId = "", teacherId = "", chapterId = "" } = useParams();
  const courses = useCourses();
  const course = courses.find((c) => c.id === courseId);
  const teacher = course?.teachers.find((t) => t.id === teacherId);
  const chapter = teacher?.chapters.find((c) => c.id === chapterId);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<LessonForm>(emptyForm(1));

  if (!course || !teacher || !chapter) return <Navigate to="/admin" replace />;

  function startCreate() {
    setForm(emptyForm(chapter!.lessons.length + 1));
    setEditingId(null);
    setCreating(true);
  }

  function startEdit(lesson: Lesson) {
    setForm({
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      thumbnail: lesson.thumbnail,
      order: lesson.order,
      videos: lesson.videos && lesson.videos.length > 0
        ? lesson.videos
        : lesson.embedUrl
          ? [{ id: generateId("video"), title: "Video 1", embedUrl: lesson.embedUrl }]
          : [],
      materials: lesson.materials ?? [],
    });
    setEditingId(lesson.id);
    setCreating(false);
  }

  function closePanel() {
    setCreating(false);
    setEditingId(null);
  }

  function handleSubmit() {
    if (!form.title.trim()) return;
    const cleanVideos = form.videos.filter((v) => v.embedUrl.trim());
    const cleanMaterials = form.materials.filter((m) => m.name.trim() && m.url.trim());
    const payload = { ...form, videos: cleanVideos, materials: cleanMaterials };
    if (editingId) {
      updateLesson(courseId, teacherId, chapterId, editingId, payload);
    } else {
      createLesson(courseId, teacherId, chapterId, payload);
    }
    closePanel();
  }

  function handleDelete(lesson: Lesson) {
    if (window.confirm(`Xóa bài học "${lesson.title}"?`)) {
      deleteLesson(courseId, teacherId, chapterId, lesson.id);
    }
  }

  function addVideoRow() {
    setForm((f) => ({
      ...f,
      videos: [...f.videos, { id: generateId("video"), title: `Video ${f.videos.length + 1}`, embedUrl: "" }],
    }));
  }

  function updateVideoRow(id: string, patch: Partial<LessonVideo>) {
    setForm((f) => ({ ...f, videos: f.videos.map((v) => (v.id === id ? { ...v, ...patch } : v)) }));
  }

  function removeVideoRow(id: string) {
    setForm((f) => ({ ...f, videos: f.videos.filter((v) => v.id !== id) }));
  }

  function addMaterialRow() {
    setForm((f) => ({
      ...f,
      materials: [...f.materials, { id: generateId("material"), name: "", url: "" }],
    }));
  }

  function updateMaterialRow(id: string, patch: Partial<LessonMaterial>) {
    setForm((f) => ({
      ...f,
      materials: f.materials.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  }

  function removeMaterialRow(id: string) {
    setForm((f) => ({ ...f, materials: f.materials.filter((m) => m.id !== id) }));
  }

  const panelOpen = creating || editingId !== null;
  const sortedLessons = chapter.lessons.slice().sort((a, b) => a.order - b.order);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Cài đặt", to: "/admin" },
          { label: course.name, to: `/admin/${courseId}` },
          { label: teacher.name, to: `/admin/${courseId}/${teacherId}` },
          { label: chapter.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ash-200">{chapter.name}</h1>
          <p className="text-sm text-ash-400 mt-1">
            {teacher.name} · {course.name} · Quản lý bài học, video và tài liệu.
          </p>
        </div>
        <Button size="sm" icon="+" onClick={startCreate}>
          Thêm bài học
        </Button>
      </div>

      {panelOpen && (
        <div className="surface-card p-5 space-y-5 animate-fadeUp">
          <h2 className="text-sm font-display font-semibold text-ash-200">
            {editingId ? "Sửa bài học" : "Thêm bài học mới"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_110px_90px] gap-4">
            <FieldGroup label="Tiêu đề bài học *">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Bài 01 — Tập xác định"
              />
            </FieldGroup>
            <FieldGroup label="Thời lượng">
              <Input
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="45:32"
              />
            </FieldGroup>
            <FieldGroup label="Thứ tự">
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) || 1 })}
              />
            </FieldGroup>
            <FieldGroup label="Icon">
              <Input
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                placeholder="🎬"
              />
            </FieldGroup>
          </div>

          <FieldGroup label="Mô tả">
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Nội dung chính của bài học này."
            />
          </FieldGroup>

          {/* --- Videos: số lượng tùy chỉnh, mỗi bài có thể nhiều video --- */}
          <div className="border-t border-ink-600/70 pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Video ({form.videos.length})</Label>
              <Button size="sm" variant="secondary" icon="+" onClick={addVideoRow}>
                Thêm video
              </Button>
            </div>
            {form.videos.length === 0 ? (
              <p className="text-xs text-ash-500">
                Chưa có video nào — bài học sẽ hiển thị "Video chưa được kết nối".
              </p>
            ) : (
              <div className="space-y-2.5">
                {form.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="flex flex-col sm:flex-row gap-2.5 rounded-lg border border-ink-600/70 bg-ink-700/30 p-3"
                  >
                    <Input
                      value={video.title}
                      onChange={(e) => updateVideoRow(video.id, { title: e.target.value })}
                      placeholder={`Video ${index + 1}`}
                      className="sm:w-40 shrink-0"
                    />
                    <Input
                      value={video.embedUrl}
                      onChange={(e) => updateVideoRow(video.id, { embedUrl: e.target.value })}
                      placeholder="https://drive.google.com/file/d/FILE_ID/preview"
                      className="flex-1 font-mono text-xs"
                    />
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => removeVideoRow(video.id)}
                      aria-label="Xóa video"
                    >
                      🗑
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- Tài liệu đính kèm --- */}
          <div className="border-t border-ink-600/70 pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Tài liệu đính kèm ({form.materials.length})</Label>
              <Button size="sm" variant="secondary" icon="+" onClick={addMaterialRow}>
                Thêm tài liệu
              </Button>
            </div>
            {form.materials.length === 0 ? (
              <p className="text-xs text-ash-500">Chưa có tài liệu nào cho bài học này.</p>
            ) : (
              <div className="space-y-2.5">
                {form.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex flex-col sm:flex-row gap-2.5 rounded-lg border border-ink-600/70 bg-ink-700/30 p-3"
                  >
                    <Input
                      value={material.name}
                      onChange={(e) => updateMaterialRow(material.id, { name: e.target.value })}
                      placeholder="Tài liệu ôn tập.pdf"
                      className="sm:w-56 shrink-0"
                    />
                    <Input
                      value={material.url}
                      onChange={(e) => updateMaterialRow(material.id, { url: e.target.value })}
                      placeholder="https://drive.google.com/file/d/FILE_ID/view"
                      className="flex-1 font-mono text-xs"
                    />
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => removeMaterialRow(material.id)}
                      aria-label="Xóa tài liệu"
                    >
                      🗑
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2.5 pt-1">
            <Button size="sm" onClick={handleSubmit}>
              {editingId ? "Lưu thay đổi" : "Thêm bài học"}
            </Button>
            <Button size="sm" variant="secondary" onClick={closePanel}>
              Hủy
            </Button>
          </div>
        </div>
      )}

      {sortedLessons.length === 0 ? (
        <EmptyState icon="🎬" title="Chưa có bài học" description="Nhấn “Thêm bài học” để bắt đầu." />
      ) : (
        <div className="space-y-2.5">
          {sortedLessons.map((lesson) => {
            const videoCount = lesson.videos && lesson.videos.length > 0
              ? lesson.videos.length
              : lesson.embedUrl
                ? 1
                : 0;
            const materialCount = lesson.materials?.length ?? 0;
            return (
              <div
                key={lesson.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-ink-600/70 bg-ink-800 px-4 py-3.5"
              >
                <div className="font-mono text-xs text-ash-500 w-6 shrink-0">
                  {String(lesson.order).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-[160px]">
                  <p className="text-sm font-medium text-ash-200 truncate">{lesson.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="timecode">{lesson.duration || "—"}</span>
                    <Badge tone={videoCount > 0 ? "cue" : "neutral"}>
                      🎬 {videoCount > 0 ? `${videoCount} video` : "Chưa có video"}
                    </Badge>
                    {materialCount > 0 && <Badge tone="neutral">📄 {materialCount} tài liệu</Badge>}
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => startEdit(lesson)} aria-label="Sửa">
                  ✎ Sửa
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(lesson)}
                  aria-label="Xóa"
                >
                  🗑
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-medium text-ash-400">{children}</p>;
}
