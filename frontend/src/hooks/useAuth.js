import { useMemo } from "react";
import {
  getAuthToken,
  getUserData,
  isAuthenticated,
  getUserRole,
} from "@/lib/auth"; 

export function useAuth() {
  const user = useMemo(() => getUserData(), []);
  const token = useMemo(() => getAuthToken(), []);
  const role = useMemo(() => getUserRole(), []);
  const authenticated = useMemo(() => isAuthenticated(), []);

  return {
    user,
    token,
    role,
    isAuthenticated: authenticated,
  };
}
