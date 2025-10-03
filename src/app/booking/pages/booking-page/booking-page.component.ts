import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GetBookingListComponent } from "../../components/get-booking-list/get-booking-list.component";

@Component({
  selector: 'app-booking-page',
  imports: [GetBookingListComponent],
  templateUrl: './booking-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPageComponent {






}
