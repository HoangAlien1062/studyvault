import type { Course } from "../../types";
import CourseCard from "./CourseCard";
import EmptyState from "../ui/EmptyState";

export default function CourseGrid({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <EmptyState
        icon="📚"
        title="Chưa có môn học"
        description='Thêm môn học mới trong /src/data/courses.ts để môn học tự động xuất hiện ở đây.'
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
