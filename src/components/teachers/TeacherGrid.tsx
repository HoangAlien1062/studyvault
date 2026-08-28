import { useMemo, useState } from "react";
import type { Course, Teacher } from "../../types";
import TeacherCard from "./TeacherCard";
import EmptyState from "../ui/EmptyState";
import { countTeacherLessons } from "../../lib/catalog";

type SortKey = "az" | "lessons";

export default function TeacherGrid({ course, teachers }: { course: Course; teachers: Teacher[] }) {
  const [sort, setSort] = useState<SortKey>("az");

  const sorted = useMemo(() => {
    const copy = [...teachers];
    if (sort === "az") return copy.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    return copy.sort((a, b) => countTeacherLessons(b) - countTeacherLessons(a));
  }, [teachers, sort]);

  if (teachers.length === 0) {
    return (
      <EmptyState
        icon="👨‍🏫"
        title="Chưa có giáo viên"
        description="Thêm giáo viên vào mảng teachers của môn học này trong /src/data/courses.ts."
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2 mb-5">
        <span className="text-xs text-ash-500 mr-1">Sắp xếp:</span>
        {(
          [
            { key: "az", label: "A-Z" },
            { key: "lessons", label: "Số bài học" },
          ] as { key: SortKey; label: string }[]
        ).map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-200 ${
              sort === opt.key
                ? "bg-cue/10 text-cue border-cue/30"
                : "text-ash-400 border-ink-600 hover:text-ash-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((teacher) => (
          <TeacherCard key={teacher.id} course={course} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}
