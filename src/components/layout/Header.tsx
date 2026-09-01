import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function CoinBadge({ coins }: { coins: number }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cue/20 to-cue/5 border border-cue/30 px-3 py-1.5 shrink-0"
      title="Coin tích lũy"
    >
      <span className="text-sm leading-none" aria-hidden>
        🪙
      </span>
      <span className="text-sm font-semibold font-mono text-cue tabular-nums">{coins}</span>
    </div>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/?q=${encodeURIComponent(query.trim())}`);
    setMobileSearchOpen(false);
  }

  if (mobileSearchOpen) {
    return (
      <header className="sticky top-0 z-30 flex items-center gap-2 h-16 px-4 border-b border-ink-600/70 bg-ink-900/95 backdrop-blur sm:hidden">
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm bài học, đề kiểm tra..."
            className="flex-1 rounded-xl bg-ink-800 border border-cue/50 px-4 py-2.5 text-sm text-ash-200 placeholder:text-ash-500 outline-none"
          />
        </form>
        <button
          onClick={() => setMobileSearchOpen(false)}
          aria-label="Đóng tìm kiếm"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ash-400 hover:bg-ink-700/60"
        >
          ✕
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-4 sm:px-6 lg:px-8 border-b border-ink-600/70 bg-ink-900/90 backdrop-blur">
      <form onSubmit={handleSubmit} className="hidden sm:flex flex-1 max-w-xl">
        <label className="relative w-full">
          <span className="sr-only">Tìm kiếm đề kiểm tra</span>
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ash-500">
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Tìm đề kiểm tra theo tên, chủ đề, môn học..."
            className={`w-full rounded-xl bg-ink-800 border pl-10 pr-4 py-2.5 text-sm text-ash-200 placeholder:text-ash-500 outline-none transition-all duration-200 ${
              focused ? "border-cue/60 shadow-[0_0_0_3px_rgba(242,184,75,0.12)]" : "border-ink-600"
            }`}
          />
        </label>
      </form>

      <button
        onClick={() => setMobileSearchOpen(true)}
        aria-label="Tìm kiếm"
        className="sm:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ash-300 hover:bg-ink-700/60 transition-colors"
      >
        🔍
      </button>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2.5 shrink-0">
        {user && !loading && <CoinBadge coins={profile?.coins ?? 0} />}

        <button
          onClick={() => (user ? navigate("/account") : navigate("/login"))}
          className="flex items-center gap-2.5 pl-2.5 border-l border-ink-600/70"
        >
          <div className="h-9 w-9 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center text-sm hover:border-cue/50 transition-colors">
            👤
          </div>
          {loading ? null : user ? (
            <div className="hidden md:block leading-tight text-left">
              <p className="text-sm font-medium text-ash-200 truncate max-w-[140px]">
                {profile?.display_name ?? user.email}
              </p>
              <span className="text-xs text-ash-500">Xem tài khoản</span>
            </div>
          ) : (
            <span className="text-sm font-medium text-cue">Đăng nhập</span>
          )}
        </button>
      </div>
    </header>
  );
}
