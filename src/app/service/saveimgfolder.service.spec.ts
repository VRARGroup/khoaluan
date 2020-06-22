import { TestBed } from '@angular/core/testing';

import { SaveimgfolderService } from './saveimgfolder.service';

describe('SaveimgfolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveimgfolderService = TestBed.get(SaveimgfolderService);
    expect(service).toBeTruthy();
  });
});
