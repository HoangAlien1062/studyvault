import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

interface SettingsCardProps {
  icon: string;
  title: string;
  description: string;
  cta: string;
  to: string;
}

function SettingsCard({ icon, title, description, cta, to }: SettingsCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0">{icon}</div>
        <div>
          <p className="font-display font-semibold text-ash-200">{title}</p>
          <p className="text-sm text-ash-400 mt-0.5">{description}</p>
        </div>
      </div>
      <Button size="sm" variant="secondary" className="shrink-0" onClick={() => navigate(to)}>
        {cta}
      </Button>
    </Card>
  );
}

export default function SettingsPage() {
  const { user, profile, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="container-page py-16 text-center text-sm text-ash-500">Đang tải...</div>;

  if (!user) {
    return (
      <div className="container-page py-16 flex justify-center">
        <Card className="w-full max-w-sm text-center space-y-4">
          <p className="text-sm text-ash-400">Đăng nhập để chỉnh sửa đề và tạo câu hỏi.</p>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Cài đặt" }]} />
      <div>
        <h1 className="text-xl font-display font-bold text-ash-200">Cài đặt</h1>
        <p className="text-sm text-ash-500 mt-1">
          Xin chào, <span className="text-ash-300">{profile?.display_name ?? user.email}</span>
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-ash-500">Nội dung của bạn</h2>
        <SettingsCard
          icon="🧠"
          title="Ngân hàng câu hỏi"
          description="Xem, thêm, sửa câu hỏi — thủ công hoặc bằng AI."
          cta="Mở"
          to="/exams/questions"
        />
        <SettingsCard
          icon="📝"
          title="Tạo đề kiểm tra"
          description="Tạo đề mới hoặc quản lý các đề bạn đã tạo."
          cta="Mở"
          to="/exams/create"
        />
        <SettingsCard
          icon="👤"
          title="Tài khoản"
          description="Đổi tên hiển thị, đăng xuất."
          cta="Mở"
          to="/account"
        />
      </section>

      {isAdmin && (
        <section className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-wider text-ash-500">Quản trị</h2>
          <SettingsCard
            icon="📚"
            title="Quản lý môn học & bài giảng"
            description="Thêm/sửa/xóa môn học, giáo viên, chương, bài giảng video."
            cta="Mở"
            to="/admin"
          />
          <SettingsCard
            icon="👥"
            title="Quản lý người dùng"
            description="Xem danh sách tài khoản, cấp/gỡ quyền quản trị."
            cta="Mở"
            to="/admin/users"
          />
        </section>
      )}
    </div>
  );
}
