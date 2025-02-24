import { TestBed } from '@angular/core/testing';

import { DiscountProductsService } from './discount-products.service';

describe('DiscountProductsService', () => {
  let service: DiscountProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
