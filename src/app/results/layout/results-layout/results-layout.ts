import { Component } from '@angular/core';
import { ResultsMenu } from "../../components/results-menu/results-menu";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-results-layout',
  templateUrl: './results-layout.html',
  imports: [ResultsMenu, RouterOutlet],
  styleUrl: './results-layout.css'
})
export class ResultsLayout {

}
