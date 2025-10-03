import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { RESTCountry } from './../../interfaces/rest-countries.interface';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryList {

  countries = input.required<Country[]>();

  errorMessage = input<string | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);


}
