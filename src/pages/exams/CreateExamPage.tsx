import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import { FieldGroup, Input, Select } from "../../components/ui/Field";
import { useExamData } from "../../hooks/useExamData";
import { createExam, deleteExam, updateExam } from "../../lib/examStore";
import { useCoursesForExams } from "../../hooks/useUserData";
import { useAuth } from "../../hooks/useAuth";
import { getCourse, OTHER_COURSE_ID } from "../../lib/catalog";
import { DIFFICULTY_LABEL, QUESTION_TYPE_LABEL, type Question, type QuestionType } from "../../types/exam";

const EXAM_TYPES: QuestionType[] = ["multiple_choice", "true_false", "short_answer"];

type FormCounts = Record<QuestionType, number>;

const emptyFormCounts: FormCounts = { multiple_choice: 0, true_false: 0, short_answer: 0 };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function CreateExamPage() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const courses = useCoursesForExams();
  const { user, isAdmin } = useAuth();
  const { questions, exams } = useExamData();
  const editingExam = examId ? exams.find((e) => e.id === examId) : undefined;
  const isEditMode = Boolean(examId);

  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("all");
  const [types, setTypes] = useState<QuestionType[]>(["multiple_choice", "true_false", "short_answer"]);
  const [difficulty, setDifficulty] = useState("all");
  const [timeLimit, setTimeLimit] = useState(30);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formCounts, setFormCounts] = useState<FormCounts>(emptyFormCounts);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Nạp dữ liệu đề cũ vào form khi vào chế độ sửa (/exams/edit/:examId).
  useEffect(() => {
    if (!editingExam) return;
    setCourseId(editingExam.courseId);
    setTitle(editingExam.title);
    setTopic(editingExam.topic ?? "all");
    setTimeLimit(editingExam.timeLimitMinutes ?? 0);
    setShuffleQuestions(editingExam.shuffleQuestions);
    setShuffleAnswers(editingExam.shuffleAnswers);
    setVisibility(editingExam.visibility ?? "public");
    setSelectedIds(editingExam.questionIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingExam?.id]);

  const topics = useMemo(
    () =>
      Array.from(
        new Set(
          questions
            .filter((q) => (courseId === OTHER_COURSE_ID ? true : q.courseId === courseId))
            .map((q) => q.topic)
        )
      ),
    [questions, courseId]
  );

  // Pool theo môn/chủ đề/độ khó, KHÔNG lọc theo "Loại câu hỏi" phía dưới —
  // dùng riêng cho tính năng "Random theo cấu trúc đề" để biết còn bao
  // nhiêu câu mỗi loại có thể random, bất kể ô loại câu hỏi đang bật/tắt.
  // Chọn môn "Khác" = trộn câu hỏi từ MỌI môn (đề nhiều môn).
  const poolByType = useMemo(() => {
    const map: Record<QuestionType, Question[]> = { multiple_choice: [], true_false: [], short_answer: [] };
    questions.forEach((q) => {
      if (q.status !== "published") return;
      if (courseId !== OTHER_COURSE_ID && q.courseId !== courseId) return;
      if (topic !== "all" && q.topic !== topic) return;
      if (difficulty !== "all" && q.difficulty !== difficulty) return;
      map[q.type].push(q);
    });
    return map;
  }, [questions, courseId, topic, difficulty]);

  const formTotal = EXAM_TYPES.reduce((sum, t) => sum + (formCounts[t] || 0), 0);

  function randomizeByForm() {
    const errors: string[] = [];
    const picked: string[] = [];
    EXAM_TYPES.forEach((t) => {
      const need = formCounts[t] || 0;
      if (need <= 0) return;
      const pool = poolByType[t];
      if (pool.length < need) {
        errors.push(
          `${QUESTION_TYPE_LABEL[t]}: cần ${need} câu nhưng ngân hàng chỉ có ${pool.length} câu phù hợp (theo môn/chủ đề/độ khó đã chọn)`
        );
        return;
      }
      picked.push(...shuffle(pool).slice(0, need).map((q) => q.id));
    });
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);
    setSelectedIds(picked);
  }

  const eligible = useMemo(() => {
    return questions.filter((q) => {
      // Chỉ câu đã "published" mới được đưa vào đề chính thức (mục 55 —
      // câu AI tạo (draft) phải được duyệt ở Ngân hàng câu hỏi trước).
      if (q.status !== "published") return false;
      // Chỉ dùng được câu công khai, hoặc câu riêng tư của chính mình.
      if (q.visibility === "private" && q.ownerId !== user?.id && !isAdmin) return false;
      if (courseId !== OTHER_COURSE_ID && q.courseId !== courseId) return false;
      if (topic !== "all" && q.topic !== topic) return false;
      if (!types.includes(q.type)) return false;
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;
      return true;
    });
  }, [questions, courseId, topic, types, difficulty, user?.id, isAdmin]);

  function toggleType(t: QuestionType) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function toggleSelected(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function selectAllEligible() {
    setSelectedIds(eligible.map((q) => q.id));
  }

  const canCreate = title.trim() && selectedIds.length > 0;

  function handleCreate() {
    if (!canCreate) return;
    // Nếu câu hỏi được chọn thuộc nhiều môn khác nhau (trường hợp chọn
    // môn "Khác" rồi tự chọn tay từ nhiều môn), tự động xếp đề vào "Khác".
    const distinctCourseIds = new Set(
      selectedIds.map((id) => questions.find((q) => q.id === id)?.courseId).filter(Boolean)
    );
    const finalCourseId = distinctCourseIds.size > 1 ? OTHER_COURSE_ID : courseId;

    const payload = {
      courseId: finalCourseId,
      title: title.trim(),
      topic: topic !== "all" ? topic : undefined,
      questionIds: selectedIds,
      timeLimitMinutes: timeLimit > 0 ? timeLimit : null,
      shuffleQuestions,
      shuffleAnswers,
      visibility,
      ownerId: editingExam?.ownerId ?? user?.id,
    };
    if (isEditMode && examId) {
      updateExam(examId, payload);
      navigate(`/exams/${examId}`);
    } else {
      const exam = createExam(payload);
      navigate(`/exams/${exam.id}`);
    }
  }

  function handleDeleteExam(id: string, examTitle: string) {
    if (!confirm(`Xóa đề "${examTitle}"? Không thể hoàn tác (không ảnh hưởng câu hỏi trong ngân hàng).`)) return;
    deleteExam(id);
    if (id === examId) navigate("/exams/create");
  }

  function canManageExam(exam: (typeof exams)[number]): boolean {
    return isAdmin || exam.ownerId === user?.id;
  }

  const visibleExams = isAdmin
    ? exams
    : exams.filter((e) => e.visibility !== "private" || e.ownerId === user?.id);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Kiểm tra", to: "/exams" },
          { label: isEditMode ? "Sửa đề kiểm tra" : "Tạo đề kiểm tra" },
        ]}
      />
      <h1 className="text-xl font-display font-bold text-ash-200">
        {isEditMode ? `Sửa đề: ${editingExam?.title ?? ""}` : "Tạo bài kiểm tra"}
      </h1>

      <Card className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldGroup label="Tên đề">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Vd: Kiểm tra chương Hàm số" />
          </FieldGroup>
          <FieldGroup label="Môn học">
            <Select
              value={courseId}
              onChange={(e) => {
                setCourseId(e.target.value);
                setTopic("all");
                setSelectedIds([]);
                setFormErrors([]);
              }}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FieldGroup>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FieldGroup label="Chủ đề">
            <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="all">Tất cả chủ đề</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </FieldGroup>
          <FieldGroup label="Độ khó">
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="all">Hỗn hợp</option>
              <option value="easy">Dễ</option>
              <option value="medium">Trung bình</option>
              <option value="hard">Khó</option>
            </Select>
          </FieldGroup>
          <FieldGroup label="Thời gian (phút, 0 = không giới hạn)">
            <Input
              type="number"
              min={0}
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
          </FieldGroup>
        </div>

        <div>
          <p className="text-xs font-medium text-ash-400 mb-1.5">Loại câu hỏi</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(QUESTION_TYPE_LABEL) as QuestionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  types.includes(t)
                    ? "bg-cue/10 text-cue border-cue/40"
                    : "border-ink-600 text-ash-500 hover:text-ash-300"
                }`}
              >
                {QUESTION_TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-ash-300">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={shuffleQuestions} onChange={(e) => setShuffleQuestions(e.target.checked)} />
            Trộn câu hỏi
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={shuffleAnswers} onChange={(e) => setShuffleAnswers(e.target.checked)} />
            Trộn đáp án
          </label>
        </div>

        <FieldGroup label="Quyền xem đề">
          <Select value={visibility} onChange={(e) => setVisibility(e.target.value as "public" | "private")}>
            <option value="public">🌍 Công khai — mọi người đăng nhập đều làm được</option>
            <option value="private">🔒 Riêng tư — chỉ mình bạn làm được</option>
          </Select>
        </FieldGroup>
      </Card>

      <Card className="space-y-4">
        <div>
          <h2 className="text-sm font-display font-semibold text-ash-200">
            🎲 Random theo cấu trúc đề (tùy chọn)
          </h2>
          <p className="text-xs text-ash-500 mt-1">
            Chọn số câu mỗi loại (vd: 16 Trắc nghiệm, 4 Đúng/Sai, 6 Trả lời ngắn), hệ thống sẽ tự
            random đúng số lượng đó từ ngân hàng (theo môn/chủ đề/độ khó đã chọn ở trên). Bấm lại
            để random ra bộ câu khác.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXAM_TYPES.map((t) => (
            <FieldGroup key={t} label={`${QUESTION_TYPE_LABEL[t]} (còn ${poolByType[t].length} câu)`}>
              <Input
                type="number"
                min={0}
                max={poolByType[t].length}
                value={formCounts[t]}
                onChange={(e) =>
                  setFormCounts((prev) => ({ ...prev, [t]: Math.max(0, Number(e.target.value)) }))
                }
              />
            </FieldGroup>
          ))}
        </div>
        {formErrors.length > 0 && (
          <ul className="text-xs text-signal-live space-y-1">
            {formErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={randomizeByForm} disabled={formTotal === 0}>
            🎲 {selectedIds.length > 0 && formTotal > 0 ? "Random lại" : "Random chọn câu"}
          </Button>
          {formTotal > 0 && <p className="text-xs text-ash-500">Tổng {formTotal} câu theo cấu trúc</p>}
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-ash-200">
            Chọn câu hỏi ({selectedIds.length}/{eligible.length} đã chọn)
          </h2>
          {eligible.length > 0 && (
            <Button variant="secondary" size="sm" onClick={selectAllEligible}>
              Chọn tất cả
            </Button>
          )}
        </div>

        {eligible.length === 0 ? (
          <EmptyState
            icon="📚"
            title="Không có câu hỏi phù hợp"
            description="Hãy thêm câu hỏi vào ngân hàng trước, hoặc nới lỏng bộ lọc."
            action={<Button onClick={() => navigate("/exams/questions")}>Đến ngân hàng câu hỏi</Button>}
          />
        ) : (
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {eligible.map((q) => (
              <label
                key={q.id}
                className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                  selectedIds.includes(q.id) ? "border-cue/50 bg-cue/5" : "border-ink-600 hover:border-ink-500"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={selectedIds.includes(q.id)}
                  onChange={() => toggleSelected(q.id)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    <Badge tone="cue">{QUESTION_TYPE_LABEL[q.type]}</Badge>
                    <Badge>{DIFFICULTY_LABEL[q.difficulty]}</Badge>
                  </div>
                  <p className="text-sm text-ash-300 truncate">{q.question}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <Button size="md" onClick={handleCreate} disabled={!canCreate}>
        {isEditMode ? `💾 Lưu thay đổi (${selectedIds.length} câu)` : `Tạo đề (${selectedIds.length} câu)`}
      </Button>

      {!isEditMode && (
        <section className="pt-4 border-t border-ink-700">
          <h2 className="text-sm font-display font-semibold text-ash-200 mb-3">
            📋 {isAdmin ? "Đề đã tạo (tất cả)" : "Đề của tôi"} ({visibleExams.length})
          </h2>
          {visibleExams.length === 0 ? (
            <p className="text-sm text-ash-500">Chưa có đề nào.</p>
          ) : (
            <div className="space-y-2">
              {visibleExams
                .slice()
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((exam) => {
                  const course = getCourse(exam.courseId);
                  const manageable = canManageExam(exam);
                  return (
                    <div
                      key={exam.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink-600 bg-ink-800/40 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge>{course?.shortName ?? "?"}</Badge>
                          {exam.topic && <Badge tone="cue">{exam.topic}</Badge>}
                          {exam.visibility === "private" && <Badge>🔒 Riêng tư</Badge>}
                          {exam.ownerId === user?.id && <Badge tone="cue">Của bạn</Badge>}
                        </div>
                        <p className="text-sm text-ash-200 font-medium truncate">{exam.title}</p>
                        <p className="text-xs text-ash-500">
                          {exam.questionIds.length} câu
                          {exam.timeLimitMinutes ? ` · ${exam.timeLimitMinutes} phút` : " · không giới hạn"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {manageable ? (
                          <>
                            <Button variant="secondary" size="sm" onClick={() => navigate(`/exams/edit/${exam.id}`)}>
                              Sửa
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteExam(exam.id, exam.title)}>
                              Xóa
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" onClick={() => navigate(`/exams/${exam.id}`)}>
                            Làm bài
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
