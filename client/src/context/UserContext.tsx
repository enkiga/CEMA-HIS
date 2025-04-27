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

// Create a context for user data
// The context will hold user data and loading state
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  // Function to refresh user data
  // This function fetches the user data from the API and updates the state
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

  // Effect to refresh user data when the component mounts or when the visibility changes
  // This effect will run once when the component mounts and whenever the visibility changes
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

    // Listen for visibility change events
    // This will trigger the refreshUser function when the tab becomes visible again
    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      controller.abort();
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshUser]);

  // Memoize the context value to prevent unnecessary re-renders
  // The value will be passed to the context provider and will be available to all components that consume this context
  const value = useMemo(
    () => ({
      user,
      loading,
      refreshUser,
    }),
    [user, loading, refreshUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// This custom hook allows components to access the user context
// It throws an error if used outside of the UserProvider
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
