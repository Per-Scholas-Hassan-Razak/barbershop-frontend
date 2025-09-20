import type { CreateHaircut, CreateUser, LoginUser } from "../types";

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

export const validateLoginCredentials = (user:LoginUser): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = "Invalid email";
  }
  if (user.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateHaircut = (haircut: CreateHaircut): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!haircut.name.trim()) {
    errors.name = "Name is required";
  }

  if (isNaN(haircut.price) || haircut.price <= 0) {
    errors.price = "Price must be a positive number";
  }

  if (isNaN(haircut.duration) || haircut.duration < 5) {
    errors.duration = "Duration must be at least 5 minutes";
  }

  if (haircut.styleNotes.length > 100) {
    errors.styleNotes = "Style notes must be under 100 characters";
  }

  return errors;
};
