import { ReactNode } from "react";
import { useAuth } from "../domains/auth/useAuth";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { role } = useAuth();
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AdminRoute;
