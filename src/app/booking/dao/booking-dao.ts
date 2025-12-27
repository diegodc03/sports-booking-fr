import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/Reservation';
import { BookingFilter } from '../interfaces/BookingFilter';
import { CityDTO } from '../interfaces/CityDTO.interface';
import { Sport } from '../interfaces/Sport.interface';
import { Facility } from '../interfaces/Facility.interface';
import { CreateReservation } from '../interfaces/CreateResertion';


@Injectable({
  providedIn: 'root'
})
export class BookingDao {
  private baseUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);

  // Reservas
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservation`);
  }

  getBookingsByFilter(filter: BookingFilter): Observable<Reservation[]> {
    return this.http.post<Reservation[]>(`${this.baseUrl}/bookings/filter`, filter);
  }

  createReservation(reservationData: CreateReservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservation`, reservationData);
  }

  // Ciudades, deportes y pistas
  getAllCities(): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(`${this.baseUrl}/cities`);
  }

  getSportsByCity(cityId: number): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${this.baseUrl}/sports`, {
      params: { cityId: cityId.toString() }
    });
  }

  getFacilities(cityId: number, sportId: number): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.baseUrl}/facility/courts`, {
      params: { cityId: cityId.toString(), sportId: sportId.toString() }
    });
  }
}
