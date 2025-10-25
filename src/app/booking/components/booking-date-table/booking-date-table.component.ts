import { ChangeDetectionStrategy, Component, effect, inject, Input } from '@angular/core';
import { Reservation } from '../../interfaces/Reservation';
import {MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BookingService } from '../../services/booking.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, timer } from 'rxjs';


@Component({
  selector: 'app-booking-date-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './booking-date-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDateTableComponent {

  bookingService = inject(BookingService);
  displayedColumns: string[] = ['facility', 'city', 'sport', 'date', 'hour', 'status'];
  dataSource = new MatTableDataSource<Reservation>();

    // ⏱️ Recurso que se actualiza automáticamente cada 2 minutos
  bookingsResource = rxResource<Reservation[], void>({
    stream: () =>
      timer(0, 2 * 60 * 1000).pipe( // cada 2 minutos
        switchMap(() =>
          this.bookingService.loadAllReservations().pipe(
            catchError((err) => {
              console.error('Error al cargar reservas:', err);
              return of([]); // Devuelve lista vacía en caso de error
            })
          )
        )
      ),
    defaultValue: [],
  });

  constructor() {
    effect(() => {
      this.dataSource.data = this.bookingsResource.value();
      console.log('📘 Datos cargados:', this.dataSource.data);
    });
  }


}
