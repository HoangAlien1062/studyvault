import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FieldGroup, Input } from "../components/ui/Field";
import { useAuth } from "../hooks/useAuth";
import { signOut, updateDisplayName } from "../lib/auth";

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.display_name) setDisplayName(profile.display_name);
  }, [profile?.display_name]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await updateDisplayName(user.id, displayName.trim());
      setNotice("Đã lưu thay đổi.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="container-page py-16 text-center text-sm text-ash-500">Đang tải...</div>;

  if (!user) {
    return (
      <div className="container-page py-16 flex justify-center">
        <Card className="w-full max-w-sm text-center space-y-4">
          <p className="text-sm text-ash-400">Bạn cần đăng nhập để xem trang này.</p>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-8 flex justify-center">
      <Card className="w-full max-w-sm space-y-5">
        <div className="text-center space-y-1">
          <div className="h-16 w-16 mx-auto rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center text-2xl">
            👤
          </div>
          <h1 className="font-display font-semibold text-ash-200">Tài khoản của bạn</h1>
          <p className="text-xs text-ash-500">{user.email}</p>
          {profile?.is_admin && <p className="text-xs text-cue mt-1">⚙ Tài khoản quản trị</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <FieldGroup label="Tên hiển thị">
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Tên của bạn" />
          </FieldGroup>
          {error && <p className="text-xs text-signal-live">{error}</p>}
          {notice && <p className="text-xs text-signal-done">{notice}</p>}
          <Button type="submit" className="w-full" disabled={saving || !displayName.trim()}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            signOut();
            navigate("/");
          }}
          className="w-full text-center text-sm text-ash-500 hover:text-signal-live pt-2 border-t border-ink-700"
        >
          Đăng xuất
        </button>
      </Card>
    </div>
  );
}
