import { TestBed } from '@angular/core/testing';

import { TitlestringService } from './titlestring.service';

describe('TitlestringService', () => {
  let service: TitlestringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitlestringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
