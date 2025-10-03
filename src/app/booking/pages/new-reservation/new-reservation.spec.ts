import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservation } from './new-reservation';

describe('NewReservation', () => {
  let component: NewReservation;
  let fixture: ComponentFixture<NewReservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewReservation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReservation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
