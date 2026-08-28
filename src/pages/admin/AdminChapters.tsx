import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { FieldGroup, Input, Textarea } from "../../components/ui/Field";
import { useCourses } from "../../hooks/useUserData";
import { chapterDurationLabel } from "../../lib/catalog";
import { createChapter, deleteChapter, updateChapter } from "../../lib/contentStore";
import type { Chapter } from "../../types";

interface ChapterForm {
  name: string;
  description: string;
  order: number;
}

function emptyForm(nextOrder: number): ChapterForm {
  return { name: "", description: "", order: nextOrder };
}

export default function AdminChapters() {
  const { courseId = "", teacherId = "" } = useParams();
  const courses = useCourses();
  const course = courses.find((c) => c.id === courseId);
  const teacher = course?.teachers.find((t) => t.id === teacherId);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ChapterForm>(emptyForm(1));

  if (!course || !teacher) return <Navigate to="/admin" replace />;

  function startCreate() {
    setForm(emptyForm(teacher!.chapters.length + 1));
    setEditingId(null);
    setCreating(true);
  }

  function startEdit(chapter: Chapter) {
    setForm({ name: chapter.name, description: chapter.description, order: chapter.order });
    setEditingId(chapter.id);
    setCreating(false);
  }

  function closePanel() {
    setCreating(false);
    setEditingId(null);
  }

  function handleSubmit() {
    if (!form.name.trim()) return;
    if (editingId) {
      updateChapter(courseId, teacherId, editingId, form);
    } else {
      createChapter(courseId, teacherId, form);
    }
    closePanel();
  }

  function handleDelete(chapter: Chapter) {
    const ok = window.confirm(`Xóa chương "${chapter.name}"? Toàn bộ bài học bên trong cũng sẽ bị xóa.`);
    if (ok) deleteChapter(courseId, teacherId, chapter.id);
  }

  const panelOpen = creating || editingId !== null;
  const sortedChapters = teacher.chapters.slice().sort((a, b) => a.order - b.order);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Cài đặt", to: "/admin" },
          { label: course.name, to: `/admin/${courseId}` },
          { label: teacher.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ash-200">{teacher.name}</h1>
          <p className="text-sm text-ash-400 mt-1">
            {course.name} · Quản lý chương / chủ đề của giáo viên này.
          </p>
        </div>
        <Button size="sm" icon="+" onClick={startCreate}>
          Thêm chương
        </Button>
      </div>

      {panelOpen && (
        <div className="surface-card p-5 space-y-4 animate-fadeUp">
          <h2 className="text-sm font-display font-semibold text-ash-200">
            {editingId ? "Sửa chương" : "Thêm chương mới"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4">
            <FieldGroup label="Tên chương *">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Khảo sát hàm số"
              />
            </FieldGroup>
            <FieldGroup label="Thứ tự">
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) || 1 })}
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Mô tả">
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Nội dung chính của chương này."
            />
          </FieldGroup>
          <div className="flex gap-2.5">
            <Button size="sm" onClick={handleSubmit}>
              {editingId ? "Lưu thay đổi" : "Thêm chương"}
            </Button>
            <Button size="sm" variant="secondary" onClick={closePanel}>
              Hủy
            </Button>
          </div>
        </div>
      )}

      {sortedChapters.length === 0 ? (
        <EmptyState icon="🗂️" title="Chưa có chương nào" description="Nhấn “Thêm chương” để bắt đầu." />
      ) : (
        <div className="space-y-2.5">
          {sortedChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="flex items-center gap-4 rounded-xl border border-ink-600/70 bg-ink-800 px-4 py-3.5"
            >
              <div className="font-mono text-xs text-ash-500 w-6 shrink-0">
                {String(chapter.order).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ash-200 truncate">{chapter.name}</p>
                <p className="text-xs text-ash-500 font-mono mt-0.5">
                  {chapter.lessons.length} bài học · {chapterDurationLabel(chapter)}
                </p>
              </div>
              <Link to={`/admin/${courseId}/${teacherId}/${chapter.id}`}>
                <Button size="sm" variant="secondary">
                  Quản lý bài học →
                </Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={() => startEdit(chapter)} aria-label="Sửa">
                ✎
              </Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(chapter)} aria-label="Xóa">
                🗑
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
