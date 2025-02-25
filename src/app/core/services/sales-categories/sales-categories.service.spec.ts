import { TestBed } from '@angular/core/testing';

import { SalesCategoriesService } from './sales-categories.service';

describe('SalesCategoriesService', () => {
  let service: SalesCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
