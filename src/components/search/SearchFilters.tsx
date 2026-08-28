import type { Course } from "../../types";
import type { SearchFilters as Filters } from "../../lib/search";

interface SearchFiltersProps {
  courses: Course[];
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const statusOptions: { key: NonNullable<Filters["status"]>; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "not-started", label: "Chưa học" },
  { key: "in-progress", label: "Đang học" },
  { key: "completed", label: "Đã học" },
];

export default function SearchFilters({ courses, filters, onChange }: SearchFiltersProps) {
  const teachers = courses.find((c) => c.id === filters.courseId)?.teachers ?? [];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <select
        value={filters.courseId ?? ""}
        onChange={(e) =>
          onChange({ ...filters, courseId: e.target.value || undefined, teacherId: undefined })
        }
        className="text-xs rounded-full border border-ink-600 bg-ink-800 text-ash-300 px-3 py-1.5 outline-none focus:border-cue/60"
      >
        <option value="">Môn học</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={filters.teacherId ?? ""}
        onChange={(e) => onChange({ ...filters, teacherId: e.target.value || undefined })}
        disabled={!filters.courseId}
        className="text-xs rounded-full border border-ink-600 bg-ink-800 text-ash-300 px-3 py-1.5 outline-none focus:border-cue/60 disabled:opacity-40"
      >
        <option value="">Giáo viên</option>
        {teachers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1.5 ml-auto">
        {statusOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onChange({ ...filters, status: opt.key })}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-200 ${
              (filters.status ?? "all") === opt.key
                ? "bg-cue/10 text-cue border-cue/30"
                : "text-ash-400 border-ink-600 hover:text-ash-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
