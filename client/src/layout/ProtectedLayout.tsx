import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";

const ProtectedLayout = () => {
  const { user, loading } = useUser();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!loading && !user && isAuthenticated) {
      // If we think we're authenticated but no user data, clear invalid auth
      localStorage.removeItem("isAuthenticated");
    }
    setCheckedAuth(true);
  }, [loading, user, isAuthenticated]);

  if (!checkedAuth || loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
