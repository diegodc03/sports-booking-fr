import { Reservation } from './../interfaces/Reservation';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { BookingConstants } from './BookingConstants';
import { HttpClient } from '@angular/common/http';
import { BookingFilter } from '../interfaces/BookingFilter';
import { CityDTO } from '../interfaces/CityDTO.interface';
import { Sport } from '../interfaces/Sport.interface';
import { Facility } from '../interfaces/Facility.interface';
import { BookingDao } from '../dao/booking-dao';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  allBookings = signal<Reservation[]>([]);
  filteredBookings = signal<Reservation[]>([]);

  private citiesCache: CityDTO[] | null = null;
  private sportsCache = new Map<number, Sport[]>(); // cityId -> Sports
  private facilitiesCache = new Map<string, Facility[]>(); // "cityId-sportId" -> Facilities

  constructor(private dao: BookingDao) {
    this.loadAllReservations().subscribe(reservations => this.allBookings.set(reservations));
    console.log('BookingService initialized, loaded reservations.');
    console.log('Initial reservations:', this.allBookings());
  }

  // 🔹 Reservas
  loadAllReservations(): Observable<Reservation[]> {
    return this.dao.getAllReservations();
  }

  searchWithFilter(filter: BookingFilter): Observable<Reservation[]> {
    return this.dao.getBookingsByFilter(filter).pipe(
      tap(res => this.filteredBookings.set(res))
    );
  }

  createReservation(reservationData: any): Observable<Reservation> {
    return this.dao.createReservation(reservationData).pipe(
      tap(newRes => this.allBookings.set([...this.allBookings(), newRes]))
    );
  }

  // 🔹 Ciudades con cache
  loadAllCities(): Observable<CityDTO[]> {
    if (this.citiesCache) return of(this.citiesCache);
    return this.dao.getAllCities().pipe(
      tap(cities => this.citiesCache = cities)
    );
  }

  // 🔹 Deportes por ciudad con cache
  loadAllSportsByCity(cityId: number): Observable<Sport[]> {
    if (this.sportsCache.has(cityId)) return of(this.sportsCache.get(cityId)!);
    return this.dao.getSportsByCity(cityId).pipe(
      tap(sports => this.sportsCache.set(cityId, sports))
    );
  }

  // 🔹 Pistas por ciudad y deporte con cache
  loadAllCourtsBySport(cityId: number, sportId: number): Observable<Facility[]> {
    const key = `${cityId}-${sportId}`;
    if (this.facilitiesCache.has(key)) return of(this.facilitiesCache.get(key)!);
    return this.dao.getFacilities(cityId, sportId).pipe(
      tap(facilities => this.facilitiesCache.set(key, facilities))
    );
  }


}