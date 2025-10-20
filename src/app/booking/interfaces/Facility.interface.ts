import { CityDTO } from "./CityDTO.interface";
import { Sport } from "./Sport.interface";

export interface Facility {
  id: number;
  CityDTO: CityDTO;     // Referencia a la ciudad
  sport: Sport;   // Referencia al deporte
  name: string;
  capacity: number;
}