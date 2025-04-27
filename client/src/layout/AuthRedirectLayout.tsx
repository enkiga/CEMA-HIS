import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const AuthRedirectLayout = () => {
  const { user, loading } = useUser();

  // Check if the user is authenticated and not loading
  if (loading) {
    return <LoadingSpinner/>; // Show a loading state while checking authentication
  }

  if (user) {
    return <Navigate to="/" replace />; // Redirect to dashboard if authenticated
  }

  // Render the login and register routes if not authenticated
  return <Outlet />;
};

export default AuthRedirectLayout;
