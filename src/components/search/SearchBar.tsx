import { FormEvent, useState } from "react";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  size?: "hero" | "default";
  placeholder?: string;
}

export default function SearchBar({
  initialValue = "",
  onSearch,
  size = "default",
  placeholder = "Tìm kiếm bài học, giáo viên, chủ đề...",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="relative block w-full">
        <span className="sr-only">Tìm kiếm</span>
        <span
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ash-500 ${
            size === "hero" ? "text-lg" : "text-base"
          }`}
        >
          🔍
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value.trim());
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`w-full rounded-2xl bg-ink-800 border text-ash-200 placeholder:text-ash-500 outline-none transition-all duration-200 ${
            size === "hero" ? "pl-12 pr-5 py-4 text-base" : "pl-11 pr-4 py-3 text-sm"
          } ${focused ? "border-cue/60 shadow-[0_0_0_4px_rgba(242,184,75,0.12)]" : "border-ink-600"}`}
        />
      </label>
    </form>
  );
}
