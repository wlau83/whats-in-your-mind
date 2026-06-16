import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/me");
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
  const response = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.token);
  setUser(response.data.user);

  return response.data;
};

  const register = async (username, email, password) => {
    const response = await axiosInstance.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  };

  const logout = async () => {
    await axiosInstance.post("/api/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};