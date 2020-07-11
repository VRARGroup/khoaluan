import { TestBed } from '@angular/core/testing';

import { TaikhoanService } from './taikhoan.service';

describe('TaikhoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaikhoanService = TestBed.get(TaikhoanService);
    expect(service).toBeTruthy();
  });
});
