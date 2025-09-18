import type { CreateUser } from "../types";

export const validateUser = (user: CreateUser): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!user.username.trim()) {
    errors.username = "Username is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = "Invalid email";
  }
  if (user.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};