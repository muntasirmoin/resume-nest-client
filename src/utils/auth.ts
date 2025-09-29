import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
  id: string; // user id
  name?: string;
  email?: string;
  role: string;
  exp?: number; // expiration timestamp
};

export const getToken = () => localStorage.getItem("accessToken");
export const setToken = (token: string) =>
  localStorage.setItem("accessToken", token);
export const removeToken = () => localStorage.removeItem("accessToken");

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded) return false;

  // Optional: check expiration
  if (decoded.exp && decoded.exp * 1000 < Date.now()) return false;

  return true;
};
