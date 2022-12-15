import { AUTH_TOKEN } from "./constants";
    
export const getToken = () => {
    if (typeof window !== 'undefined') return localStorage.getItem(AUTH_TOKEN);
    return null;
};

export const setToken = (token) => {
  if (token) {
    if (typeof window !== 'undefined') localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
    if (typeof window !== 'undefined') localStorage.removeItem(AUTH_TOKEN);
};

export const checkLogin = () => {
    if (getToken) return true;
    return false;
}