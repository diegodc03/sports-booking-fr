import { Reservation } from './../interfaces/Reservation';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { BookingConstants } from './BookingConstants';
import { HttpClient } from '@angular/common/http';
import { BookingFilter } from '../interfaces/BookingFilter';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }


  private queryCacheDatePicker = new Map<Date | null, Reservation[]>();


  searchAllBookings(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(BookingConstants.GET_ALL_BOOKINGS).pipe(
      tap({
        next: reservations => {
          console.log(reservations);
          this.queryCacheDatePicker.set(null, reservations);
        },
        error: err => console.error('Error en tap:', err)
      })
    );
  }

  searchAllBookings1(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(BookingConstants.GET_ALL_BOOKINGS);
  }

  searchWithFilter(filter: BookingFilter): Observable<Reservation[]> {
    return this.http.post<Reservation[]>(BookingConstants.GET_BOOKINGS_BY_DATE, filter);
  }
}


