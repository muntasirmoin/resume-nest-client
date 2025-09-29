import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("accessToken");
export const setToken = (token: string) =>
  localStorage.setItem("accessToken", token);
export const removeToken = () => localStorage.removeItem("accessToken");

export const decodeToken = (token: string) => {
  try {
    return jwtDecode<{ userId: string; role: string }>(token);
  } catch {
    return null;
  }
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  const decoded = decodeToken(token);
  return decoded ? true : false;
};
