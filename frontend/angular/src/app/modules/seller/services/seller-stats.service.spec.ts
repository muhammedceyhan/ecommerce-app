import { TestBed } from '@angular/core/testing';

import { SellerStatsService } from './seller-stats.service';

describe('SellerStatsService', () => {
  let service: SellerStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
