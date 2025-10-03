import { City } from "./City.interface";
import { Sport } from "./Sport.interface";

export interface Facility {
  id: number;
  city: City;     // Referencia a la ciudad
  sport: Sport;   // Referencia al deporte
  name: string;
  capacity: number;
}