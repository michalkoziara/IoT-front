import {TestBed} from '@angular/core/testing';

import {ExecutiveTypeApiService} from './executive-type-api.service';

describe('ExecutiveTypeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutiveTypeApiService = TestBed.get(ExecutiveTypeApiService);
    expect(service).toBeTruthy();
  });
});
