import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsLayout } from './results-layout';

describe('ResultsLayout', () => {
  let component: ResultsLayout;
  let fixture: ComponentFixture<ResultsLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
