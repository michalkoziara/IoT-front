import {TestBed} from '@angular/core/testing';

import {ProductKeyApiService} from './product-key-api.service';

describe('ProductKeyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductKeyApiService = TestBed.get(ProductKeyApiService);
    expect(service).toBeTruthy();
  });
});
