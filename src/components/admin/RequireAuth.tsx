import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container-page py-16 text-center text-sm text-ash-500">Đang kiểm tra đăng nhập...</div>;
  }

  if (!user) {
    return (
      <div className="container-page py-16 flex justify-center">
        <Card className="w-full max-w-sm space-y-4 text-center">
          <div className="text-3xl">🔒</div>
          <div>
            <h1 className="font-display font-semibold text-ash-200">Cần đăng nhập</h1>
            <p className="text-sm text-ash-400 mt-1">Đăng nhập để tự tạo câu hỏi và đề kiểm tra.</p>
          </div>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
