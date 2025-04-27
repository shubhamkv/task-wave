import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get("/user/profile");
      console.log(res.data);
      setUserName(res.data.name);
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    if (storedToken) {
      setToken(storedToken);
      //   axiosInstance.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${storedToken}`;
    }
    //console.log(user);
    setIsLoading(false);
  }, []);

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
