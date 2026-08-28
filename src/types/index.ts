// ============================================================
// DATA MODEL
// Toàn bộ cấu trúc dữ liệu của StudyVault đều dựa trên các type
// này. Xem /src/data/courses.ts để biết nơi nhập dữ liệu thật.
// ============================================================

export interface LessonVideo {
  id: string;
  title: string; // ví dụ "Video 1", "Phần 2 — Bài tập"
  embedUrl: string;
}

export interface LessonMaterial {
  id: string;
  name: string; // tên tài liệu hiển thị, ví dụ "Tài liệu ôn tập.pdf"
  url: string; // link xem/tải tài liệu
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string; // format "mm:ss" hoặc "hh:mm:ss"
  thumbnail: string; // emoji hoặc URL ảnh
  order: number;

  // --- Video hiển thị bằng <iframe> ---
  // Một bài học có thể có NHIỀU video (videos[]). Đây là nguồn ưu tiên
  // mà VideoPlayer sử dụng để render các tab video + iframe.
  videos?: LessonVideo[];

  // Tài liệu đính kèm (PDF, slide, link Drive...) hiển thị bên dưới video.
  materials?: LessonMaterial[];

  // --- Trường cũ (tương thích ngược) ---
  // Nếu `videos` trống nhưng `embedUrl` có giá trị, hệ thống sẽ tự coi
  // đó là "Video 1" duy nhất của bài học.
  embedUrl: string | null;

  // Giữ lại cho các mục đích khác trong tương lai (không dùng để phát video).
  videoUrl: string | null;

  // Dự phòng cho Google Drive — CHƯA sử dụng ở giai đoạn này.
  // Không tự động chuyển field này thành URL hay gọi Google Drive API.
  googleDriveFileId: string | null;
}

export interface Chapter {
  id: string;
  name: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string; // emoji hoặc URL ảnh
  title: string; // ví dụ "Giáo viên Toán 12"
  description: string;
  chapters: Chapter[];
}

export interface Course {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // emoji
  color: string; // tailwind-friendly hex, dùng làm accent nhỏ cho subject
  teachers: Teacher[];
}

// ---- Các type dẫn xuất, dùng để hiển thị (không lưu trực tiếp) ----

export interface LessonWithContext extends Lesson {
  course: Course;
  teacher: Teacher;
  chapter: Chapter;
}

export interface ProgressEntry {
  lessonId: string;
  progress: number; // 0 - 100
  completed: boolean;
  lastWatchedAt: number; // epoch ms
}
