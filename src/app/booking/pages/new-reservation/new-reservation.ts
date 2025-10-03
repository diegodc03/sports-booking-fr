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
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatSelectModule } from "@angular/material/select";
import { City } from '../../interfaces/City.interface';
import { Sport } from '../../interfaces/Sport.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { BookingDateTableComponent } from "../../components/booking-date-table/booking-date-table.component";
import { AccordionCourtsShow } from "../../components/accordion-courts-show/accordion-courts-show";
import { GenericButtonComponent } from "@shared/components/generic-button/generic-button.component";



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

  formReservationRegister = this.fb.group({
    date: [null, [Validators.required]], // Fecha requerida
    dateTime: [null, [Validators.required]], // Hora requerida
    city: [null, [Validators.required]], // Ciudad requerida
    typeSport: [null, [Validators.required]], // Deporte requerido
    court: [null, [Validators.required]], // Pista requerida
  });
  
  avaliableCitiesToReserve: City[] = [
    { id: 1, city_name: 'Madrid' },
    { id: 2, city_name: 'Zamora' },
    { id: 3, city_name: 'Fresno De La Ribera' },
    { id: 4, city_name: 'Sevilla' },
    { id: 5, city_name: 'Zaragoza' },
  ];

  typeOfSports: Sport[] = [
    { id: 1, sport_name: 'Fútbol', max_players: 11 },
    { id: 2, sport_name: 'Baloncesto', max_players: 5 },
    { id: 3, sport_name: 'Tenis', max_players: 2 },
    { id: 4, sport_name: 'Padel', max_players: 4 },
  ];

  courtOfSport: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4', 'Pista 5'];


  onSubmit() {
    if (this.formReservationRegister.valid) {
      const selectedDateFromForm = this.formReservationRegister.get('date')?.value || null;
      this.selectedDate.set(selectedDateFromForm); // ✅ asignamos la fecha aquí

      console.log('Datos enviados:', this.formReservationRegister.value);
      console.log('Fecha seleccionada:', this.selectedDate());
    } else {
      console.log('Formulario inválido');
      this.formReservationRegister.markAllAsTouched();
    }
  }
}
