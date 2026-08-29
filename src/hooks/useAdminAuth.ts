import { useEffect, useState } from "react";
import { ADMIN_AUTH_EVENT, isAdminUnlocked, lockAdmin, tryUnlockAdmin } from "../lib/adminAuth";

export function useAdminAuth() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked);

  useEffect(() => {
    const handler = () => setUnlocked(isAdminUnlocked());
    window.addEventListener(ADMIN_AUTH_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(ADMIN_AUTH_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { unlocked, unlock: tryUnlockAdmin, lock: lockAdmin };
}
