import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "../../lib/auth";

export default function Header() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : "/");
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
        onClick={() => navigate("/")}
        aria-label="Tìm kiếm"
        className="sm:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ash-300 hover:bg-ink-700/60 transition-colors"
      >
        🔍
      </button>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2.5 pl-2 border-l border-ink-600/70">
          <div className="h-9 w-9 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center text-sm">
            👤
          </div>
          {loading ? null : user ? (
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-medium text-ash-200 truncate max-w-[140px]">
                {profile?.display_name ?? user.email}
              </p>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  navigate("/");
                }}
                className="text-xs text-ash-500 hover:text-ash-300"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-cue hover:underline"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
