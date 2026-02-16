import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  // restore from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  function login(data) {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  }

  function logout() {
    setAuth({
      user: null,
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
