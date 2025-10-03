import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BookingDateTableComponent } from "../booking-date-table/booking-date-table.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import { Sport } from '../../interfaces/Sport.interface';
import { City } from '../../interfaces/City.interface';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-get-booking-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, BookingDateTableComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './get-booking-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GetBookingListComponent {

  selectedDate = signal<Date | null>(null);

  fb = inject(FormBuilder);

  formReservationRegister = this.fb.group({
    date: [null, [Validators.required]], // Fecha requerida
    dateTime: [null, [Validators.required]], // Hora requerida
    city: [null, [Validators.required]], // Ciudad requerida
    typeSport: [null, [Validators.required]], // Deporte requerido
    court: [null, [Validators.required]], // Pista requerida
  });

  states: City[] = [
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
  

}

