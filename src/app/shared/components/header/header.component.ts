import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  
  private authService = inject(AuthService);
  router = inject(Router);

  public authStatus = this.authService.authStatus;
  public user = this.authService.user;

  // Exponemos la función de logout
  public logout = () => this.authService.logout();

  navigateToNewReservation() {
    this.router.navigateByUrl("/reservations/add-reservation");
  }
  navigateToReservationList() {
    this.router.navigateByUrl("/reservations/reservation-list");
  }
  navigateToCalendar() {
    this.router.navigateByUrl("/reservations/add-reservation");
  }

  navigateToResultsList() {
    this.router.navigateByUrl("/reservations/reservation-list");
  }

  navigateToStats() {
    this.router.navigateByUrl("/results/results-list");
  }


}
