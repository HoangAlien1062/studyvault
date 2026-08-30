import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import { FieldGroup, Input, Textarea } from "../../components/ui/Field";
import { useCourses } from "../../hooks/useUserData";
import { signOut } from "../../lib/auth";
import { countCourseChapters, countCourseLessons } from "../../lib/catalog";
import { createCourse, deleteCourse, resetToDefaultContent, updateCourse } from "../../lib/contentStore";
import type { Course } from "../../types";

interface CourseForm {
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
}

const emptyForm: CourseForm = {
  name: "",
  shortName: "",
  description: "",
  icon: "📘",
  color: "#F2B84B",
};

export default function AdminCourses() {
  const courses = useCourses();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CourseForm>(emptyForm);

  function startCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setCreating(true);
  }

  function startEdit(course: Course) {
    setForm({
      name: course.name,
      shortName: course.shortName,
      description: course.description,
      icon: course.icon,
      color: course.color,
    });
    setEditingId(course.id);
    setCreating(false);
  }

  function closePanel() {
    setCreating(false);
    setEditingId(null);
  }

  function handleSubmit() {
    if (!form.name.trim()) return;
    if (editingId) {
      updateCourse(editingId, form);
    } else {
      createCourse(form);
    }
    closePanel();
  }

  function handleDelete(course: Course) {
    const ok = window.confirm(
      `Xóa môn "${course.name}"? Toàn bộ giáo viên, chương và bài học bên trong cũng sẽ bị xóa.`
    );
    if (ok) deleteCourse(course.id);
  }

  const panelOpen = creating || editingId !== null;

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Cài đặt" }]} />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ash-200">Quản lý dữ liệu</h1>
          <p className="text-sm text-ash-400 mt-1 max-w-xl">
            Thêm, sửa, xóa môn học ngay trên web. Chọn một môn để quản lý giáo viên, chương và bài
            học bên trong.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (
                window.confirm(
                  "Khôi phục toàn bộ dữ liệu về mặc định? Mọi chỉnh sửa (trên mọi thiết bị) sẽ mất."
                )
              )
                resetToDefaultContent();
            }}
          >
            Khôi phục mặc định
          </Button>
          <Button size="sm" icon="+" onClick={startCreate}>
            Thêm môn học
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              signOut();
              navigate("/");
            }}
            title="Đăng xuất"
          >
            🔒 Đăng xuất
          </Button>
        </div>
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-ash-200">📝 Quản lý Kiểm tra</h2>
          <p className="text-sm text-ash-400 mt-1 max-w-md">
            Ngân hàng câu hỏi và tạo đề — chỉ admin mới thấy phần này, người dùng thường chỉ thấy
            trang Làm bài / Xếp hạng.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link to="/exams/questions">
            <Button size="sm" variant="secondary">
              Ngân hàng câu hỏi →
            </Button>
          </Link>
          <Link to="/exams/create">
            <Button size="sm">+ Tạo đề</Button>
          </Link>
        </div>
      </Card>

      {panelOpen && (
        <div className="surface-card p-5 space-y-4 animate-fadeUp">
          <h2 className="text-sm font-display font-semibold text-ash-200">
            {editingId ? "Sửa môn học" : "Thêm môn học mới"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Tên môn học *">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Toán 12"
              />
            </FieldGroup>
            <FieldGroup label="Tên ngắn">
              <Input
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                placeholder="Toán"
              />
            </FieldGroup>
            <FieldGroup label="Icon (emoji)">
              <Input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="📐"
              />
            </FieldGroup>
            <FieldGroup label="Màu accent (hex)">
              <Input
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                placeholder="#F2B84B"
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Mô tả">
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Đại số, giải tích và hình học không gian lớp 12."
            />
          </FieldGroup>
          <div className="flex gap-2.5">
            <Button size="sm" onClick={handleSubmit}>
              {editingId ? "Lưu thay đổi" : "Thêm môn học"}
            </Button>
            <Button size="sm" variant="secondary" onClick={closePanel}>
              Hủy
            </Button>
          </div>
        </div>
      )}

      {courses.length === 0 ? (
        <EmptyState icon="📚" title="Chưa có môn học nào" description="Nhấn “Thêm môn học” để bắt đầu." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div key={course.id} className="surface-card p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: `${course.color}22`, color: course.color }}
                >
                  {course.icon}
                </div>
              </div>
              <h3 className="font-display font-semibold text-ash-200 mt-3">{course.name}</h3>
              <p className="text-sm text-ash-400 mt-1 line-clamp-2 flex-1">{course.description}</p>
              <p className="text-xs text-ash-500 font-mono mt-3">
                {course.teachers.length} giáo viên · {countCourseChapters(course)} chương ·{" "}
                {countCourseLessons(course)} bài
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Link to={`/admin/${course.id}`} className="flex-1">
                  <Button size="sm" variant="secondary" className="w-full">
                    Quản lý giáo viên →
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={() => startEdit(course)} aria-label="Sửa">
                  ✎
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(course)}
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
