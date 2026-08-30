import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FieldGroup, Input } from "../components/ui/Field";
import { signIn, signUp } from "../lib/auth";
import { supabase } from "../lib/supabaseClient";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUp(email.trim(), password, displayName.trim() || email.split("@")[0]);
        setNotice(
          "Đăng ký thành công! Nếu dự án bật xác thực email, hãy kiểm tra hộp thư để xác nhận trước khi đăng nhập."
        );
        setMode("signin");
      } else {
        await signIn(email.trim(), password);
        navigate("/");
      }
    } catch (err) {
      setError((err as Error).message || "Có lỗi xảy ra, thử lại nhé.");
    } finally {
      setLoading(false);
    }
  }

  if (!supabase) {
    return (
      <div className="container-page py-16 flex justify-center">
        <Card className="w-full max-w-sm text-center space-y-2">
          <div className="text-3xl">⚠️</div>
          <p className="text-sm text-ash-300">
            Chưa cấu hình Supabase (.env.local) nên chưa thể đăng nhập/đăng ký.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-16 flex justify-center">
      <Card className="w-full max-w-sm space-y-5">
        <div className="text-center space-y-1">
          <div className="text-3xl">🔐</div>
          <h1 className="font-display font-semibold text-ash-200">
            {mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}
          </h1>
          <p className="text-sm text-ash-400">
            {mode === "signin" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <button
              type="button"
              className="text-cue hover:underline"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setNotice(null);
              }}
            >
              {mode === "signin" ? "Đăng ký ngay" : "Đăng nhập"}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <FieldGroup label="Tên hiển thị">
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Vd: Minh Anh" />
            </FieldGroup>
          )}
          <FieldGroup label="Email">
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@vidu.com"
            />
          </FieldGroup>
          <FieldGroup label="Mật khẩu">
            <Input
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </FieldGroup>

          {error && <p className="text-xs text-signal-live">{error}</p>}
          {notice && <p className="text-xs text-signal-done">{notice}</p>}

          <Button type="submit" className="w-full" disabled={loading || !email || !password}>
            {loading ? "Đang xử lý..." : mode === "signin" ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
