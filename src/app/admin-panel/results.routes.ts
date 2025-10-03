
import { Routes } from '@angular/router';
import { BookingLayoutComponent } from '../booking/layout/booking-layout/booking-layout.component';
import { BookingPageComponent } from '../booking/pages/booking-page/booking-page.component';
import { NewReservation } from '../booking/pages/new-reservation/new-reservation';


export const adminPanel: Routes = [
  {
    path: '',
    component: BookingLayoutComponent,
    children: [
      {
        path: 'reservation-list',
        component: BookingPageComponent,
      },
      {
        path: 'add-reservation',
        component: NewReservation,
      },
      {
        path: '**',
        redirectTo: 'reservation-list',
      },
    ],
  },
];

export default adminPanel;
