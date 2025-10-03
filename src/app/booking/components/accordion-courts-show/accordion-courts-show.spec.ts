import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionCourtsShow } from './accordion-courts-show';

describe('AccordionCourtsShow', () => {
  let component: AccordionCourtsShow;
  let fixture: ComponentFixture<AccordionCourtsShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionCourtsShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionCourtsShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
