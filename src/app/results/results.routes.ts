
import { Routes } from '@angular/router';
import { BookingLayoutComponent } from '../booking/layout/booking-layout/booking-layout.component';
import { BookingPageComponent } from '../booking/pages/booking-page/booking-page.component';
import { NewReservation } from '../booking/pages/new-reservation/new-reservation';
import { ResultsMenu } from './components/results-menu/results-menu';
import { ResultsLayout } from './layout/results-layout/results-layout';
import { ResultsList } from './pages/results-list/results-list';


export const resultsRoutes: Routes = [
  {
    path: '',
    component: ResultsLayout,
    children: [
      {
        path: '',
        component: ResultsList,
      },
      {
        path: 'results-list',
        component: ResultsLayout,
      },
      {
        path: 'results-stats',
        component: ResultsLayout,
      },
      {
        path: '**',
        redirectTo: 'results-list',
      },
    ],
  },
];

export default resultsRoutes;
