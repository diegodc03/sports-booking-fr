import { User } from "@auth/interfaces/user.interface";

export interface GuestUser {
  id: number;
  username: string;
  surname: string;
  telephone: string;
  user: User;       // Referencia al usuario
}