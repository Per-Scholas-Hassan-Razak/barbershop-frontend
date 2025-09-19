import type { CreateUser, LoginUser } from "../types";
import api from "./api";

export const registerNewUser = async(data:CreateUser) => {
    const response = await api.post("users/register", data)
    return response.data
}

export const loginExistingUser = async(data:LoginUser) => {
    const response = await api.post("users/login", data)
    return response.data
}