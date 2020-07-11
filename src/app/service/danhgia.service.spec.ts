import { TestBed } from '@angular/core/testing';

import { DanhgiaService } from './danhgia.service';

describe('DanhgiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DanhgiaService = TestBed.get(DanhgiaService);
    expect(service).toBeTruthy();
  });
});
