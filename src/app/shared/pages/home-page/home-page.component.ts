import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "@shared/components/header/header.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
