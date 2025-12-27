import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationData } from '../interfaces/ReservationResult';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private apiUrl = 'http://localhost:8080/api/v1/results';

  http = inject(HttpClient);

  getReservationResults(): Observable<ReservationData[]> {
    return this.http.get<ReservationData[]>(this.apiUrl + '/all');
  }

  addNewResult(result: ReservationData): Observable<ReservationData> {
    return this.http.post<ReservationData>(this.apiUrl + '/add', result);
  }


}
