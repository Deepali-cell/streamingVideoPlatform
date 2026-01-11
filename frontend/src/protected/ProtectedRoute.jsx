import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "@/context/StateContext";

const ProtectedRoute = () => {
  const { user, loadingUser } = useAppContext();

  if (loadingUser) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
