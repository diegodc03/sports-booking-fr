import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDialog } from './result-dialog';

describe('ResultDialog', () => {
  let component: ResultDialog;
  let fixture: ComponentFixture<ResultDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
