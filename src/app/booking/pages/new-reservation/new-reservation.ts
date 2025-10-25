import {Component, computed, effect, inject, Output, signal} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,   
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,  
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatSelectModule } from "@angular/material/select";
import { CityDTO } from '../../interfaces/CityDTO.interface';
import { Sport } from '../../interfaces/Sport.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { BookingDateTableComponent } from "../../components/booking-date-table/booking-date-table.component";
import { AccordionCourtsShow } from "../../components/accordion-courts-show/accordion-courts-show";
import { GenericButtonComponent } from "@shared/components/generic-button/generic-button.component";
import { BookingService } from '../../services/booking.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Facility } from '../../interfaces/Facility.interface';
import { map, of } from 'rxjs';
import { BookingFilter } from '../../interfaces/BookingFilter';
import { CreateReservation } from '../../interfaces/CreateResertion';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-reservation',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatTimepickerModule, MatSelectModule, AccordionCourtsShow, GenericButtonComponent],
  templateUrl: './new-reservation.html',
  styleUrl: './new-reservation.css',
  providers: [provideNativeDateAdapter()]
})


export class NewReservation {

  @Output() selectedDate = signal<Date | null>(null);

  fb = inject(FormBuilder);
  bookingService = inject(BookingService);

  formReservationRegister = signal<FormGroup>( 
    this.fb.group({
      date: [null, [Validators.required]], // Fecha requerida
      dateTime: [null, [Validators.required]], // Hora requerida
      CityDTO: [null, [Validators.required]], // Ciudad requerida
      typeSport: [null, [Validators.required]], // Deporte requerido
      court: [null, [Validators.required]], // Pista requerida
  }));
  
  avaliableCitiesToReserve: CityDTO[] = [
    { cityId: 1, cityName: 'Madrid' },
    { cityId: 2, cityName: 'Zamora' },
    { cityId: 3, cityName: 'Fresno De La Ribera' },
    { cityId: 4, cityName: 'Sevilla' },
    { cityId: 5, cityName: 'Zaragoza' },
  ];

  typeOfSports: Sport[] = [
    { sportId: 1, sportName: 'Fútbol', maxPlayers: 11 },
    { sportId: 2, sportName: 'Baloncesto', maxPlayers: 5 },
    { sportId: 3, sportName: 'Tenis', maxPlayers: 2 },
    { sportId: 4, sportName: 'Padel', maxPlayers: 4 },
  ];

  courtOfSport: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4', 'Pista 5'];


  
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
    if (this.formReservationRegister().valid) {
      const formValue = this.formReservationRegister().value;
      
      const dateObj = new Date(formValue.date);
      const timeObj = new Date(formValue.dateTime);
      // Extraemos solo lo que necesitamos para crear la reserva
      const dto = {
        facilityId: formValue.court.facilityId,
        date: dateObj.toISOString().split('T')[0],         // "2025-10-26"
        hour: timeObj.toISOString().split('T')[1].slice(0, 8) // "23:00:00"
    };

      // Llamada al service
      this.bookingService.createReservation(dto).subscribe({
        next: (response) => {
          console.log('Reserva creada:', response);
        },
        error: (err) => {
          console.error('Error al crear la reserva:', err);
        }
      });

    } else {
      console.log('Formulario inválido');
      this.formReservationRegister().markAllAsTouched();
    }
  }

}
