import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "@shared/components/header/header.component";
import { FooterComponent } from "@shared/components/footer/footer.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
