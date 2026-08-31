import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Trang chủ", icon: "🏠" },
  { to: "/exams", label: "Đề thi", icon: "📝" },
  { to: "/exams/leaderboard", label: "Xếp hạng", icon: "🏆" },
  { to: "/exams/history", label: "Lịch sử", icon: "🕘" },
  { to: "/admin", label: "Cài đặt", icon: "⚙" },
];

export default function MobileNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ink-850/95 backdrop-blur border-t border-ink-600/70 pb-[env(safe-area-inset-bottom)]"
      aria-label="Điều hướng chính"
    >
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? "text-cue" : "text-ash-500"
              }`
            }
          >
            <span className="text-lg leading-none" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
