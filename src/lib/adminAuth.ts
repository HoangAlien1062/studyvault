// ============================================================
// ADMIN GATE — bảo vệ khu vực Cài đặt (quản lý môn học/giáo
// viên/chương/bài học) và khu vực chỉnh sửa Kiểm tra (ngân hàng
// câu hỏi, tạo đề) bằng một mật khẩu duy nhất.
//
// Lưu ý quan trọng: project hiện tại KHÔNG có hệ thống auth/backend
// thật (không có bảng user, không có Supabase Auth, dữ liệu đọc/ghi
// bằng anon key public). Vì vậy đây chỉ là một lớp "khóa màn hình"
// ở phía trình duyệt — đủ để chặn người dùng thường vô tình bấm vào
// khu vực chỉnh sửa, KHÔNG phải bảo mật cấp server. Nếu cần bảo mật
// thật (mỗi người 1 tài khoản, phân quyền chặt), cần làm Supabase
// Auth + RLS ở một giai đoạn sau.
//
// Mật khẩu lấy từ biến môi trường VITE_ADMIN_PASSWORD (đặt trong
// .env.local). Nếu chưa cấu hình, dùng mật khẩu mặc định bên dưới
// để không chặn cứng lúc mới cài đặt — nhớ đổi trong .env.local.
// ============================================================

const STORAGE_KEY = "studyvault.admin.unlocked";
const DEFAULT_PASSWORD = "studyvault-admin";

function getAdminPassword(): string {
  const fromEnv = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
  return fromEnv && fromEnv.trim() ? fromEnv.trim() : DEFAULT_PASSWORD;
}

export function isAdminUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export const ADMIN_AUTH_EVENT = "studyvault-admin-auth-change";

function notifyChange() {
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
}

/** Trả về true nếu mật khẩu đúng (và mở khóa luôn, nhớ trên thiết bị này). */
export function tryUnlockAdmin(password: string): boolean {
  if (password === getAdminPassword()) {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore (chế độ riêng tư...) — vẫn coi như mở khóa cho tab này
    }
    notifyChange();
    return true;
  }
  return false;
}

export function lockAdmin(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  notifyChange();
}
