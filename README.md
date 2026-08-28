# StudyVault — Kho video khóa học

Frontend cho website quản lý/thư viện video khóa học. Video hiển thị bằng
`<iframe>` — **chưa kết nối Google Drive API, chưa có OAuth**. Toàn bộ
Môn học / Giáo viên / Chương / Bài học có thể **chỉnh sửa ngay trên
web**, tại trang **Cài đặt** (`/admin`) — không cần sửa code. Dữ liệu
được lưu trên **Supabase** (đám mây), nên chỉnh sửa ở thiết bị này sẽ
hiện đúng như vậy khi mở web trên thiết bị khác.

## Cấu hình Supabase (bắt buộc để dữ liệu đồng bộ)

1. Tạo file `.env.local` ở thư mục gốc (đã có sẵn giá trị của bạn — xem
   `.env.example` nếu cần đối chiếu):

   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxx
   ```

2. Vào Supabase Dashboard → **SQL Editor** → New query, dán toàn bộ nội
   dung file `supabase/schema.sql` trong project này rồi bấm **Run**.
   File này tạo bảng `study_content` (1 dòng JSON duy nhất chứa toàn bộ
   cây dữ liệu) và mở quyền đọc/ghi bằng anon key, đồng thời bật realtime
   cho bảng đó.

3. Chạy `npm install && npm run dev` như bình thường — lần đầu mở app sẽ
   tự động đẩy dữ liệu mặc định trong `courses.ts` lên Supabase.

**Lưu ý bảo mật:** app hiện chưa có đăng nhập, nên ai có URL +
`VITE_SUPABASE_ANON_KEY` cũng sửa được dữ liệu (phù hợp cho công cụ quản
lý cá nhân). Muốn khóa lại chỉ mình bạn sửa được thì cần thêm Supabase
Auth và đổi các policy trong `schema.sql` cho khớp.

Nếu chưa cấu hình `.env.local` (hoặc Supabase lỗi mạng), app vẫn chạy
được bình thường với dữ liệu mặc định trong `courses.ts`, chỉ là sẽ
không đồng bộ qua thiết bị khác.

## Chạy thử

```bash
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ Vite in ra (mặc định `http://localhost:5173`).

```bash
npm run build     # build production
npm run preview   # xem thử bản build
```

## File dữ liệu gốc

Dữ liệu khởi tạo (môn học, giáo viên, chương, bài học) nằm trong:

```
src/data/courses.ts
```

Đây là **dữ liệu mặc định** (seed) — chỉ dùng để tạo dữ liệu ban đầu trên
Supabase khi bảng còn trống. Mọi chỉnh sửa bạn làm trong trang **Cài
đặt** trên web được lưu lên Supabase, không sửa file này. Nếu muốn quay
lại đúng dữ liệu gốc, bấm **"Khôi phục mặc định"** ở trang Cài đặt.

### Cấu trúc

```
Course (môn học)
 └─ teachers: Teacher[] (giáo viên)
     └─ chapters: Chapter[] (chương / chủ đề)
         └─ lessons: Lesson[] (bài học)
             ├─ videos: LessonVideo[]     (nhiều video / bài, mỗi video 1 iframe)
             └─ materials: LessonMaterial[] (tài liệu đính kèm để tải/xem)
```

Type đầy đủ nằm trong `src/types/index.ts`.

## Chỉnh sửa nội dung ngay trên web (trang Cài đặt)

Vào **Cài đặt** ở sidebar (route `/admin`) để quản lý toàn bộ nội dung
mà không cần đụng code:

```
/admin                                    → danh sách Môn học
/admin/:courseId                          → Giáo viên của môn học
/admin/:courseId/:teacherId               → Chương của giáo viên
/admin/:courseId/:teacherId/:chapterId    → Bài học của chương
```

Ở mỗi cấp đều có nút **Thêm**, và mỗi mục có nút **✎ Sửa** / **🗑 Xóa**.
Xóa một môn/giáo viên/chương sẽ xóa luôn mọi thứ bên trong nó — web sẽ
hỏi xác nhận trước khi xóa.

### Bài học: nhiều video + tài liệu đính kèm

Trong màn hình quản lý bài học, mỗi bài có:

- **Video (số lượng tùy ý)** — bấm **"+ Thêm video"** để thêm một video
  mới (Tiêu đề + Embed URL), bấm 🗑 trên từng dòng để xóa video đó. Bài
  học có thể có 1, 3, 5... video tùy bạn, không giới hạn. Nếu chưa có
  video nào, trang xem sẽ hiển thị "Video chưa được kết nối".
- **Tài liệu đính kèm (số lượng tùy ý)** — bấm **"+ Thêm tài liệu"** để
  thêm một dòng (Tên tài liệu + URL xem/tải), hiển thị bên dưới video ở
  trang xem bài học.

Với video, dán URL dạng **`.../preview`** (không phải `/view`), ví dụ với
Google Drive:

```
https://drive.google.com/file/d/FILE_ID/preview
```

Khi bài học có nhiều hơn 1 video, trang xem sẽ tự hiện dải tab để chuyển
giữa các video, iframe luôn responsive 16:9.

### Dữ liệu lưu ở đâu?

Toàn bộ cây dữ liệu sau khi chỉnh sửa được lưu trên **Supabase**, bảng
`study_content` (xem `supabase/schema.sql`), quản lý bởi
`src/lib/contentStore.ts`. Vì vậy:

- Chỉnh sửa trên **thiết bị/trình duyệt bất kỳ** đều hiện đúng như vậy
  ở nơi khác — miễn cùng trỏ vào cùng project Supabase (cùng file
  `.env.local`).
- App đăng ký realtime với bảng này, nên nếu mở web ở 2 thiết bị cùng
  lúc, sửa ở một bên sẽ tự cập nhật bên còn lại mà không cần tải lại
  trang.
- Muốn sửa trực tiếp trong code (ví dụ để commit dữ liệu mẫu mới, dùng
  làm dữ liệu gốc lần đầu chạy), vẫn sửa `src/data/courses.ts` như
  trước — cách này không đổi.

## Cấu trúc thư mục

```
src/
├── data/courses.ts          # dữ liệu MẶC ĐỊNH (seed ban đầu)
├── types/index.ts           # định nghĩa Course / Teacher / Chapter / Lesson / LessonVideo / LessonMaterial
├── lib/
│   ├── contentStore.ts        # CRUD + đồng bộ Supabase cho toàn bộ nội dung (dùng bởi trang Admin)
│   ├── supabaseClient.ts      # khởi tạo Supabase client từ .env.local
│   ├── catalog.ts              # truy vấn dữ liệu (đọc "sống" từ contentStore)
│   ├── search.ts
│   └── storage.ts              # favorites / history / progress
├── hooks/useUserData.ts     # favorites / history / progress (localStorage) / useCourses / useContentReady
├── config/site.ts           # đổi tên website tại đây
├── components/
│   ├── layout/               Sidebar, Header, Breadcrumb, AppLayout, MobileNav
│   ├── courses/               CourseCard, CourseGrid, CourseHeader
│   ├── teachers/               TeacherCard, TeacherGrid
│   ├── chapters/               ChapterCard, ChapterList
│   ├── lessons/                 LessonCard, LessonRow, LessonList
│   ├── video/                    VideoPlayer (nhiều video/tab), VideoPlaylist, VideoControls
│   ├── search/                    SearchBar, SearchResults, SearchFilters
│   └── ui/                         Button, Card, Badge, ProgressBar, EmptyState, Field (Input/Textarea)
└── pages/
    ├── admin/                    AdminCourses, AdminTeachers, AdminChapters, AdminLessons
    └── ...                       một page cho mỗi route công khai (xem router bên dưới)
```

## Routes

| Route | Trang |
|---|---|
| `/` | Trang chủ |
| `/courses` | Danh sách môn học |
| `/courses/:courseId` | Chi tiết môn (tabs: tổng quan / giáo viên / chương) |
| `/courses/:courseId/teachers/:teacherId` | Chương của một giáo viên |
| `/courses/:courseId/teachers/:teacherId/chapters/:chapterId` | Danh sách bài học |
| `/lesson/:lessonId` | Trang xem video |
| `/search` | Tìm kiếm toàn bộ |
| `/favorites` | Đã lưu |
| `/history` | Lịch sử xem |
| `/progress` | Tiến độ học tập |
| `/admin` | Cài đặt — quản lý Môn học |
| `/admin/:courseId` | Cài đặt — quản lý Giáo viên |
| `/admin/:courseId/:teacherId` | Cài đặt — quản lý Chương |
| `/admin/:courseId/:teacherId/:chapterId` | Cài đặt — quản lý Bài học (video + tài liệu) |

## Ghi chú

- Dữ liệu mock được sinh sẵn cho 6 môn × 3 giáo viên × vài chương × vài
  bài (xem `scripts/generate-data.mjs` — chỉ chạy lại nếu bạn muốn sinh
  bộ mock mới, không bắt buộc).
- Favorites / lịch sử xem / tiến độ học vẫn lưu trong `localStorage` của
  trình duyệt (riêng theo từng máy — chưa cần đồng bộ). Riêng nội dung
  Môn học/Giáo viên/Chương/Bài học (chỉnh sửa ở trang Cài đặt) được lưu
  trên Supabase, đồng bộ qua mọi thiết bị.
- Toàn bộ empty state (chưa có giáo viên, chưa có chương, chưa có bài
  học, video chưa kết nối, không tìm thấy kết quả...) đã được thiết kế
  sẵn.
- Responsive đầy đủ: sidebar cố định trên desktop, chuyển thành bottom
  navigation trên mobile.
