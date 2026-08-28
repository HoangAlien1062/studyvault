import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: ReactNode;
}

const variants: Record<string, string> = {
  primary:
    "bg-cue text-ink-950 hover:bg-cue-soft shadow-[0_0_0_1px_rgba(242,184,75,0.4)] hover:shadow-[0_0_20px_-4px_rgba(242,184,75,0.6)]",
  secondary: "bg-ink-700 text-ash-200 hover:bg-ink-600 border border-ink-600",
  ghost: "bg-transparent text-ash-300 hover:text-ash-200 hover:bg-ink-700/60",
  danger: "bg-transparent text-signal-live hover:bg-signal-live/10 border border-signal-live/40",
};

const sizes: Record<string, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
