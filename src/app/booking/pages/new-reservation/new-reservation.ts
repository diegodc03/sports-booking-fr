import {Component, inject, Output, signal} from '@angular/core';
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
    { id: 1, sportName: 'Fútbol', maxPlayers: 11 },
    { id: 2, sportName: 'Baloncesto', maxPlayers: 5 },
    { id: 3, sportName: 'Tenis', maxPlayers: 2 },
    { id: 4, sportName: 'Padel', maxPlayers: 4 },
  ];

  courtOfSport: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4', 'Pista 5'];


  onSubmit() {
    if (this.formReservationRegister().valid) {
      const selectedDateFromForm = this.formReservationRegister().get('date')?.value || null;
      this.selectedDate.set(selectedDateFromForm);

      this.bookingService.createReservation(this.formReservationRegister().value).subscribe({
        next: response => {
          console.log('Reserva creada:', response);
        },
        error: err => {
          console.error('Error al crear la reserva:', err);
        }
      });

      console.log('Datos enviados:', this.formReservationRegister().value);
      console.log('Fecha seleccionada:', this.selectedDate());
    } else {
      console.log('Formulario inválido');
      this.formReservationRegister().markAllAsTouched();
    }
  }
}
