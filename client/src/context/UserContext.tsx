import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { doctor } from "@/api";

interface UserContextType {
  user: any;
  loading: boolean;
  refreshUser: () => Promise<void>; // Add explicit return type
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const initialLoad = useRef(true);
  
    const refreshUser = useCallback(async () => {
      try {
        setLoading(true);
        const userData = await doctor.getDoctor();
        setUser(userData);
        localStorage.setItem("isAuthenticated", "true");
      } catch (error) {
        setUser(null);
        localStorage.removeItem("isAuthenticated");
      } finally {
        setLoading(false);
        initialLoad.current = false;
      }
    }, []);
  
    useEffect(() => {
      const controller = new AbortController();
      
      if (initialLoad.current) {
        refreshUser();
      }
  
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          refreshUser();
        }
      };
  
      window.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        controller.abort();
        window.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, [refreshUser]);
  
    const value = useMemo(() => ({
      user,
      loading,
      refreshUser
    }), [user, loading, refreshUser]);
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
