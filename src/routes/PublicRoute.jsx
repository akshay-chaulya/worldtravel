import { Navigate, Outlet } from "react-router-dom";
import { useCheckAuth } from "../features/auth/authHookes";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSelectors";
import { selectIsLoading } from "../features/ui/feedbackSelectors";
import { useEffect } from "react";

const PublicRoute = () => {
  // Check authentication status and manage loading state
  useCheckAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/app" />;
  }

  // Redirect if authenticated; otherwise, render the outlet
  return <Outlet />;
};

export default PublicRoute;
