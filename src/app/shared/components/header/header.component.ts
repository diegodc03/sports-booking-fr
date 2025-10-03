import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  router = inject(Router);

  navigateToNewReservation() {
    this.router.navigateByUrl("/reservations/add-reservation");
  }
  navigateToReservationList() {
    this.router.navigateByUrl("/reservations/reservation-list");
  }
  navigateToCalendar() {
    this.router.navigateByUrl("/reservations/add-reservation");
  }



}
