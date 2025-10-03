import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-booking',
  imports: [RouterLink],
  templateUrl: './menu-booking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBookingComponent { }
