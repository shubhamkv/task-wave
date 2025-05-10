import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Spinner } from "./Spinner";

export const PublicRoute = ({ children }) => {
  const { token, isAuthReady } = useAuthContext();

  if (!isAuthReady) return <Spinner />;

  if (token) return <Navigate to="/dashboard" replace />;
  return children;
};
