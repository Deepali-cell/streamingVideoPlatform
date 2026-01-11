import { useAppContext } from "@/context/StateContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isUser } = useAppContext();

  // agar already login hai → profile bhej do
  if (isUser) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
