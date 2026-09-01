import { NavLink, useLocation } from "react-router-dom";

const items = [
  { to: "/", label: "Trang chủ", icon: "🏠" },
  { to: "/exams", label: "Đề thi", icon: "📝" },
  { to: "/solo", label: "Solo", icon: "⚔️" },
  { to: "/exams/leaderboard", label: "Xếp hạng", icon: "🏆" },
  { to: "/exams/history", label: "Lịch sử", icon: "🕘" },
  { to: "/settings", label: "Cài đặt", icon: "⚙" },
];

// "/exams/leaderboard" và "/exams/history" đều bắt đầu bằng "/exams",
// nên nếu dùng NavLink mặc định (không "end"), tab "Đề thi" sẽ sáng
// cùng lúc với 2 tab đó — đây là lỗi 2 mục cùng vàng đã gặp. Dùng hàm
// so khớp riêng để "Đề thi" chỉ sáng đúng phạm vi của nó.
function isExamsTabActive(pathname: string): boolean {
  if (!pathname.startsWith("/exams")) return false;
  return !pathname.startsWith("/exams/leaderboard") && !pathname.startsWith("/exams/history");
}

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ink-850/95 backdrop-blur border-t border-ink-600/70 pb-[env(safe-area-inset-bottom)]"
      aria-label="Điều hướng chính"
    >
      <div className="grid grid-cols-6">
        {items.map((item) => {
          const active = item.to === "/exams" ? isExamsTabActive(location.pathname) : undefined;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to !== "/exams"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                  (active ?? isActive) ? "text-cue" : "text-ash-500"
                }`
              }
            >
              <span className="text-lg leading-none" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
