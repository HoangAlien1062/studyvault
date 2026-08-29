import { useCallback, useEffect, useState } from "react";
import { STORAGE_EVENT, notifyStorageChange, storage } from "../lib/storage";
import { getExamData, isExamDataReady } from "../lib/examStore";

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

export function useExamData() {
  return useStorageSlice(getExamData);
}

export function useExamDataReady(): boolean {
  return useStorageSlice(isExamDataReady);
}

export function useExamDisplayName() {
  const name = useStorageSlice(storage.getExamDisplayName);
  const setName = useCallback((next: string) => {
    storage.setExamDisplayName(next.trim());
    notifyStorageChange();
  }, []);
  return { displayName: name, setDisplayName: setName };
}

export function useMyExamAttemptIds() {
  const ids = useStorageSlice(storage.getMyExamAttemptIds);
  const addId = useCallback((attemptId: string) => {
    storage.addMyExamAttemptId(attemptId);
    notifyStorageChange();
  }, []);
  return { myAttemptIds: ids, addMyAttemptId: addId };
}
