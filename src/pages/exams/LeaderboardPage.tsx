import { useMemo, useState } from "react";
import Breadcrumb from "../../components/layout/Breadcrumb";
import EmptyState from "../../components/ui/EmptyState";
import { Select } from "../../components/ui/Field";
import LeaderboardTable from "../../components/exams/LeaderboardTable";
import { useExamData, useExamDataReady } from "../../hooks/useExamData";
import { useCourses } from "../../hooks/useUserData";

export default function LeaderboardPage() {
  const ready = useExamDataReady();
  const { exams, attempts } = useExamData();
  const courses = useCourses();

  const [courseFilter, setCourseFilter] = useState("all");
  const [examFilter, setExamFilter] = useState("all");

  const examsForCourse = exams.filter((e) => courseFilter === "all" || e.courseId === courseFilter);

  const filteredAttempts = useMemo(() => {
    return attempts.filter((a) => {
      const exam = exams.find((e) => e.id === a.examId);
      if (!exam) return false;
      if (courseFilter !== "all" && exam.courseId !== courseFilter) return false;
      if (examFilter !== "all" && exam.id !== examFilter) return false;
      return true;
    });
  }, [attempts, exams, courseFilter, examFilter]);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Kiểm tra", to: "/exams" }, { label: "Xếp hạng" }]} />
      <h1 className="text-xl font-display font-bold text-ash-200">🏆 Xếp hạng</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
        <Select
          value={courseFilter}
          onChange={(e) => {
            setCourseFilter(e.target.value);
            setExamFilter("all");
          }}
        >
          <option value="all">Tất cả môn học</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select value={examFilter} onChange={(e) => setExamFilter(e.target.value)}>
          <option value="all">Tất cả đề</option>
          {examsForCourse.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </Select>
      </div>

      {!ready ? (
        <p className="text-sm text-ash-500">Đang tải...</p>
      ) : filteredAttempts.length === 0 ? (
        <EmptyState
          icon="🏆"
          title="Chưa có kết quả"
          description="Hãy hoàn thành một bài kiểm tra để xuất hiện trên bảng xếp hạng."
        />
      ) : (
        <LeaderboardTable attempts={filteredAttempts} />
      )}
    </div>
  );
}
