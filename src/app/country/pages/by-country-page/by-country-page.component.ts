import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryList, CountrySearchInput],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {


  countryService = inject(CountryService);
  query = signal('')


  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {

    if (this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null);

    console.log({query});
    this.countryService.searchByCountry(query)
      .subscribe( {
        next: ( countries ) => {
          this.isLoading.set(false);
          console.log(countries);
          this.countries.set(countries);
        },
        error: ( err ) => {
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(`No se encontro ningun pais para el nombre ${query}`)
        }
      })
  }



}
