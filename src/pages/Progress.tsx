import Breadcrumb from "../components/layout/Breadcrumb";
import ProgressBar from "../components/ui/ProgressBar";
import { getAllCourses, getAllLessonsWithContext } from "../lib/catalog";
import { useProgress } from "../hooks/useUserData";

export default function Progress() {
  const { getProgress } = useProgress();
  const courses = getAllCourses();
  const allLessons = getAllLessonsWithContext();

  const completedCount = allLessons.filter((l) => getProgress(l.id).completed).length;
  const totalCount = allLessons.length;
  const overallPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const bySubject = courses.map((course) => {
    const lessons = allLessons.filter((l) => l.course.id === course.id);
    const done = lessons.filter((l) => getProgress(l.id).completed).length;
    const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
    return { course, done, total: lessons.length, pct };
  });

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Tiến độ" }]} />
      <h1 className="text-2xl font-display font-bold text-ash-200">Tiến độ học tập</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="surface-card p-6">
          <p className="text-3xl font-mono font-bold text-cue">{overallPct}%</p>
          <p className="text-sm text-ash-500 mt-1">Hoàn thành</p>
        </div>
        <div className="surface-card p-6">
          <p className="text-3xl font-mono font-bold text-signal-done">{completedCount}</p>
          <p className="text-sm text-ash-500 mt-1">Bài đã học</p>
        </div>
        <div className="surface-card p-6">
          <p className="text-3xl font-mono font-bold text-ash-300">{totalCount - completedCount}</p>
          <p className="text-sm text-ash-500 mt-1">Bài chưa học</p>
        </div>
      </div>

      <div className="surface-card p-6">
        <h2 className="text-sm font-display font-semibold text-ash-200 mb-5">Theo môn học</h2>
        <div className="space-y-5">
          {bySubject.map(({ course, done, total, pct }) => (
            <div key={course.id}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-ash-300">
                  {course.icon} {course.shortName}
                </span>
                <span className="timecode">
                  {done}/{total} · {pct}%
                </span>
              </div>
              <ProgressBar value={pct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
