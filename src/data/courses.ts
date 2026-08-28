// ============================================================
// DỮ LIỆU KHÓA HỌC — NGUỒN DUY NHẤT CHO TOÀN BỘ GIAO DIỆN
// ============================================================
// Đây là nơi DUY NHẤT bạn cần chỉnh sửa để thêm/sửa/xóa:
//   Môn học → Giáo viên → Chương → Bài học → Google Drive File ID
//
// KHÔNG cần sửa bất kỳ component UI nào khi thêm dữ liệu mới.
// Xem hướng dẫn chi tiết ở cuối file này và trong README.md.
// ============================================================

import type { Course } from "../types";

export const courses: Course[] = [
  {
    "id": "math",
    "name": "Toán 12",
    "shortName": "Toán",
    "description": "Đại số, giải tích và hình học không gian lớp 12.",
    "icon": "📐",
    "color": "#F2B84B",
    "teachers": [
      {
        "id": "math-teacher-1",
        "name": "Thầy Nguyễn Văn A",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Toán",
        "description": "Thầy Nguyễn Văn A có nhiều năm kinh nghiệm giảng dạy và luyện thi Toán với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "math-teacher-1-ch-1",
            "name": "Khảo sát hàm số",
            "description": "Chương 1: Khảo sát hàm số. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "math-teacher-1-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:07",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": "https://drive.google.com/file/d/1qsAY49nEjQVA5sDh4acM-_AGumIcM3vf/preview"
              },
              {
                "id": "math-teacher-1-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:14",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:21",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:28",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:35",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:42",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-1-ch-2",
            "name": "Mũ và Logarit",
            "description": "Chương 2: Mũ và Logarit. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "math-teacher-1-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:49",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:56",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:03",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:10",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:17",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:24",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:31",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-1-ch-3",
            "name": "Nguyên hàm — Tích phân",
            "description": "Chương 3: Nguyên hàm — Tích phân. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "math-teacher-1-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:38",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:45",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:52",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:59",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:06",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-1-ch-4",
            "name": "Số phức",
            "description": "Chương 4: Số phức. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "math-teacher-1-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:13",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:20",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:27",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:34",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:41",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-1-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:48",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "math-teacher-2",
        "name": "Thầy Trần Văn B",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Toán",
        "description": "Thầy Trần Văn B có nhiều năm kinh nghiệm giảng dạy và luyện thi Toán với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "math-teacher-2-ch-1",
            "name": "Khảo sát hàm số",
            "description": "Chương 1: Khảo sát hàm số. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "math-teacher-2-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:55",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:02",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:09",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:16",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:23",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:30",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-2-ch-2",
            "name": "Mũ và Logarit",
            "description": "Chương 2: Mũ và Logarit. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "math-teacher-2-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:37",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:44",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:51",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:58",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:05",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:12",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:19",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-2-ch-3",
            "name": "Nguyên hàm — Tích phân",
            "description": "Chương 3: Nguyên hàm — Tích phân. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "math-teacher-2-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:26",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:33",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:40",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:47",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-2-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:54",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "math-teacher-3",
        "name": "Cô Nguyễn Thị C",
        "avatar": "👩‍🏫",
        "title": "Giáo viên Toán",
        "description": "Cô Nguyễn Thị C có nhiều năm kinh nghiệm giảng dạy và luyện thi Toán với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "math-teacher-3-ch-1",
            "name": "Khảo sát hàm số",
            "description": "Chương 1: Khảo sát hàm số. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "math-teacher-3-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:01",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:08",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:15",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:22",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:29",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:36",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-3-ch-2",
            "name": "Mũ và Logarit",
            "description": "Chương 2: Mũ và Logarit. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "math-teacher-3-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:43",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:50",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:57",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:04",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:11",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:18",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:25",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-3-ch-3",
            "name": "Nguyên hàm — Tích phân",
            "description": "Chương 3: Nguyên hàm — Tích phân. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "math-teacher-3-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:32",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:39",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:46",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:53",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:00",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "math-teacher-3-ch-4",
            "name": "Số phức",
            "description": "Chương 4: Số phức. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "math-teacher-3-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:07",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:14",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:21",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:28",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:35",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "math-teacher-3-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:42",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "literature",
    "name": "Văn 12",
    "shortName": "Văn",
    "description": "Văn học Việt Nam và thế giới trong chương trình lớp 12.",
    "icon": "📖",
    "color": "#E8734A",
    "teachers": [
      {
        "id": "literature-teacher-1",
        "name": "Thầy Nguyễn Văn A",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Văn",
        "description": "Thầy Nguyễn Văn A có nhiều năm kinh nghiệm giảng dạy và luyện thi Văn với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "literature-teacher-1-ch-1",
            "name": "Thơ hiện đại Việt Nam",
            "description": "Chương 1: Thơ hiện đại Việt Nam. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "literature-teacher-1-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:49",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:56",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:03",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:10",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:17",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:24",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-1-ch-2",
            "name": "Văn xuôi kháng chiến",
            "description": "Chương 2: Văn xuôi kháng chiến. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "literature-teacher-1-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:31",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:38",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:45",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:52",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:59",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:06",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:13",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-1-ch-3",
            "name": "Kịch và nghị luận",
            "description": "Chương 3: Kịch và nghị luận. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "literature-teacher-1-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:20",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:27",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:34",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:41",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:48",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-1-ch-4",
            "name": "Văn học nước ngoài",
            "description": "Chương 4: Văn học nước ngoài. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "literature-teacher-1-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:55",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:02",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:09",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:16",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:23",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-1-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:30",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "literature-teacher-2",
        "name": "Thầy Trần Văn B",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Văn",
        "description": "Thầy Trần Văn B có nhiều năm kinh nghiệm giảng dạy và luyện thi Văn với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "literature-teacher-2-ch-1",
            "name": "Thơ hiện đại Việt Nam",
            "description": "Chương 1: Thơ hiện đại Việt Nam. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "literature-teacher-2-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:37",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:44",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:51",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:58",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:05",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:12",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-2-ch-2",
            "name": "Văn xuôi kháng chiến",
            "description": "Chương 2: Văn xuôi kháng chiến. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "literature-teacher-2-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:19",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:26",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:33",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:40",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:47",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:54",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:01",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-2-ch-3",
            "name": "Kịch và nghị luận",
            "description": "Chương 3: Kịch và nghị luận. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "literature-teacher-2-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:08",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:15",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:22",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:29",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-2-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:36",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "literature-teacher-3",
        "name": "Cô Nguyễn Thị C",
        "avatar": "👩‍🏫",
        "title": "Giáo viên Văn",
        "description": "Cô Nguyễn Thị C có nhiều năm kinh nghiệm giảng dạy và luyện thi Văn với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "literature-teacher-3-ch-1",
            "name": "Thơ hiện đại Việt Nam",
            "description": "Chương 1: Thơ hiện đại Việt Nam. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "literature-teacher-3-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:43",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:50",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:57",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:04",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:11",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:18",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-3-ch-2",
            "name": "Văn xuôi kháng chiến",
            "description": "Chương 2: Văn xuôi kháng chiến. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "literature-teacher-3-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:25",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:32",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:39",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:46",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:53",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:00",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:07",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-3-ch-3",
            "name": "Kịch và nghị luận",
            "description": "Chương 3: Kịch và nghị luận. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "literature-teacher-3-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:14",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:21",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:28",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:35",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:42",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "literature-teacher-3-ch-4",
            "name": "Văn học nước ngoài",
            "description": "Chương 4: Văn học nước ngoài. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "literature-teacher-3-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:49",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:56",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:03",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:10",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:17",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "literature-teacher-3-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:24",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "english",
    "name": "Anh 12",
    "shortName": "Anh",
    "description": "Ngữ pháp, từ vựng và luyện thi chứng chỉ quốc tế.",
    "icon": "🌐",
    "color": "#5FA8D0",
    "teachers": [
      {
        "id": "english-teacher-1",
        "name": "Thầy Nguyễn Văn A",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Anh",
        "description": "Thầy Nguyễn Văn A có nhiều năm kinh nghiệm giảng dạy và luyện thi Anh với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "english-teacher-1-ch-1",
            "name": "Ngữ pháp trọng tâm",
            "description": "Chương 1: Ngữ pháp trọng tâm. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "english-teacher-1-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:31",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:38",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:45",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:52",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:59",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:06",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-1-ch-2",
            "name": "Từ vựng chủ đề",
            "description": "Chương 2: Từ vựng chủ đề. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "english-teacher-1-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:13",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:20",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:27",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:34",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:41",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:48",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:55",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-1-ch-3",
            "name": "Kỹ năng đọc hiểu",
            "description": "Chương 3: Kỹ năng đọc hiểu. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "english-teacher-1-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:02",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:09",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:16",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:23",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:30",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-1-ch-4",
            "name": "Luyện đề tổng hợp",
            "description": "Chương 4: Luyện đề tổng hợp. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "english-teacher-1-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:37",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:44",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:51",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:58",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:05",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-1-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:12",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "english-teacher-2",
        "name": "Thầy Trần Văn B",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Anh",
        "description": "Thầy Trần Văn B có nhiều năm kinh nghiệm giảng dạy và luyện thi Anh với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "english-teacher-2-ch-1",
            "name": "Ngữ pháp trọng tâm",
            "description": "Chương 1: Ngữ pháp trọng tâm. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "english-teacher-2-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:19",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:26",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:33",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:40",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:47",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:54",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-2-ch-2",
            "name": "Từ vựng chủ đề",
            "description": "Chương 2: Từ vựng chủ đề. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "english-teacher-2-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:01",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:08",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:15",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:22",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:29",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:36",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:43",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-2-ch-3",
            "name": "Kỹ năng đọc hiểu",
            "description": "Chương 3: Kỹ năng đọc hiểu. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "english-teacher-2-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:50",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:57",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:04",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:11",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-2-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:18",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "english-teacher-3",
        "name": "Cô Nguyễn Thị C",
        "avatar": "👩‍🏫",
        "title": "Giáo viên Anh",
        "description": "Cô Nguyễn Thị C có nhiều năm kinh nghiệm giảng dạy và luyện thi Anh với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "english-teacher-3-ch-1",
            "name": "Ngữ pháp trọng tâm",
            "description": "Chương 1: Ngữ pháp trọng tâm. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "english-teacher-3-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:25",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:32",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:39",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:46",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:53",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:00",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-3-ch-2",
            "name": "Từ vựng chủ đề",
            "description": "Chương 2: Từ vựng chủ đề. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "english-teacher-3-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:07",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:14",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:21",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:28",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:35",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:42",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:49",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-3-ch-3",
            "name": "Kỹ năng đọc hiểu",
            "description": "Chương 3: Kỹ năng đọc hiểu. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "english-teacher-3-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:56",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:03",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:10",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:17",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:24",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "english-teacher-3-ch-4",
            "name": "Luyện đề tổng hợp",
            "description": "Chương 4: Luyện đề tổng hợp. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "english-teacher-3-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:31",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:38",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:45",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:52",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:59",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "english-teacher-3-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:06",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "physics",
    "name": "Vật lý 12",
    "shortName": "Lý",
    "description": "Dao động, sóng, điện xoay chiều và vật lý hạt nhân.",
    "icon": "🧲",
    "color": "#8B7FD6",
    "teachers": [
      {
        "id": "physics-teacher-1",
        "name": "Thầy Nguyễn Văn A",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Vật lý",
        "description": "Thầy Nguyễn Văn A có nhiều năm kinh nghiệm giảng dạy và luyện thi Vật lý với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "physics-teacher-1-ch-1",
            "name": "Dao động cơ",
            "description": "Chương 1: Dao động cơ. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "physics-teacher-1-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:13",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:20",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:27",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:34",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:41",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:48",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-1-ch-2",
            "name": "Sóng cơ và âm học",
            "description": "Chương 2: Sóng cơ và âm học. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "physics-teacher-1-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:55",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:02",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:09",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:16",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:23",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:30",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:37",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-1-ch-3",
            "name": "Điện xoay chiều",
            "description": "Chương 3: Điện xoay chiều. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "physics-teacher-1-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:44",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:51",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:58",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:05",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:12",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-1-ch-4",
            "name": "Lượng tử ánh sáng",
            "description": "Chương 4: Lượng tử ánh sáng. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "physics-teacher-1-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:19",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:26",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:33",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:40",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:47",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-1-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:54",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "physics-teacher-2",
        "name": "Thầy Trần Văn B",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Vật lý",
        "description": "Thầy Trần Văn B có nhiều năm kinh nghiệm giảng dạy và luyện thi Vật lý với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "physics-teacher-2-ch-1",
            "name": "Dao động cơ",
            "description": "Chương 1: Dao động cơ. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "physics-teacher-2-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:01",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:08",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:15",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:22",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:29",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:36",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-2-ch-2",
            "name": "Sóng cơ và âm học",
            "description": "Chương 2: Sóng cơ và âm học. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "physics-teacher-2-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:43",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:50",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:57",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:04",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:11",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:18",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:25",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-2-ch-3",
            "name": "Điện xoay chiều",
            "description": "Chương 3: Điện xoay chiều. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "physics-teacher-2-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:32",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:39",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:46",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:53",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-2-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:00",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "physics-teacher-3",
        "name": "Cô Nguyễn Thị C",
        "avatar": "👩‍🏫",
        "title": "Giáo viên Vật lý",
        "description": "Cô Nguyễn Thị C có nhiều năm kinh nghiệm giảng dạy và luyện thi Vật lý với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "physics-teacher-3-ch-1",
            "name": "Dao động cơ",
            "description": "Chương 1: Dao động cơ. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "physics-teacher-3-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:07",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:14",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:21",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:28",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:35",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:42",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-3-ch-2",
            "name": "Sóng cơ và âm học",
            "description": "Chương 2: Sóng cơ và âm học. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "physics-teacher-3-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:49",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:56",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:03",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:10",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:17",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:24",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:31",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-3-ch-3",
            "name": "Điện xoay chiều",
            "description": "Chương 3: Điện xoay chiều. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "physics-teacher-3-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:38",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:45",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:52",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:59",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:06",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "physics-teacher-3-ch-4",
            "name": "Lượng tử ánh sáng",
            "description": "Chương 4: Lượng tử ánh sáng. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "physics-teacher-3-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:13",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:20",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:27",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:34",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:41",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "physics-teacher-3-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:48",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "chemistry",
    "name": "Hóa học 12",
    "shortName": "Hóa",
    "description": "Hóa hữu cơ, vô cơ và các phản ứng trọng tâm ôn thi.",
    "icon": "⚗️",
    "color": "#5FD0A4",
    "teachers": [
      {
        "id": "chemistry-teacher-1",
        "name": "Thầy Nguyễn Văn A",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Hóa học",
        "description": "Thầy Nguyễn Văn A có nhiều năm kinh nghiệm giảng dạy và luyện thi Hóa học với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "chemistry-teacher-1-ch-1",
            "name": "Este — Lipit",
            "description": "Chương 1: Este — Lipit. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "chemistry-teacher-1-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:55",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:02",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:09",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:16",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:23",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:30",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-1-ch-2",
            "name": "Amin — Amino axit",
            "description": "Chương 2: Amin — Amino axit. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "chemistry-teacher-1-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:37",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:44",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:51",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:58",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:05",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:12",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:19",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-1-ch-3",
            "name": "Polime",
            "description": "Chương 3: Polime. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "chemistry-teacher-1-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:26",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:33",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:40",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:47",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:54",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-1-ch-4",
            "name": "Đại cương kim loại",
            "description": "Chương 4: Đại cương kim loại. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "chemistry-teacher-1-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:01",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:08",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:15",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:22",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:29",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-1-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:36",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "chemistry-teacher-2",
        "name": "Thầy Trần Văn B",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Hóa học",
        "description": "Thầy Trần Văn B có nhiều năm kinh nghiệm giảng dạy và luyện thi Hóa học với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "chemistry-teacher-2-ch-1",
            "name": "Este — Lipit",
            "description": "Chương 1: Este — Lipit. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "chemistry-teacher-2-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:43",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:50",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:57",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:04",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:11",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:18",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-2-ch-2",
            "name": "Amin — Amino axit",
            "description": "Chương 2: Amin — Amino axit. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "chemistry-teacher-2-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:25",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:32",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:39",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:46",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:53",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:00",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:07",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-2-ch-3",
            "name": "Polime",
            "description": "Chương 3: Polime. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "chemistry-teacher-2-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:14",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:21",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:28",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:35",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-2-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:42",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "chemistry-teacher-3",
        "name": "Cô Nguyễn Thị C",
        "avatar": "👩‍🏫",
        "title": "Giáo viên Hóa học",
        "description": "Cô Nguyễn Thị C có nhiều năm kinh nghiệm giảng dạy và luyện thi Hóa học với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "chemistry-teacher-3-ch-1",
            "name": "Este — Lipit",
            "description": "Chương 1: Este — Lipit. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "chemistry-teacher-3-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:49",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:56",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:03",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:10",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:17",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:24",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-3-ch-2",
            "name": "Amin — Amino axit",
            "description": "Chương 2: Amin — Amino axit. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "chemistry-teacher-3-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:31",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:38",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:45",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:52",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:59",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:06",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:13",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-3-ch-3",
            "name": "Polime",
            "description": "Chương 3: Polime. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "chemistry-teacher-3-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:20",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:27",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:34",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:41",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:48",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "chemistry-teacher-3-ch-4",
            "name": "Đại cương kim loại",
            "description": "Chương 4: Đại cương kim loại. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "chemistry-teacher-3-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:55",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:02",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:09",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:16",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:23",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "chemistry-teacher-3-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:30",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "biology",
    "name": "Sinh học 12",
    "shortName": "Sinh",
    "description": "Di truyền học, tiến hóa và sinh thái học.",
    "icon": "🧬",
    "color": "#D06B9E",
    "teachers": [
      {
        "id": "biology-teacher-1",
        "name": "Thầy Nguyễn Văn A",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Sinh học",
        "description": "Thầy Nguyễn Văn A có nhiều năm kinh nghiệm giảng dạy và luyện thi Sinh học với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "biology-teacher-1-ch-1",
            "name": "Cơ chế di truyền",
            "description": "Chương 1: Cơ chế di truyền. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "biology-teacher-1-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:37",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:44",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:51",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:58",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:05",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:12",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-1-ch-2",
            "name": "Quy luật di truyền",
            "description": "Chương 2: Quy luật di truyền. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "biology-teacher-1-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:19",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:26",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:33",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:40",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:47",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:54",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:01",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-1-ch-3",
            "name": "Di truyền học người",
            "description": "Chương 3: Di truyền học người. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "biology-teacher-1-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:08",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:15",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:22",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:29",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:36",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-1-ch-4",
            "name": "Tiến hóa",
            "description": "Chương 4: Tiến hóa. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "biology-teacher-1-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:43",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:50",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:57",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:04",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:11",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-1-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:18",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "biology-teacher-2",
        "name": "Thầy Trần Văn B",
        "avatar": "👨‍🏫",
        "title": "Giáo viên Sinh học",
        "description": "Thầy Trần Văn B có nhiều năm kinh nghiệm giảng dạy và luyện thi Sinh học với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "biology-teacher-2-ch-1",
            "name": "Cơ chế di truyền",
            "description": "Chương 1: Cơ chế di truyền. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "biology-teacher-2-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:25",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:32",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:39",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:46",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:53",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:00",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-2-ch-2",
            "name": "Quy luật di truyền",
            "description": "Chương 2: Quy luật di truyền. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "biology-teacher-2-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:07",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "32:14",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "33:21",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "34:28",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "35:35",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "36:42",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "37:49",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-2-ch-3",
            "name": "Di truyền học người",
            "description": "Chương 3: Di truyền học người. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "biology-teacher-2-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "38:56",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "39:03",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "40:10",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "41:17",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-2-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "42:24",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      },
      {
        "id": "biology-teacher-3",
        "name": "Cô Nguyễn Thị C",
        "avatar": "👩‍🏫",
        "title": "Giáo viên Sinh học",
        "description": "Cô Nguyễn Thị C có nhiều năm kinh nghiệm giảng dạy và luyện thi Sinh học với phương pháp dễ hiểu, trọng tâm.",
        "chapters": [
          {
            "id": "biology-teacher-3-ch-1",
            "name": "Cơ chế di truyền",
            "description": "Chương 1: Cơ chế di truyền. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 1,
            "lessons": [
              {
                "id": "biology-teacher-3-ch-1-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "43:31",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-1-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "44:38",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-1-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "45:45",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-1-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "46:52",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-1-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "47:59",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-1-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "48:06",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-3-ch-2",
            "name": "Quy luật di truyền",
            "description": "Chương 2: Quy luật di truyền. Bao gồm 7 bài giảng từ cơ bản đến nâng cao.",
            "order": 2,
            "lessons": [
              {
                "id": "biology-teacher-3-ch-2-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "49:13",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-2-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "50:20",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-2-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "51:27",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-2-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "52:34",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-2-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "53:41",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-2-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "54:48",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-2-lesson-7",
                "title": "Bài 07 — Tổng kết và mẹo làm bài",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "20:55",
                "thumbnail": "🎬",
                "order": 7,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-3-ch-3",
            "name": "Di truyền học người",
            "description": "Chương 3: Di truyền học người. Bao gồm 5 bài giảng từ cơ bản đến nâng cao.",
            "order": 3,
            "lessons": [
              {
                "id": "biology-teacher-3-ch-3-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "21:02",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-3-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "22:09",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-3-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "23:16",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-3-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "24:23",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-3-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "25:30",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          },
          {
            "id": "biology-teacher-3-ch-4",
            "name": "Tiến hóa",
            "description": "Chương 4: Tiến hóa. Bao gồm 6 bài giảng từ cơ bản đến nâng cao.",
            "order": 4,
            "lessons": [
              {
                "id": "biology-teacher-3-ch-4-lesson-1",
                "title": "Bài 01 — Tổng quan và khái niệm mở đầu",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "26:37",
                "thumbnail": "🎬",
                "order": 1,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-4-lesson-2",
                "title": "Bài 02 — Tính chất cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "27:44",
                "thumbnail": "🎬",
                "order": 2,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-4-lesson-3",
                "title": "Bài 03 — Phương pháp giải nhanh",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "28:51",
                "thumbnail": "🎬",
                "order": 3,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-4-lesson-4",
                "title": "Bài 04 — Bài tập minh họa cơ bản",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "29:58",
                "thumbnail": "🎬",
                "order": 4,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-4-lesson-5",
                "title": "Bài 05 — Bài tập minh họa nâng cao",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "30:05",
                "thumbnail": "🎬",
                "order": 5,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              },
              {
                "id": "biology-teacher-3-ch-4-lesson-6",
                "title": "Bài 06 — Luyện đề trắc nghiệm",
                "description": "Bài giảng chi tiết kèm ví dụ minh họa, giúp học sinh nắm chắc kiến thức trọng tâm và luyện tập qua các dạng bài thường gặp trong đề thi.",
                "duration": "31:12",
                "thumbnail": "🎬",
                "order": 6,
                "videoUrl": null,
                "googleDriveFileId": null,
                "embedUrl": null
              }
            ]
          }
        ]
      }
    ]
  }
];

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
// 5. Gắn video: khi đã có URL embed (iframe), thay:
//        embedUrl: null
//    thành:
//        embedUrl: "https://example.com/embed/xxxxx"
//    VideoPlayer (/src/components/video/VideoPlayer.tsx) sẽ tự động
//    render <iframe src={embedUrl}> — không cần sửa component nào.
//    Nếu embedUrl vẫn là null, trang sẽ hiển thị "Video chưa được kết nối".
// ------------------------------------------------------------
