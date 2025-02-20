import { TestBed } from '@angular/core/testing';

import { SpecialContentService } from './special-content.service';

describe('SpecialContentService', () => {
  let service: SpecialContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
