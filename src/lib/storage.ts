// Lưu trạng thái người dùng (favorites / history / progress) vào
// localStorage. Đây chỉ là mock persistence cho giai đoạn frontend —
// sau này có thể thay bằng API thật mà không cần đổi các hook dùng nó.

const KEYS = {
  favorites: "studyvault.favorites",
  history: "studyvault.history",
  progress: "studyvault.progress",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage indisponible (SSR, chế độ riêng tư...) — bỏ qua lặng lẽ
  }
}

export interface HistoryEntry {
  lessonId: string;
  progress: number;
  watchedAt: number;
}

export interface ProgressState {
  [lessonId: string]: { progress: number; completed: boolean };
}

export const storage = {
  getFavorites(): string[] {
    return read<string[]>(KEYS.favorites, []);
  },
  setFavorites(ids: string[]): void {
    write(KEYS.favorites, ids);
  },

  getHistory(): HistoryEntry[] {
    return read<HistoryEntry[]>(KEYS.history, []);
  },
  setHistory(entries: HistoryEntry[]): void {
    write(KEYS.history, entries);
  },

  getProgress(): ProgressState {
    return read<ProgressState>(KEYS.progress, {});
  },
  setProgress(state: ProgressState): void {
    write(KEYS.progress, state);
  },
};

export const STORAGE_EVENT = "studyvault-storage-change";

export function notifyStorageChange() {
  window.dispatchEvent(new Event(STORAGE_EVENT));
}
