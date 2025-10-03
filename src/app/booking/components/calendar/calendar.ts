import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClient } from '@angular/common/http';
import { startOfYear, subYears } from 'date-fns';
import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';

// get your own key from https://holidayapi.com/
const HOLIDAY_API_KEY = 'REPLACE_WITH_YOUR_OWN_TOKEN';

// change this to your own country
const COUNTRY_CODE = 'ES';

interface Holiday {
  date: string;
  name: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'holiday'; holiday: Holiday } | { type: 'normal' }
>;

@Component({
  selector: 'calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.html',
  imports: [
    CalendarHeaderComponent,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class Calendar implements OnInit {
  
  view: CalendarView = CalendarView.Month;
  viewDate = startOfYear(subYears(new Date(), 1));
  events: CalendarEventWithMeta[] = [];
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.fetchHolidays();
  }

  private fetchHolidays() {
    this.http
      .get<{ holidays: Holiday[] }>('https://holidayapi.com/v1/holidays', {
        params: {
          country: COUNTRY_CODE,
          year: String(new Date().getFullYear() - 1),
          key: HOLIDAY_API_KEY,
        },
      })
      .subscribe(({ holidays }) => {
        this.events = holidays.map((holiday) => {
          return {
            start: new Date(holiday.date),
            title: holiday.name,
            allDay: true,
            meta: {
              type: 'holiday',
              holiday,
            },
          };
        });
        this.cdr.markForCheck();
      });
  }
}
