
import { Routes } from '@angular/router';
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
