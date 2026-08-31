import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import type { Profile } from "../../lib/auth";

export default function AdminUsers() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    if (!supabase) {
      setError("Chưa cấu hình Supabase.");
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: err } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setProfiles((data ?? []) as Profile[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleAdmin(p: Profile) {
    if (!supabase) return;
    setBusyId(p.user_id);
    const { error: err } = await supabase
      .from("profiles")
      .update({ is_admin: !p.is_admin })
      .eq("user_id", p.user_id);
    if (err) {
      setError(err.message);
    } else {
      setProfiles((prev) =>
        prev.map((item) => (item.user_id === p.user_id ? { ...item, is_admin: !item.is_admin } : item))
      );
    }
    setBusyId(null);
  }

  return (
    <div className="container-page py-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Link to="/admin" className="text-xs text-ash-500 hover:text-ash-300">
            ← Quay lại quản trị
          </Link>
          <h1 className="text-xl font-display font-bold text-ash-200 mt-1">👥 Quản lý người dùng</h1>
        </div>
        <Button variant="secondary" size="sm" onClick={load}>
          ↻ Tải lại
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-signal-live/30 bg-signal-live/10 px-3.5 py-2.5 text-sm text-signal-live">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-ash-500">Đang tải...</p>
      ) : profiles.length === 0 ? (
        <p className="text-sm text-ash-500">Chưa có ai đăng ký.</p>
      ) : (
        <div className="space-y-2">
          {profiles.map((p) => (
            <Card key={p.user_id} className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ash-200 truncate">{p.display_name || "(chưa đặt tên)"}</p>
                  {p.is_admin && <Badge tone="cue">Admin</Badge>}
                  {p.user_id === user?.id && <Badge>Bạn</Badge>}
                </div>
                <p className="text-xs text-ash-500 font-mono truncate">{p.user_id}</p>
              </div>
              <Button
                variant={p.is_admin ? "danger" : "secondary"}
                size="sm"
                disabled={busyId === p.user_id || p.user_id === user?.id}
                onClick={() => toggleAdmin(p)}
                title={p.user_id === user?.id ? "Không thể tự thu quyền của chính mình" : undefined}
              >
                {p.is_admin ? "Thu quyền admin" : "Cấp quyền admin"}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
