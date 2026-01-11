import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "@/context/StateContext";

const EditorProtectedRoute = () => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "editor") {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default EditorProtectedRoute;
