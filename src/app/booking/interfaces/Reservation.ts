import { User } from "@auth/interfaces/user.interface";
import { Facility } from "./Facility.interface";
import { GuestUser } from "./QuestUser";


export interface Reservation {
  id: number;
  facility: Facility;  // Referencia a la instalación
  user: User;          // Referencia al usuario
  guest_users?: GuestUser[];
  date: string;
  hour: string;
  status: string;
}