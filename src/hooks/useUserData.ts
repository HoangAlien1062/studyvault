import { useCallback, useEffect, useState } from "react";
import { STORAGE_EVENT, notifyStorageChange, storage } from "../lib/storage";
import type { HistoryEntry, ProgressState } from "../lib/storage";
import { getCourses, isContentReady } from "../lib/contentStore";
import type { Course } from "../types";

function useStorageSlice<T>(getter: () => T): T {
  const [value, setValue] = useState<T>(getter);
  useEffect(() => {
    const handler = () => setValue(getter());
    window.addEventListener(STORAGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(STORAGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [getter]);
  return value;
}

export function useFavorites() {
  const favorites = useStorageSlice(storage.getFavorites);

  const isFavorite = useCallback((lessonId: string) => favorites.includes(lessonId), [favorites]);

  const toggleFavorite = useCallback((lessonId: string) => {
    const current = storage.getFavorites();
    const next = current.includes(lessonId)
      ? current.filter((id) => id !== lessonId)
      : [...current, lessonId];
    storage.setFavorites(next);
    notifyStorageChange();
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}

export function useHistory() {
  const history = useStorageSlice(storage.getHistory);

  const recordView = useCallback((lessonId: string, progress: number) => {
    const current = storage.getHistory().filter((h) => h.lessonId !== lessonId);
    const next: HistoryEntry[] = [{ lessonId, progress, watchedAt: Date.now() }, ...current].slice(
      0,
      100
    );
    storage.setHistory(next);
    notifyStorageChange();
  }, []);

  const clearHistory = useCallback(() => {
    storage.setHistory([]);
    notifyStorageChange();
  }, []);

  return { history, recordView, clearHistory };
}

export function useProgress() {
  const progressState = useStorageSlice(storage.getProgress);

  const getProgress = useCallback(
    (lessonId: string) => progressState[lessonId] ?? { progress: 0, completed: false },
    [progressState]
  );

  const setProgress = useCallback((lessonId: string, progress: number, completed?: boolean) => {
    const current = storage.getProgress();
    const prevCompleted = current[lessonId]?.completed ?? false;
    const next: ProgressState = {
      ...current,
      [lessonId]: {
        progress: Math.max(0, Math.min(100, progress)),
        completed: completed ?? prevCompleted,
      },
    };
    storage.setProgress(next);
    notifyStorageChange();
  }, []);

  const toggleCompleted = useCallback((lessonId: string) => {
    const current = storage.getProgress();
    const entry = current[lessonId];
    const nowCompleted = !(entry?.completed ?? false);
    const next: ProgressState = {
      ...current,
      [lessonId]: {
        progress: nowCompleted ? 100 : entry?.progress ?? 0,
        completed: nowCompleted,
      },
    };
    storage.setProgress(next);
    notifyStorageChange();
  }, []);

  return { progressState, getProgress, setProgress, toggleCompleted };
}

// Dữ liệu môn học/giáo viên/chương/bài học có thể được chỉnh sửa trực
// tiếp trong trang Cài đặt (Admin). Hook này giúp các trang tự cập nhật
// ngay khi có thay đổi mà không cần load lại trang.
export function useCourses(): Course[] {
  return useStorageSlice(getCourses);
}

export function useContentReady(): boolean {
  return useStorageSlice(isContentReady);
}
