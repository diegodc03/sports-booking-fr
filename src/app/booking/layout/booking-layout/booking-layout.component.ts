import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-booking-layout',
  imports: [RouterOutlet],
  templateUrl: './booking-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingLayoutComponent { }
