import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import TeacherCourse from "./pages/TeacherCourse";
import ChapterLessons from "./pages/ChapterLessons";
import LessonPlayer from "./pages/LessonPlayer";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Progress from "./pages/Progress";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminChapters from "./pages/admin/AdminChapters";
import AdminLessons from "./pages/admin/AdminLessons";
import NotFound from "./pages/NotFound";
import { useContentReady } from "./hooks/useUserData";
import { siteConfig } from "./config/site";

function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 bg-ink-950">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cue text-ink-950 text-base font-bold animate-pulse">
        {siteConfig.logoGlyph}
      </div>
      <p className="text-sm text-ash-400">Đang tải dữ liệu...</p>
    </div>
  );
}

export default function App() {
  const contentReady = useContentReady();

  if (!contentReady) return <LoadingScreen />;

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/courses/:courseId/teachers" element={<CourseDetail />} />
        <Route path="/courses/:courseId/teachers/:teacherId" element={<TeacherCourse />} />
        <Route
          path="/courses/:courseId/teachers/:teacherId/chapters/:chapterId"
          element={<ChapterLessons />}
        />
        <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/admin" element={<AdminCourses />} />
        <Route path="/admin/:courseId" element={<AdminTeachers />} />
        <Route path="/admin/:courseId/:teacherId" element={<AdminChapters />} />
        <Route path="/admin/:courseId/:teacherId/:chapterId" element={<AdminLessons />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
