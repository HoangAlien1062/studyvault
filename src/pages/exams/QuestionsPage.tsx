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
import { createQuestion, deleteQuestion, updateQuestion } from "../../lib/examStore";
import { useCourses } from "../../hooks/useUserData";
import type { Question } from "../../types/exam";

type AddMode = "bulk" | "single" | "ai";

export default function QuestionsPage() {
  const ready = useExamDataReady();
  const { questions } = useExamData();
  const courses = useCourses();

  const [courseFilter, setCourseFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Question | null>(null);
  const [creating, setCreating] = useState(false);
  const [addMode, setAddMode] = useState<AddMode>("ai");

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (courseFilter !== "all" && q.courseId !== courseFilter) return false;
      if (typeFilter !== "all" && q.type !== typeFilter) return false;
      if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false;
      if (statusFilter !== "all" && q.status !== statusFilter) return false;
      if (query && !`${q.question} ${q.topic}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [questions, courseFilter, typeFilter, difficultyFilter, statusFilter, query]);

  const showForm = creating || editing;

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Kiểm tra", to: "/exams" }, { label: "Ngân hàng câu hỏi" }]} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-display font-bold text-ash-200">Ngân hàng câu hỏi</h1>
        {!showForm && <Button onClick={() => setCreating(true)}>+ Thêm câu hỏi</Button>}
      </div>

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
            <AIQuestionGenerator courses={courses} onDone={() => setCreating(false)} />
          ) : creating && !editing && addMode === "bulk" ? (
            <BulkQuestionImport courses={courses} onDone={() => setCreating(false)} />
          ) : (
            <QuestionEditor
              courses={courses}
              initial={editing ?? undefined}
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

          {!ready ? (
            <p className="text-sm text-ash-500">Đang tải...</p>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="🧠"
              title="Ngân hàng câu hỏi đang trống"
              description="Thêm câu hỏi thủ công, hoặc dùng AI tạo từ tài liệu (sắp ra mắt)."
              action={<Button onClick={() => setCreating(true)}>+ Thêm câu hỏi</Button>}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  onEdit={() => setEditing(q)}
                  onDelete={() => {
                    if (confirm("Xóa câu hỏi này?")) deleteQuestion(q.id);
                  }}
                  onApprove={() => updateQuestion(q.id, { status: "published" })}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
