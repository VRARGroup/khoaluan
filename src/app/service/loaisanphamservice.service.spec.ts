import { TestBed } from '@angular/core/testing';

import { LoaisanphamserviceService } from './loaisanphamservice.service';

describe('LoaisanphamserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaisanphamserviceService = TestBed.get(LoaisanphamserviceService);
    expect(service).toBeTruthy();
  });
});
