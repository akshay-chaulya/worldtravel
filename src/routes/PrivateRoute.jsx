import { Navigate, Outlet } from "react-router-dom";
import { useCheckAuth } from "../features/auth/authHookes";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSelectors";
import { selectIsLoading } from "../features/ui/feedbackSelectors";
import { useEffect } from "react";

const PrivateRoute = () => {
  useCheckAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected routes
  return <Outlet />;
};

export default PrivateRoute;
