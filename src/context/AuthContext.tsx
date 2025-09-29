// src/context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getToken,
  setToken as setLocalToken,
  removeToken as removeLocalToken,
} from "@/utils/auth";

interface AuthContextType {
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getToken());
  }, []);

  const login = (token: string) => {
    setLocalToken(token);
    setLoggedIn(true);
  };

  const logout = () => {
    removeLocalToken();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
