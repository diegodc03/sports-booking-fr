import { Reservation } from './../interfaces/Reservation';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { BookingConstants } from './BookingConstants';
import { HttpClient } from '@angular/common/http';
import { BookingFilter } from '../interfaces/BookingFilter';
import { CityDTO } from '../interfaces/CityDTO.interface';
import { Sport } from '../interfaces/Sport.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8082/api/v1/booking'; // Replace with your actual base URL
  private http = inject(HttpClient);
  allBookings = signal<Reservation[]>([]);
  filteredBookings = signal<Reservation[]>([]);

  constructor() {
    this.loadAllBookings();
  }


  private queryCacheDatePicker = new Map<Date | null, Reservation[]>();

  /*
  loadAllBookings(): void {
    this.http.get<Reservation[]>(BookingConstants.GET_ALL_BOOKINGS).subscribe((bookings) => {
      this.allBookings.set(bookings);
    });
  }*/

  loadAllBookings(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(BookingConstants.GET_ALL_BOOKINGS);
  }

  searchWithFilter(filter: BookingFilter): Observable<Reservation[]> {
    return this.http.post<Reservation[]>(BookingConstants.GET_BOOKINGS_BY_DATE, filter);
  }

  createReservation(reservationData: any): Observable<Reservation> {
    return this.http.post<Reservation>(BookingConstants.CREATE_RESERVATION, reservationData).pipe(
      tap((newReservation) => {
        // Actualiza la señal allBookings con la nueva reserva
        this.allBookings.set([...this.allBookings(), newReservation]);
      })
    );
  }

  loadAllCities(): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(`${this.baseUrl}/cities`);
  }

  loadAllSportsByCity(cityId: number): Observable<Sport[]> {
    console.log('Cargando deportes para la ciudad con ID:', cityId);
    return this.http.get<Sport[]>(`${this.baseUrl}/sports`, {
      params: { cityId: cityId.toString() }
    });
  }

  /*
  loadAllCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.baseUrl}/courts`);
  }*/

}