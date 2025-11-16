import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "@shared/components/header/header.component";


@Component({
  selector: 'app-booking-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './booking-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingLayoutComponent { }
