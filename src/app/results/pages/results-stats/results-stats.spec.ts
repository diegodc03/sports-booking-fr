import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsStats } from './results-stats';

describe('ResultsStats', () => {
  let component: ResultsStats;
  let fixture: ComponentFixture<ResultsStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
