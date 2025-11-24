import { TestBed } from '@angular/core/testing';

import { ReservacionDao } from './reservacion-dao';

describe('ReservacionDao', () => {
  let service: ReservacionDao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservacionDao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
