import { RESTCountry } from './../interfaces/rest-countries.interface';
import { Country } from "../interfaces/country.interface";

export class CountryMapper {


  static mapRestCountryToCountry( restCountry: RESTCountry): Country {

    return {
      capital: restCountry.capital?.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'no',
      population: restCountry.population
    }
  }



  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]) : Country[]{
    return restCountries.map( this.mapRestCountryToCountry );
    //return restCountries.map( (country) => this.mapRestCountryToCountry(country) );
  }




}
