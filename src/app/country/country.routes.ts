import { Routes } from "@angular/router";
import { ByCaptialPageComponent } from "./pages/by-captial-page/by-captial-page.component";
import { CountryLayoutComponent } from "./layouts/countryLayout/countryLayout.component";
import { ByRegionPageComponent } from "./pages/by-region-page/by-region-page.component";
import { ByCountryPageComponent } from "./pages/by-country-page/by-country-page.component";
import { CountryPageComponent } from "./pages/country-page/country-page.component";




export const countryRoutes: Routes = [

  {
    path: 'country',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCaptialPageComponent
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent
      },
      {
        path: 'by/:code',
        component: CountryPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'by-capital'
  }

]



export default countryRoutes;
