import { Reservation } from './../interfaces/Reservation';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  private queryCacheDatePicker = new Map<Date, Reservation[]>();


  searchBookingsByDate(datePicked: Date): Observable<Reservation[]> {


    if (this.queryCacheDatePicker.has(datePicked)){
      return of(this.queryCacheDatePicker.get(datePicked) ?? []);
    }

    return of(this.queryCacheDatePicker.get(datePicked) ?? []);


  }









}
