import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("foodhub_user") || "null"));

  const login = (data) => {
    const u = { name: data.name, email: data.email, role: data.role || "USER" };
    setUser(u);
    localStorage.setItem("foodhub_user", JSON.stringify(u));
    localStorage.setItem("foodhub_token", data.token || "");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("foodhub_user");
    localStorage.removeItem("foodhub_token");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}