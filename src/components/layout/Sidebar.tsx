import { NavLink } from "react-router-dom";
import { siteConfig } from "../../config/site";

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

const mainNav: NavItem[] = [
  { to: "/", label: "Trang chủ", icon: "🏠" },
  { to: "/courses", label: "Môn học", icon: "📚" },
  { to: "/exams", label: "Kiểm tra", icon: "📝" },
  { to: "/favorites", label: "Đã lưu", icon: "⭐" },
  { to: "/history", label: "Lịch sử", icon: "🕘" },
  { to: "/progress", label: "Tiến độ", icon: "📊" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`hidden lg:flex flex-col shrink-0 border-r border-ink-600/70 bg-ink-850 transition-all duration-300 h-screen sticky top-0 ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-ink-600/70 shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cue text-ink-950 text-sm font-bold shrink-0">
          {siteConfig.logoGlyph}
        </div>
        {!collapsed && (
          <span className="font-display font-semibold text-ash-200 truncate">
            {siteConfig.name}
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {mainNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-cue/10 text-cue"
                  : "text-ash-400 hover:text-ash-200 hover:bg-ink-700/60"
              }`
            }
            title={collapsed ? item.label : undefined}
          >
            <span className="text-base shrink-0" aria-hidden>
              {item.icon}
            </span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-ink-600/70 space-y-1">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
              isActive ? "bg-cue/10 text-cue" : "text-ash-400 hover:text-ash-200 hover:bg-ink-700/60"
            }`
          }
          title={collapsed ? "Cài đặt" : undefined}
        >
          <span className="text-base shrink-0" aria-hidden>
            ⚙
          </span>
          {!collapsed && <span className="truncate">Cài đặt</span>}
        </NavLink>
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ash-500 hover:text-ash-200 hover:bg-ink-700/60 transition-colors duration-200"
        >
          <span className="text-base shrink-0" aria-hidden>
            {collapsed ? "»" : "«"}
          </span>
          {!collapsed && <span>Thu gọn</span>}
        </button>
      </div>
    </aside>
  );
}
