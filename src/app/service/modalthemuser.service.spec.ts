import { TestBed } from '@angular/core/testing';

import { ModalthemuserService } from './modalthemuser.service';

describe('ModalthemuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalthemuserService = TestBed.get(ModalthemuserService);
    expect(service).toBeTruthy();
  });
});
