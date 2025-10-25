import { UserDto } from "@auth/interfaces/userDto.interface";
import { Facility } from "./Facility.interface";
import { GuestUser } from "./QuestUser";
import { Match } from "date-fns";
import { MatchResult } from "src/app/results/interfaces/MatchResult";


export interface Reservation {
  id: number;
  facility: Facility;  // Referencia a la instalación
  user?: UserDto;          // Referencia al usuario
  guest_users?: GuestUser[];
  date: string;
  hour: string;
  status: string;
  matchResult?: MatchResult;
}