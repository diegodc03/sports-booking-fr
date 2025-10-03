import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [

  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes')
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'reservations',
    loadChildren: () => import('./booking/booking.routes')
  },
  {
    path: 'results-stats-page',
    loadChildren: () => import('./results/results.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }


];
