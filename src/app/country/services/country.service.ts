import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>() // {}
  private queryCacheCountry = new Map<string, Country[]>() // {}
  private queryCacheRegion = new Map<string, Country[]>() // {}


  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map( (restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          console.log("Error fetching", error);
          return throwError(
            () => new Error(`"No se pudo obtener paises con el query: ${query}`)
          );
        })
      );
  }


  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map( (restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        catchError((error) => {
          console.log("Error fetching", error);
          return throwError(
            () => new Error(`"No se pudo obtener paises con el query: ${query}`)
          );
        })
      );
  }


  searchByRegion( region: string ): Observable<Country[]> {
    region = region.toLowerCase();

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map( (restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError((error) => {
          console.log("Error fetching", error);
          return throwError(
            () => new Error(`"Ha habido un fallo al hacer fetch de los paises de una region: ${region}`)
          );
        })
      );
  }





  searchCountryByAlphaCode( code: string ) : Observable<Country> {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map( (restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        map( countries => {
          if (countries.length === 0) {
            throw new Error(`No se encontró ningún país para el código: ${code}`);
          }
          return countries[0];
        }),
        catchError((error) => {
          console.log("Error fetching", error);
          return throwError(
            () => new Error(`"No se pudo obtener el pais a partir del codigo: ${code}`)
          );
        })
      );
  }




}
