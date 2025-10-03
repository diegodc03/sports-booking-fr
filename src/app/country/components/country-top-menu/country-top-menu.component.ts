import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';


@Component({
  selector: 'app-country-top-menu',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './country-top-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryTopMenuComponent { }
