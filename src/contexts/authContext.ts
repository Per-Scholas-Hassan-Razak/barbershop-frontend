import { createContext, useContext } from "react";
import type { AuthContextProps } from "../types";

const authContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

