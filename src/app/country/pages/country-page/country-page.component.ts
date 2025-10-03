import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import {toSignal} from  '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code');
  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  country = signal<Country>({
    cca2: '',
    flag: '',
    flagSvg: '',
    name: '',
    capital: '',
    population: 0,
  });
  async ngOnInit() {
    if (!this.countryCode) {
      this.isError.set('No se proporcionó un código de país.');
      return;
    }



    this.isLoading.set(true);
    this.isError.set(null);


    this.countryService.searchCountryByAlphaCode(this.countryCode)
      .subscribe( {
      next: ( country ) => {
        this.isLoading.set(false);

        if (country) {
          this.country.set(country);
        } else {
          this.isError.set(`No se encontró ningún país para el código ${this.countryCode}`);
        }

      },
      error: ( err ) => {
        this.isLoading.set(false);
        this.isError.set(`No se encontro ningun pais para el nombre ${this.countryCode}`)
      }
    })
  }



}
