import { TestBed } from '@angular/core/testing';

import { BookingDao } from './booking-dao';

describe('BookingDao', () => {
  let service: BookingDao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
