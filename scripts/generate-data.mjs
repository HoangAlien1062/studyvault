// Script nội bộ: chạy MỘT LẦN để sinh dữ liệu mock ban đầu cho
// /src/data/courses.ts. Sau khi đã có file courses.ts, bạn KHÔNG
// cần chạy lại script này nữa — chỉ cần sửa trực tiếp courses.ts.

const subjects = [
  { id: "math", name: "Toán 12", shortName: "Toán", icon: "📐", color: "#F2B84B", desc: "Đại số, giải tích và hình học không gian lớp 12." },
  { id: "literature", name: "Văn 12", shortName: "Văn", icon: "📖", color: "#E8734A", desc: "Văn học Việt Nam và thế giới trong chương trình lớp 12." },
  { id: "english", name: "Anh 12", shortName: "Anh", icon: "🌐", color: "#5FA8D0", desc: "Ngữ pháp, từ vựng và luyện thi chứng chỉ quốc tế." },
  { id: "physics", name: "Vật lý 12", shortName: "Lý", icon: "🧲", color: "#8B7FD6", desc: "Dao động, sóng, điện xoay chiều và vật lý hạt nhân." },
  { id: "chemistry", name: "Hóa học 12", shortName: "Hóa", icon: "⚗️", color: "#5FD0A4", desc: "Hóa hữu cơ, vô cơ và các phản ứng trọng tâm ôn thi." },
  { id: "biology", name: "Sinh học 12", shortName: "Sinh", icon: "🧬", color: "#D06B9E", desc: "Di truyền học, tiến hóa và sinh thái học." },
];

const teacherFirstNames = ["Nguyễn Văn A", "Trần Văn B", "Nguyễn Thị C", "Lê Thị D", "Phạm Văn E"];
const teacherTitles = { math: "Toán", literature: "Văn", english: "Anh", physics: "Vật lý", chemistry: "Hóa học", biology: "Sinh học" };

const chapterBank = {
  math: ["Khảo sát hàm số", "Mũ và Logarit", "Nguyên hàm — Tích phân", "Số phức", "Hình học không gian"],
  literature: ["Thơ hiện đại Việt Nam", "Văn xuôi kháng chiến", "Kịch và nghị luận", "Văn học nước ngoài"],
  english: ["Ngữ pháp trọng tâm", "Từ vựng chủ đề", "Kỹ năng đọc hiểu", "Luyện đề tổng hợp"],
  physics: ["Dao động cơ", "Sóng cơ và âm học", "Điện xoay chiều", "Lượng tử ánh sáng", "Vật lý hạt nhân"],
  chemistry: ["Este — Lipit", "Amin — Amino axit", "Polime", "Đại cương kim loại", "Hóa vô cơ nâng cao"],
  biology: ["Cơ chế di truyền", "Quy luật di truyền", "Di truyền học người", "Tiến hóa", "Sinh thái học"],
};

const lessonBank = [
  "Tổng quan và khái niệm mở đầu", "Tính chất cơ bản", "Phương pháp giải nhanh",
  "Bài tập minh họa cơ bản", "Bài tập minh họa nâng cao", "Luyện đề trắc nghiệm",
  "Tổng kết và mẹo làm bài",
];

function pad(n) { return String(n).padStart(2, "0"); }

function randomDuration(seed) {
  const minutes = 20 + (seed % 35);
  const seconds = (seed * 7) % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

let idSeed = 0;

function buildLesson(chapterId, order) {
  idSeed += 1;
  const title = lessonBank[(order - 1) % lessonBank.length];
  return {
    id: `${chapterId}-lesson-${order}`,
    title: `Bài ${pad(order)} — ${title}`,
    description:
      "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
    duration: randomDuration(idSeed),
    thumbnail: "🎬",
    order,
    videoUrl: null,
    googleDriveFileId: null,
    embedUrl: null,
  };
}

function buildChapter(teacherId, subjectId, name, order) {
  const chapterId = `${teacherId}-ch-${order}`;
  const lessonCount = 5 + (order % 3); // 5-7 bài
  const lessons = Array.from({ length: lessonCount }, (_, i) => buildLesson(chapterId, i + 1));
  return {
    id: chapterId,
    name,
    description: `Chương ${order}: ${name}. Bao gồm ${lessonCount} bài giảng từ cơ bản đến nâng cao.`,
    order,
    lessons,
  };
}

function buildTeacher(subjectId, index) {
  const teacherId = `${subjectId}-teacher-${index}`;
  const name = teacherFirstNames[index - 1];
  const prefix = name.endsWith("C") || name.endsWith("D") ? "Cô" : "Thầy";
  const chapters = chapterBank[subjectId].slice(0, 3 + (index % 2)).map((name, i) =>
    buildChapter(teacherId, subjectId, name, i + 1)
  );
  return {
    id: teacherId,
    name: `${prefix} ${name}`,
    avatar: prefix === "Cô" ? "👩‍🏫" : "👨‍🏫",
    title: `Giáo viên ${teacherTitles[subjectId]}`,
    description: `${prefix} ${name} có nhiều năm kinh nghiệm giảng dạy và luyện thi ${teacherTitles[subjectId]} với phương pháp dễ hiểu, trọng tâm.`,
    chapters,
  };
}

function buildCourse(subject) {
  const teacherCount = 3;
  const teachers = Array.from({ length: teacherCount }, (_, i) => buildTeacher(subject.id, i + 1));
  return {
    id: subject.id,
    name: subject.name,
    shortName: subject.shortName,
    description: subject.desc,
    icon: subject.icon,
    color: subject.color,
    teachers,
  };
}

const courses = subjects.map(buildCourse);

const header = `// ============================================================
// DỮ LIỆU KHÓA HỌC — NGUỒN DUY NHẤT CHO TOÀN BỘ GIAO DIỆN
// ============================================================
// Đây là nơi DUY NHẤT bạn cần chỉnh sửa để thêm/sửa/xóa:
//   Môn học → Giáo viên → Chương → Bài học → Google Drive File ID
//
// KHÔNG cần sửa bất kỳ component UI nào khi thêm dữ liệu mới.
// Xem hướng dẫn chi tiết ở cuối file này và trong README.md.
// ============================================================

import type { Course } from "../types";

export const courses: Course[] = `;

const footer = `;

// ------------------------------------------------------------
// HƯỚNG DẪN NHANH
// ------------------------------------------------------------
// 1. Thêm môn học mới: copy một object Course, đổi "id" (duy nhất,
//    không dấu, không khoảng trắng), "name", "icon", "color".
//
// 2. Thêm giáo viên: thêm object Teacher vào mảng "teachers" của
//    môn học tương ứng.
//
// 3. Thêm chương: thêm object Chapter vào mảng "chapters" của
//    giáo viên, nhớ tăng "order".
//
// 4. Thêm bài học: thêm object Lesson vào mảng "lessons" của
//    chương, nhớ tăng "order".
//
// 5. Gắn video Google Drive: khi đã có file trên Drive, thay:
//        googleDriveFileId: null
//    thành:
//        googleDriveFileId: "FILE_ID_TỪ_GOOGLE_DRIVE"
//    Component sẽ tự động phát hiện và có thể render player thật
//    sau này trong /src/components/video/VideoPlayer.tsx.
// ------------------------------------------------------------
`;

const fs = await import("node:fs");
fs.writeFileSync(
  new URL("../src/data/courses.ts", import.meta.url),
  header + JSON.stringify(courses, null, 2) + footer
);

console.log("Generated src/data/courses.ts with", courses.length, "courses");
