export interface User {
  sub: string;
  role: string;
}

export interface AuthContextProps {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface CreateUser{
  username:string, 
  email:string,
  password:string,
  role?:"customer" | "barber"
}