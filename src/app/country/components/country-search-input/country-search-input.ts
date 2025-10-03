import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
  styleUrl: './country-search-input.css'
})
export class CountrySearchInput {
  placeholder = input('Buscar');
  debounceTime = input<number>(500);
  searchValue = output<string>();


  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  })

}
