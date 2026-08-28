import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { FieldGroup, Input, Textarea } from "../../components/ui/Field";
import { useCourses } from "../../hooks/useUserData";
import { countTeacherLessons } from "../../lib/catalog";
import { createTeacher, deleteTeacher, updateTeacher } from "../../lib/contentStore";
import type { Teacher } from "../../types";

interface TeacherForm {
  name: string;
  avatar: string;
  title: string;
  description: string;
}

const emptyForm: TeacherForm = { name: "", avatar: "👨‍🏫", title: "", description: "" };

export default function AdminTeachers() {
  const { courseId = "" } = useParams();
  const courses = useCourses();
  const course = courses.find((c) => c.id === courseId);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<TeacherForm>(emptyForm);

  if (!course) return <Navigate to="/admin" replace />;

  function startCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setCreating(true);
  }

  function startEdit(teacher: Teacher) {
    setForm({
      name: teacher.name,
      avatar: teacher.avatar,
      title: teacher.title,
      description: teacher.description,
    });
    setEditingId(teacher.id);
    setCreating(false);
  }

  function closePanel() {
    setCreating(false);
    setEditingId(null);
  }

  function handleSubmit() {
    if (!form.name.trim()) return;
    if (editingId) {
      updateTeacher(courseId, editingId, form);
    } else {
      createTeacher(courseId, form);
    }
    closePanel();
  }

  function handleDelete(teacher: Teacher) {
    const ok = window.confirm(
      `Xóa giáo viên "${teacher.name}"? Toàn bộ chương và bài học bên trong cũng sẽ bị xóa.`
    );
    if (ok) deleteTeacher(courseId, teacher.id);
  }

  const panelOpen = creating || editingId !== null;

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Cài đặt", to: "/admin" },
          { label: course.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ash-200">{course.name}</h1>
          <p className="text-sm text-ash-400 mt-1">Quản lý giáo viên của môn học này.</p>
        </div>
        <Button size="sm" icon="+" onClick={startCreate}>
          Thêm giáo viên
        </Button>
      </div>

      {panelOpen && (
        <div className="surface-card p-5 space-y-4 animate-fadeUp">
          <h2 className="text-sm font-display font-semibold text-ash-200">
            {editingId ? "Sửa giáo viên" : "Thêm giáo viên mới"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Tên giáo viên *">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Thầy Nguyễn Văn A"
              />
            </FieldGroup>
            <FieldGroup label="Avatar (emoji)">
              <Input
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                placeholder="👨‍🏫"
              />
            </FieldGroup>
            <FieldGroup label="Chức danh">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Giáo viên Toán"
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Mô tả">
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Kinh nghiệm giảng dạy, phong cách sư phạm..."
            />
          </FieldGroup>
          <div className="flex gap-2.5">
            <Button size="sm" onClick={handleSubmit}>
              {editingId ? "Lưu thay đổi" : "Thêm giáo viên"}
            </Button>
            <Button size="sm" variant="secondary" onClick={closePanel}>
              Hủy
            </Button>
          </div>
        </div>
      )}

      {course.teachers.length === 0 ? (
        <EmptyState icon="👨‍🏫" title="Chưa có giáo viên" description="Nhấn “Thêm giáo viên” để bắt đầu." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {course.teachers.map((teacher) => (
            <div key={teacher.id} className="surface-card p-5 flex flex-col">
              <div className="h-11 w-11 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center text-xl shrink-0">
                {teacher.avatar}
              </div>
              <h3 className="font-display font-semibold text-ash-200 mt-3">{teacher.name}</h3>
              <p className="text-xs text-ash-500 mt-0.5">{teacher.title}</p>
              <p className="text-sm text-ash-400 mt-2 line-clamp-2 flex-1">{teacher.description}</p>
              <p className="text-xs text-ash-500 font-mono mt-3">
                {teacher.chapters.length} chương · {countTeacherLessons(teacher)} bài
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Link to={`/admin/${courseId}/${teacher.id}`} className="flex-1">
                  <Button size="sm" variant="secondary" className="w-full">
                    Quản lý chương →
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={() => startEdit(teacher)} aria-label="Sửa">
                  ✎
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(teacher)}
                  aria-label="Xóa"
                >
                  🗑
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
