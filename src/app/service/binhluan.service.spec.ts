import { TestBed } from '@angular/core/testing';

import { BinhluanService } from './binhluan.service';

describe('BinhluanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BinhluanService = TestBed.get(BinhluanService);
    expect(service).toBeTruthy();
  });
});
