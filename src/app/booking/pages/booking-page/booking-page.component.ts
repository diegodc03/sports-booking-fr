import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetBookingListComponent } from "../../components/get-booking-list/get-booking-list.component";
import { Sport } from '../../interfaces/Sport.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { BookingService } from '../../services/booking.service';
import { CityDTO } from '../../interfaces/CityDTO.interface';
import { BookingDateTableComponent } from "../../components/booking-date-table/booking-date-table.component";


@Component({
  selector: 'app-booking-page',
  imports: [GetBookingListComponent, BookingDateTableComponent],
  templateUrl: './booking-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPageComponent {

  private bookingService = inject(BookingService);


}
