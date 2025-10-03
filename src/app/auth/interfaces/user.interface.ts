import { Role } from "./role.interface";

export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  role: Role;       // Referencia al rol
  created_at: string;
}