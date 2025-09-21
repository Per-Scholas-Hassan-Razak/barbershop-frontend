export interface User {
  sub: string;
  role: string;
}

export interface AuthContextProps {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
  role: "customer" | "barber";
}
export interface LoginUser {
  email: string;
  password: string;
}

export interface HaircutTemplateDocument {
  _id: string;
  name: string;
  description?: string;
  baseCost: number;
  baseDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHaircut {
  haircutTemplate: string;
  name: string;
  price: number;
  duration: number;
  styleNotes: string;
}

export interface CustomizeHaircutProps {
  open: boolean;
  onClose: () => void;
  template?: HaircutTemplateDocument | null;
  cut?: BarberHaircut | null; 
  mode: "create" | "edit";
}

export interface HaircutTemplateSummary {
  _id: string;
  name: string;
  description?: string;
  baseCost: number;
  baseDuration: number;
}

export interface BarberHaircut {
  _id: string;
  barber: string;
  haircutTemplate: HaircutTemplateSummary;
  customPrice?: number;
  customDuration?: number;
  styleNotes?: string;
  createdAt: string;
  updatedAt: string;
}
