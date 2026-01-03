import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "@shared/components/header/header.component";

@Component({
  selector: 'app-results-layout',
  templateUrl: './results-layout.html',
  imports: [RouterOutlet, HeaderComponent],
  styleUrl: './results-layout.css'
})
export class ResultsLayout {

}
