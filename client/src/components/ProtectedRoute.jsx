import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext();
  // console.log(token);
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" replace />;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/signin" replace />;
  }
  return children;
};
