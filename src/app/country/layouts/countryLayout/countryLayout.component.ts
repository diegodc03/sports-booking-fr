import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryTopMenuComponent } from "../../components/country-top-menu/country-top-menu.component";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, CountryTopMenuComponent],
  templateUrl: './countryLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryLayoutComponent { }
