import { TestBed } from '@angular/core/testing';

import { LoaisanphamService } from './loaisanpham.service';

describe('LoaisanphamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaisanphamService = TestBed.get(LoaisanphamService);
    expect(service).toBeTruthy();
  });
});
