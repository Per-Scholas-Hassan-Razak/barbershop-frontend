import type { CreateUser } from "../types";
import api from "./api";

export const registerNewUser = async(data:CreateUser) => {
    const response = await api.post("/users/register", data)
    return response.data
}