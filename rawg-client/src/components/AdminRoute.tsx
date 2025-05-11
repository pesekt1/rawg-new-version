import { ReactNode } from "react";
import { useAuth } from "../domains/auth/useAuth";
import { Navigate } from "react-router-dom";

/**
 * Props for the `AdminRoute` component.
 *
 * @property children - The child components to render if the user has admin privileges.
 */
interface AdminRouteProps {
  children: ReactNode;
}

/**
 * A route guard component that restricts access to admin users only.
 *
 * @param props - The props for the component.
 * @returns The child components if the user is an admin, otherwise redirects to the home page.
 */
const AdminRoute = ({ children }: AdminRouteProps) => {
  const { role } = useAuth();
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AdminRoute;
