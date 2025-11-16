
import { Routes } from '@angular/router';
import { BookingLayoutComponent } from '../booking/layout/booking-layout/booking-layout.component';
import { BookingPageComponent } from '../booking/pages/booking-page/booking-page.component';
import { NewReservation } from '../booking/pages/new-reservation/new-reservation';
import { ResultsMenu } from './components/results-menu/results-menu';
import { ResultsLayout } from './layout/results-layout/results-layout';


export const resultsRoutes: Routes = [
  {
    path: '',
    component: BookingLayoutComponent,
    children: [
      {
        path: '',
        component: ResultsMenu,
      },
      {
        path: '**',
        redirectTo: 'reservation-list',
      },
    ],
  },
];

export default resultsRoutes;
