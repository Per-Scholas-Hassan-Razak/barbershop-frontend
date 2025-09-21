import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { AuthContext } from "../contexts/authContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load user from localStorage on first render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: User = jwtDecode(token);
    setUser(decoded);
     if (decoded.role === "barber") {
    navigate("/barber/dashboard");
  } else {
    navigate("/customer/dashboard"); 
  }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
