import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import EmptyState from "../ui/EmptyState";

interface CoinRow {
  user_id: string;
  display_name: string | null;
  coins: number;
}

export default function CoinLeaderboardTable() {
  const [rows, setRows] = useState<CoinRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!supabase) {
      setError("Chưa kết nối Supabase.");
      return;
    }
    supabase
      .from("profiles")
      .select("user_id, display_name, coins")
      .order("coins", { ascending: false })
      .limit(100)
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          return;
        }
        setRows((data ?? []) as CoinRow[]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <p className="text-sm text-signal-danger">⚠️ Không tải được xếp hạng coin: {error}</p>;
  }

  if (rows === null) {
    return <p className="text-sm text-ash-500">Đang tải...</p>;
  }

  if (rows.length === 0) {
    return (
      <EmptyState icon="🪙" title="Chưa có ai có coin" description="Hoàn thành bài kiểm tra để nhận coin đầu tiên." />
    );
  }

  const medal = ["🥇", "🥈", "🥉"];

  return (
    <div className="overflow-hidden rounded-lg border border-ink-600">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-ink-800 text-left text-xs uppercase tracking-wide text-ash-500">
            <th className="px-4 py-2 w-14">#</th>
            <th className="px-4 py-2">Người dùng</th>
            <th className="px-4 py-2 text-right">🪙 Coin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.user_id} className="border-t border-ink-700">
              <td className="px-4 py-2 font-mono text-ash-400">{medal[i] ?? i + 1}</td>
              <td className="px-4 py-2 text-ash-200">{r.display_name ?? "Người dùng ẩn danh"}</td>
              <td className="px-4 py-2 text-right font-mono font-semibold text-cue tabular-nums">{r.coins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
