import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestUsersForm } from './quest-users-form';

describe('QuestUsersForm', () => {
  let component: QuestUsersForm;
  let fixture: ComponentFixture<QuestUsersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestUsersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestUsersForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
