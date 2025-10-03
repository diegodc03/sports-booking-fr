import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMenu } from './results-menu';

describe('ResultsMenu', () => {
  let component: ResultsMenu;
  let fixture: ComponentFixture<ResultsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
