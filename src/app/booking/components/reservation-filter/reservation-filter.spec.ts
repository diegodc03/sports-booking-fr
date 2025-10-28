import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFilter } from './reservation-filter';

describe('ReservationFilter', () => {
  let component: ReservationFilter;
  let fixture: ComponentFixture<ReservationFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
