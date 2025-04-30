import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    //console.log(storedToken);
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setToken("");
        } else {
          setToken(storedToken);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setToken("");
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axiosInstance.get("/user/profile");
        setUserName(res.data.name);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        localStorage.removeItem("token");
        setToken("");
      }
    };
    fetchUser();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, setToken, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
