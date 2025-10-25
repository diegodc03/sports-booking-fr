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
import { Facility } from '../../interfaces/Facility.interface';


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

  filterSignal = computed(() => this.formReservationRegister().value as BookingFilter);

  cityIdSignal = toSignal(
    this.formReservationRegister().get('CityDTO')!.valueChanges.pipe(
      map((city: CityDTO | null) => city?.cityId ?? null)
    ),
    { initialValue: null }
  );

  sportIdSignal = toSignal(
    this.formReservationRegister().get('typeSport')!.valueChanges.pipe(
      map((sport: Sport | null) => sport?.sportId ?? null)
    ),
    { initialValue: null }
  );

  sportAndCitySignal = computed(() => {
    const sportId = this.sportIdSignal();
    const cityId = this.cityIdSignal();
    return sportId != null && cityId != null ? { sportId, cityId } : null;
  });
  
  citiesResource = rxResource<CityDTO[], void>({
    stream: () => this.bookingService.loadAllCities(),
    defaultValue: [],
  });

  sportsResource = rxResource<Sport[], number | null>({
    params: this.cityIdSignal,
    stream: ({ params: cityId }) => {
      if (!cityId) return of([]);
      return this.bookingService.loadAllSportsByCity(cityId);
    },
    defaultValue: [],
  });


  fieldOfSelectedSport = rxResource<Facility[], { sportId: number; cityId: number } | null>({
    params: this.sportAndCitySignal,
    stream: ({ params }) => {
      if (!params) return of([]);
      return this.bookingService.loadAllCourtsBySport(params.cityId, params.sportId);
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



  onSubmit() {
    const filter: BookingFilter = this.formReservationRegister().value as BookingFilter;

    this.bookingService.searchWithFilter(filter).subscribe({
      next: (reservations) => {
        console.log('Reservas filtradas:', reservations);
        // Aquí ya puedes actualizar señales o estados locales si quieres
      },
      error: (err) => {
        console.error('Error buscando reservas:', err);
      }
    });
  }

}

