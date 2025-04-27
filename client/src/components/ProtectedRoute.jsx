import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext();
  // console.log(token);
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};
