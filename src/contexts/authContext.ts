import { createContext, useContext } from "react";
import type { AuthContextProps } from "../types";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

