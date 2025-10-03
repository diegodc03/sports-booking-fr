
import { Component, inject, input, resource, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";

import { CountryService } from '../../services/country.service';
import { CountryList } from '../../components/country-list/country-list';
import { firstValueFrom } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-captial-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-captial-page.component.html',
})
export class ByCaptialPageComponent {

  countryService = inject(CountryService);
  query = signal('')

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {

    if (this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null);


    this.countryService.searchByCapital(query)
      .subscribe( {
        next: ( countries ) => {
          this.isLoading.set(false);
          this.countries.set(countries);
        },
        error: ( err ) => {
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(`No se encontro ningun pais para la capital ${query}`)
        }
      })
  }
}
