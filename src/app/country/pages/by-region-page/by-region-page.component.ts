import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';


export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';







@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {


  countryService = inject(CountryService);
  query = signal('')

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);
  selectedRegion = signal<Region | null>(null)

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];



  onClick(regionValue: Region) {

    console.log(regionValue);

    if (this.isLoading() ) return;




    this.isLoading.set(true);
    this.isError.set(null);


    this.countryService.searchByRegion(regionValue)
      .subscribe( {
        next: ( countries ) => {
          console.log(countries);
          this.isLoading.set(false);
          this.countries.set(countries);
        },
        error: ( err ) => {
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(`No se encontro ningun pais para la región ${regionValue}`)
        }
      })
  }







}
