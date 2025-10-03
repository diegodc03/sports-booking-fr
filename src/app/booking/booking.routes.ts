
import { Routes } from '@angular/router';
import { BookingLayoutComponent } from './layout/booking-layout/booking-layout.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { NewReservation } from './pages/new-reservation/new-reservation';
import { Calendar } from './components/calendar/calendar';

export const bookingRoutes: Routes = [
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
        path: 'view-calendar',
        component: Calendar
      },
      {
        path: '**',
        redirectTo: 'reservation-list',
      },
    ],
  },
];

export default bookingRoutes;
