import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  CalendarView,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarDatePipe,
} from 'angular-calendar';

@Component({
  selector: 'calendar-header',
  templateUrl: 'calendar-header.html',
  imports: [
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    CalendarDatePipe,
  ],
})
export class CalendarHeaderComponent {
  @Input({ required: true }) view!: CalendarView;

  @Input({ required: true }) viewDate!: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
