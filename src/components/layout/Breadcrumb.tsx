import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-ash-400 hover:text-cue transition-colors duration-150 accent-underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ash-200 font-medium" : "text-ash-400"}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-ash-500">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
