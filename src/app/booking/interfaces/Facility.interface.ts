import { CityDTO } from "./CityDTO.interface";
import { Sport } from "./Sport.interface";

export interface Facility {
  facilityId: number;
  CityDTO: CityDTO;     // Referencia a la ciudad
  sport: Sport;   // Referencia al deporte
  facilityName: string;
}