import { FormEvent, ReactNode, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { FieldGroup, Input } from "../ui/Field";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminGate({ children }: { children: ReactNode }) {
  const { unlocked, unlock } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = unlock(password);
    if (!ok) {
      setError(true);
      setPassword("");
    }
  }

  return (
    <div className="container-page py-16 flex justify-center">
      <Card className="w-full max-w-sm space-y-4 text-center">
        <div className="text-3xl">🔒</div>
        <div>
          <h1 className="font-display font-semibold text-ash-200">Khu vực quản trị</h1>
          <p className="text-sm text-ash-400 mt-1">
            Nhập mật khẩu quản trị để xem và chỉnh sửa nội dung.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <FieldGroup label="Mật khẩu">
            <Input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
            />
          </FieldGroup>
          {error && <p className="text-xs text-signal-live">Sai mật khẩu, thử lại nhé.</p>}
          <Button type="submit" className="w-full" disabled={!password}>
            Mở khóa
          </Button>
        </form>
      </Card>
    </div>
  );
}
