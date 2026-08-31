import { useMemo, useState } from "react";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { Input, Select } from "../../components/ui/Field";
import QuestionCard from "../../components/exams/QuestionCard";
import QuestionEditor from "../../components/exams/QuestionEditor";
import BulkQuestionImport from "../../components/exams/BulkQuestionImport";
import AIQuestionGenerator from "../../components/exams/AIQuestionGenerator";
import { useExamData, useExamDataReady } from "../../hooks/useExamData";
import { createQuestion, deleteQuestion, deleteQuestions, updateQuestion } from "../../lib/examStore";
import { useCoursesForExams } from "../../hooks/useUserData";
import { useAuth } from "../../hooks/useAuth";
import type { Question } from "../../types/exam";

type AddMode = "bulk" | "single" | "ai";

export default function QuestionsPage() {
  const ready = useExamDataReady();
  const { questions } = useExamData();
  const courses = useCoursesForExams();
  const { user, isAdmin } = useAuth();

  const [courseFilter, setCourseFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scopeFilter, setScopeFilter] = useState<"all" | "mine">("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Question | null>(null);
  const [creating, setCreating] = useState(false);
  const [addMode, setAddMode] = useState<AddMode>("ai");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Ai cũng thấy được câu hỏi công khai (visibility !== "private"); câu
  // hỏi riêng tư chỉ chủ sở hữu và admin thấy. Dữ liệu cũ chưa có
  // visibility/ownerId được coi như công khai (tương thích ngược).
  const visibleQuestions = useMemo(() => {
    if (isAdmin) return questions;
    return questions.filter((q) => q.visibility !== "private" || q.ownerId === user?.id);
  }, [questions, isAdmin, user?.id]);

  function canManage(q: Question): boolean {
    return isAdmin || q.ownerId === user?.id;
  }

  const filtered = useMemo(() => {
    return visibleQuestions.filter((q) => {
      if (scopeFilter === "mine" && q.ownerId !== user?.id) return false;
      if (courseFilter !== "all" && q.courseId !== courseFilter) return false;
      if (typeFilter !== "all" && q.type !== typeFilter) return false;
      if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false;
      if (statusFilter !== "all" && q.status !== statusFilter) return false;
      if (query && !`${q.question} ${q.topic}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [visibleQuestions, scopeFilter, courseFilter, typeFilter, difficultyFilter, statusFilter, query, user?.id]);

  function toggleSelected(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function exitSelectMode() {
    setSelectMode(false);
    setSelectedIds(new Set());
  }

  function handleDeleteSelected() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Xóa ${selectedIds.size} câu hỏi đã chọn? Không thể hoàn tác.`)) return;
    deleteQuestions(Array.from(selectedIds));
    exitSelectMode();
  }

  function handleDeleteAllFiltered() {
    if (filtered.length === 0) return;
    const label =
      courseFilter === "all" && typeFilter === "all" && difficultyFilter === "all" && statusFilter === "all" && !query
        ? `TOÀN BỘ ${filtered.length} câu hỏi trong ngân hàng`
        : `${filtered.length} câu hỏi đang lọc hiện tại`;
    if (!confirm(`Xóa ${label}? Không thể hoàn tác.`)) return;
    deleteQuestions(filtered.map((q) => q.id));
    exitSelectMode();
  }

  const showForm = creating || editing;

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Kiểm tra", to: "/exams" }, { label: "Ngân hàng câu hỏi" }]} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-display font-bold text-ash-200">Ngân hàng câu hỏi</h1>
        {!showForm && (
          <div className="flex items-center gap-2">
            {selectMode ? (
              <Button variant="ghost" onClick={exitSelectMode}>
                Hủy chọn
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setSelectMode(true)}>
                ☑ Chọn nhiều
              </Button>
            )}
            <Button onClick={() => setCreating(true)}>+ Thêm câu hỏi</Button>
          </div>
        )}
      </div>

      {selectMode && !showForm && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink-600 bg-ink-800/60 px-4 py-3">
          <p className="text-sm text-ash-300">
            Đã chọn <strong className="text-ash-200">{selectedIds.size}</strong> / {filtered.length} câu
            {" · "}
            <button
              type="button"
              className="text-cue hover:underline"
              onClick={() =>
                setSelectedIds(
                  selectedIds.size === filtered.length ? new Set() : new Set(filtered.map((q) => q.id))
                )
              }
            >
              {selectedIds.size === filtered.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
            </button>
          </p>
          <div className="flex items-center gap-2">
            <Button variant="danger" size="sm" disabled={selectedIds.size === 0} onClick={handleDeleteSelected}>
              🗑 Xóa đã chọn ({selectedIds.size})
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteAllFiltered}>
              🗑 Xóa tất cả đang lọc ({filtered.length})
            </Button>
          </div>
        </div>
      )}

      {showForm ? (
        <div className="space-y-4">
          {creating && !editing && (
            <div className="flex items-center gap-1 rounded-lg bg-ink-800 border border-ink-600 p-1 w-fit">
              <button
                type="button"
                onClick={() => setAddMode("ai")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  addMode === "ai" ? "bg-cue text-ink-950" : "text-ash-400 hover:text-ash-200"
                }`}
              >
                🧠 Tạo bằng AI
              </button>
              <button
                type="button"
                onClick={() => setAddMode("bulk")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  addMode === "bulk" ? "bg-cue text-ink-950" : "text-ash-400 hover:text-ash-200"
                }`}
              >
                Thêm nhanh nhiều câu
              </button>
              <button
                type="button"
                onClick={() => setAddMode("single")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  addMode === "single" ? "bg-cue text-ink-950" : "text-ash-400 hover:text-ash-200"
                }`}
              >
                Thêm 1 câu (mọi loại)
              </button>
            </div>
          )}

          {creating && !editing && addMode === "ai" ? (
            <AIQuestionGenerator courses={courses} currentUserId={user?.id} onDone={() => setCreating(false)} />
          ) : creating && !editing && addMode === "bulk" ? (
            <BulkQuestionImport courses={courses} onDone={() => setCreating(false)} />
          ) : (
            <QuestionEditor
              courses={courses}
              initial={editing ?? undefined}
              currentUserId={user?.id}
              onCancel={() => {
                setEditing(null);
                setCreating(false);
              }}
              onSave={(input) => {
                if (editing) updateQuestion(editing.id, input);
                else createQuestion(input);
                setEditing(null);
                setCreating(false);
              }}
            />
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Tìm câu hỏi..."
              className="sm:col-span-1"
            />
            <Select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
              <option value="all">Tất cả môn</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">Tất cả loại câu</option>
              <option value="multiple_choice">Trắc nghiệm</option>
              <option value="true_false">Đúng / Sai</option>
              <option value="short_answer">Trả lời ngắn</option>
            </Select>
            <Select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
              <option value="all">Tất cả độ khó</option>
              <option value="easy">Dễ</option>
              <option value="medium">Trung bình</option>
              <option value="hard">Khó</option>
            </Select>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="draft">Chưa duyệt (draft)</option>
              <option value="reviewed">Đã xem (reviewed)</option>
              <option value="published">Đã publish</option>
            </Select>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-ink-800 border border-ink-600 p-1 w-fit">
            <button
              type="button"
              onClick={() => setScopeFilter("all")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                scopeFilter === "all" ? "bg-cue text-ink-950" : "text-ash-400 hover:text-ash-200"
              }`}
            >
              Tất cả (công khai)
            </button>
            <button
              type="button"
              onClick={() => setScopeFilter("mine")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                scopeFilter === "mine" ? "bg-cue text-ink-950" : "text-ash-400 hover:text-ash-200"
              }`}
            >
              Của tôi
            </button>
          </div>

          {!ready ? (
            <p className="text-sm text-ash-500">Đang tải...</p>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="🧠"
              title="Ngân hàng câu hỏi đang trống"
              description="Thêm câu hỏi thủ công, hoặc dùng AI tạo từ tài liệu."
              action={<Button onClick={() => setCreating(true)}>+ Thêm câu hỏi</Button>}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  onEdit={canManage(q) ? () => setEditing(q) : undefined}
                  onDelete={
                    canManage(q)
                      ? () => {
                          if (confirm("Xóa câu hỏi này?")) deleteQuestion(q.id);
                        }
                      : undefined
                  }
                  onApprove={
                    isAdmin && q.status !== "published"
                      ? () => updateQuestion(q.id, { status: "published" })
                      : undefined
                  }
                  isOwner={q.ownerId === user?.id}
                  selectable={selectMode}
                  selected={selectedIds.has(q.id)}
                  onToggleSelected={() => toggleSelected(q.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
