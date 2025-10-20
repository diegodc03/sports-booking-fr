import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BookingDateTableComponent } from "../booking-date-table/booking-date-table.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import { Sport } from '../../interfaces/Sport.interface';
import { CityDTO } from '../../interfaces/CityDTO.interface';
import {MatButtonModule} from '@angular/material/button';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { Reservation } from '../../interfaces/Reservation';
import { BookingFilter } from '../../interfaces/BookingFilter';
import { catchError, map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-get-booking-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, BookingDateTableComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './get-booking-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GetBookingListComponent {
  
  bookingService = inject(BookingService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  selectedDate = signal<Date | null>(null);

  fb = inject(FormBuilder);

  formReservationRegister = signal<FormGroup>(
    this.fb.group({
      date: [null, [Validators.required]], // Fecha requerida
      dateTime: [null, [Validators.required]], // Hora requerida
      CityDTO: [null, [Validators.required]], // Ciudad requerida
      typeSport: [null, [Validators.required]], // Deporte requerido
      court: [null, [Validators.required]], // Pista requerida
    })
  );

  cityIdSignal = toSignal(
  this.formReservationRegister().get('CityDTO')!.valueChanges.pipe(
    map((city: CityDTO | null) => city?.cityId ?? null)
  ),
  { initialValue: null }
);



  courtOfSport: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4', 'Pista 5'];
  
  // Signal derivado con el valor del filtro
  filterSignal = computed(() => this.formReservationRegister().value as BookingFilter);


  citiesResource = rxResource<CityDTO[], void>({
    stream: () => this.bookingService.loadAllCities(),
    defaultValue: [],
  });

  // 🔹 Deportes por ciudad seleccionada
  sportsResource = rxResource<Sport[], number | null>({
  params: this.cityIdSignal,
  stream: ({ params: cityId }) => {
    if (!cityId) return of([]); // Si no hay ciudad seleccionada, devolvemos vacío
    return this.bookingService.loadAllSportsByCity(cityId).pipe(
      catchError(err => {
        console.error('Error cargando deportes:', err);
        return of([]);
      })
    );
  },
  defaultValue: [],
});


  // Recurso reactivo
  reservationsResource = rxResource<Reservation[], BookingFilter>({
      params: this.filterSignal,
      stream: ({ params }) => {
        const filter = params;
        const noFilter =
          !filter.date && !filter.CityDTO && !filter.typeSport && !filter.court;

        return noFilter
          ? this.bookingService.loadAllBookings()
          : this.bookingService.searchWithFilter(filter);
      },
      defaultValue: [], // valor por defecto
    });


}

