import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { currentUser } = useSelector((state: any) => state.user);

  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

export default ProtectedRoute;
