import { Component, computed, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { CityDTO } from '../../interfaces/CityDTO.interface';
import { Sport } from '../../interfaces/Sport.interface';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { Facility } from '../../interfaces/Facility.interface';
import { BookingFilter } from '../../interfaces/BookingFilter';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatTimepickerModule } from "@angular/material/timepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccordionCourtsShow } from '../accordion-courts-show/accordion-courts-show';
import { GenericButtonComponent } from '@shared/components/generic-button/generic-button.component';

@Component({
  selector: 'app-reservation-filter',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatTimepickerModule, MatSelectModule, AccordionCourtsShow, GenericButtonComponent],
  templateUrl: './reservation-filter.html',
  styleUrl: './reservation-filter.css',
  providers: [provideNativeDateAdapter()]
})
export class ReservationFilter {
  
  @Output() filterSelected = new EventEmitter<BookingFilter>();
  @Output() filterChanged = new EventEmitter<BookingFilter>();
  @Output() selectedDate = new EventEmitter<Date | null>();


  fb = inject(FormBuilder);
  bookingService = inject(BookingService);

  formReservationFilter = signal<FormGroup>( 
    this.fb.group({
      date: [null, [Validators.required]], // Fecha requerida
      dateTime: [null, [Validators.required]], // Hora requerida
      CityDTO: [null, [Validators.required]], // Ciudad requerida
      typeSport: [null, [Validators.required]], // Deporte requerido
      court: [null, [Validators.required]], // Pista requerida
  }));
  
  
  filterSignal = computed(() => this.formReservationFilter().value as BookingFilter);

  cityIdSignal = toSignal(
    this.formReservationFilter().get('CityDTO')!.valueChanges.pipe(
      map((city: CityDTO | null) => city?.cityId ?? null)
    ),
    { initialValue: null }
  );

  sportIdSignal = toSignal(
    this.formReservationFilter().get('typeSport')!.valueChanges.pipe(
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
        this.formReservationFilter().patchValue({ typeSport: null });
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
    if (this.formReservationFilter().valid) {
      const formValue = this.formReservationFilter().value;
      const dateObj = new Date(formValue.date);
      const timeObj = new Date(formValue.dateTime);

      const dto: BookingFilter = {
        facilityId: formValue.court.facilityId,
        date: dateObj.toISOString().split('T')[0],
        dateTime: timeObj.toISOString().split('T')[1].slice(0, 8)
      };

      // Emitir con el nombre esperado por el padre
      this.filterSelected.emit(dto);

    } else {
      this.formReservationFilter().markAllAsTouched();
    }
  }

}

