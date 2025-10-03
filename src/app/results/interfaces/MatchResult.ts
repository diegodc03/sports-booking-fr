import { Reservation } from "src/app/booking/interfaces/Reservation";
import { TypeMatch } from "./TypeMatch";
import { Sport } from "src/app/booking/interfaces/Sport.interface";

export interface MatchResult {
  id: number;
  reservation: Reservation; // Referencia a la reserva
  sport: Sport;             // Referencia al deporte
  result_json: any;
}