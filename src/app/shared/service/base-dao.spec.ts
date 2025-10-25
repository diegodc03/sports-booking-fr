import { TestBed } from '@angular/core/testing';

import { BaseDao } from './base-dao';

describe('BaseDao', () => {
  let service: BaseDao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseDao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
