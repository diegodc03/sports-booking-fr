import {Component, computed, effect, inject, Output, signal} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,   
  NgForm,
  FormsModule,
  ReactiveFormsModule,  

} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatSelectModule } from "@angular/material/select";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { GenericButtonComponent } from "@shared/components/generic-button/generic-button.component";
import { BookingService } from '../../services/booking.service';
import { BookingFilter } from '../../interfaces/BookingFilter';
import { ReservationFilter } from "../../components/reservation-filter/reservation-filter";
import { QuestUsersForm } from "../../components/quest-users-form/quest-users-form";
import { NewReservationDTO } from '../../interfaces/NewReservationDTO';
import { CommonModule } from '@angular/common';




/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-reservation',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatTimepickerModule, MatSelectModule, GenericButtonComponent, ReservationFilter, QuestUsersForm],
  templateUrl: './new-reservation.html',
  styleUrl: './new-reservation.css',
  providers: [provideNativeDateAdapter()]
})


export class NewReservation {

  bookingService = inject(BookingService);
  lastCreatedReservation = signal<NewReservation | null>(null);
  selectedFilter = signal<BookingFilter | null>(null);

  onFilterReceived(filter: BookingFilter) {
    this.selectedFilter.set(filter);
  }

  onReservationSubmit(dto: NewReservationDTO) {
    console.log('🟢 Creando reserva con:', dto);
    this.bookingService.createReservation(dto).subscribe({
      next: (response) => console.log('✅ Reserva creada:', response),
      error: (err) => console.error('❌ Error al crear reserva:', err),
    });
  }

}
