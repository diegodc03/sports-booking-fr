import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { BookingDateTableComponent } from "../booking-date-table/booking-date-table.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-accordion-courts-show',
  imports: [MatExpansionModule, BookingDateTableComponent, CommonModule],
  templateUrl: './accordion-courts-show.html',
  styleUrl: './accordion-courts-show.css'
})
export class AccordionCourtsShow {

  @Input({required:true}) date!: Date | null;
  
  selectedDate = signal<Date | null>(null);
  readonly panelOpenState = signal(false);


}
