import { TestBed } from '@angular/core/testing';

import { BookingCacheService } from './booking-cache-service';

describe('BookingCacheService', () => {
  let service: BookingCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
