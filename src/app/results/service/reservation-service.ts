import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationData } from '../interfaces/ReservationResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private readonly baseUrl: string = environment.baseUrl + '/results';

  http = inject(HttpClient);

  getReservationResults(): Observable<ReservationData[]> {
    return this.http.get<ReservationData[]>(this.baseUrl + '/all');
  }

  addNewResult(result: ReservationData): Observable<ReservationData> {
    return this.http.post<ReservationData>(this.baseUrl + '/add', result);
  }


}
