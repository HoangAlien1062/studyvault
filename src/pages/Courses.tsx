import Breadcrumb from "../components/layout/Breadcrumb";
import CourseGrid from "../components/courses/CourseGrid";
import { getAllCourses } from "../lib/catalog";

export default function Courses() {
  const courses = getAllCourses();

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Môn học" }]} />
      <div>
        <h1 className="text-2xl font-display font-bold text-ash-200">Môn học</h1>
        <p className="text-sm text-ash-400 mt-1">
          {courses.length} môn học đang có sẵn trong thư viện.
        </p>
      </div>
      <CourseGrid courses={courses} />
    </div>
  );
}
