import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-lg bg-ink-700/70 border border-ink-600 text-ash-200 placeholder:text-ash-500 text-sm px-3.5 py-2.5 outline-none transition-all duration-200 focus:border-cue/60 focus:shadow-[0_0_0_3px_rgba(242,184,75,0.12)]";

export function Label({ children }: { children: ReactNode }) {
  return <label className="block text-xs font-medium text-ash-400 mb-1.5">{children}</label>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return <input className={`${fieldClass} ${className}`} {...rest} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return <textarea className={`${fieldClass} resize-none ${className}`} {...rest} />;
}

export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
