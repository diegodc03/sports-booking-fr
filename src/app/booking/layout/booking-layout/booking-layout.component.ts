import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBookingComponent } from "../../components/menu-booking/menu-booking.component";


@Component({
  selector: 'app-booking-layout',
  imports: [RouterOutlet, MenuBookingComponent],
  templateUrl: './booking-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingLayoutComponent { }
