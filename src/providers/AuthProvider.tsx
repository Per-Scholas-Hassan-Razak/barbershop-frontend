import { useEffect, useState, type ReactNode} from "react"
import type { User } from "../types"
import { AuthContext } from "../contexts/authContext"
import { jwtDecode } from 'jwt-decode'

const AuthProvider = ({ children }: { children: ReactNode }) => {
 const [user, setUser] = useState<User | null>(null);

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
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}



export default AuthProvider