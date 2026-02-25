import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : { token: null };
  });

  function login(data) {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  }

  function logout() {
    setAuth({
      token: null,
    });
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
