import { TestBed } from '@angular/core/testing';

import { DanhsachquyenService } from './danhsachquyen.service';

describe('DanhsachquyenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DanhsachquyenService = TestBed.get(DanhsachquyenService);
    expect(service).toBeTruthy();
  });
});
