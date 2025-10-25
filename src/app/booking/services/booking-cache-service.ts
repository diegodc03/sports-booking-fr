import { Injectable } from '@angular/core';
import { BookingService } from './booking.service';
import { Facility } from '../interfaces/Facility.interface';
import { CityDTO } from '../interfaces/CityDTO.interface';
import { Sport } from '../interfaces/Sport.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingCacheService {
  
  private citiesMap = new Map<number, CityDTO>();
  private sportsMap = new Map<number, Sport[]>();
  private facilitiesMap = new Map<string, Facility[]>(); // key: cityId-sportId

  constructor(private bookingService: BookingService) {}

  getCities() {
    if (this.citiesMap.size > 0) return of(Array.from(this.citiesMap.values()));
    return this.bookingService.loadAllCities().pipe(
      tap(cities => cities.forEach(c => this.citiesMap.set(c.cityId, c)))
    );
  }

  getSportsByCity(cityId: number) {
    if (this.sportsMap.has(cityId)) return of(this.sportsMap.get(cityId)!);
    return this.bookingService.loadAllSportsByCity(cityId).pipe(
      tap(sports => this.sportsMap.set(cityId, sports))
    );
  }

  getFacilities(cityId: number, sportId: number) {
    const key = `${cityId}-${sportId}`;
    if (this.facilitiesMap.has(key)) return of(this.facilitiesMap.get(key)!);
    return this.bookingService.loadAllCourtsBySport(sportId, cityId).pipe(
      tap(facilities => this.facilitiesMap.set(key, facilities))
    );
  }


}
