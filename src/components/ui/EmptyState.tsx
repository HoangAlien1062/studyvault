import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon = "🗂️", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl2 border border-dashed border-ink-600 bg-ink-800/40 animate-fadeUp">
      <div className="text-4xl mb-4 opacity-80">{icon}</div>
      <h3 className="text-base font-display font-semibold text-ash-200">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-ash-400 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
