import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
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
  fb = inject(FormBuilder);

  selectedDate = signal<Date | null>(null);

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

  sportIdSignal = toSignal(
    this.formReservationRegister().get('typeSport')!.valueChanges.pipe(
      map((sport: Sport | null) => sport?.id ?? null)
    ),
    { initialValue: null }
  );

  filterSignal = computed(() => this.formReservationRegister().value as BookingFilter);

  
  courtOfSport: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4', 'Pista 5'];
  

  citiesResource = rxResource<CityDTO[], void>({
    stream: () => this.bookingService.loadAllCities(),
    defaultValue: [],
  });

  sportsResource = rxResource<Sport[], number | null>({
    params: this.cityIdSignal,
    stream: ({ params: cityId }) => {
      console.log('🏙️ Ciudad seleccionada ID:', cityId);
      const id = cityId == null ? null : Number(cityId);
      if (id == null) return of([]);
      return this.bookingService.loadAllSportsByCity(id).pipe(
        catchError(err => {
          console.error('Error cargando deportes:', err);
          return of([]);
        })
      );
    },
    defaultValue: [],
  });

  fieldOfSelectedSport = rxResource<Sport | null, number | null>({
    params: this.sportIdSignal,
    stream: ({ params: sportId }) => {
      console.log('🏙️ Ciudad seleccionada ID:', sportId);
      const id = sportId == null ? null : Number(sportId);
      if (id == null) return of(null);
      return this.bookingService.loadAllSportsByCity(this.cityIdSignal()!).pipe(
        map(sports => sports.find(sport => sport.id === id) || null),
        catchError(err => {
          console.error('Error cargando deporte seleccionado:', err);
          return of(null);
        })
      );
    },
    defaultValue: null,
  });

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
    defaultValue: [],
  });

  // 🔹 Efecto para limpiar deporte al cambiar de ciudad
  constructor() {
    effect(() => {
      const cityId = this.cityIdSignal();
      if (cityId !== null) {
        console.log('🧹 Ciudad cambió, limpiando deporte seleccionado...');
        this.formReservationRegister().patchValue({ typeSport: null });
      }
    });

    effect(() => {
    console.log('🟢 cityIdSignal cambió a:', this.cityIdSignal());
  });
  }

  // 🔹 Método auxiliar para enviar o refrescar reservas manualmente (opcional)
  onSearch() {
    console.log('🔎 Filtro actual:', this.filterSignal());
    // El recurso `reservationsResource` se actualiza solo con el filtro reactivo,
    // pero este método puede servir si agregas lógica extra.
  }

}

