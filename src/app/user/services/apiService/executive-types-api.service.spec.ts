import {TestBed} from '@angular/core/testing';

import {ExecutiveTypesApiService} from './executive-types-api.service';

describe('ExecutiveTypesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutiveTypesApiService = TestBed.get(ExecutiveTypesApiService);
    expect(service).toBeTruthy();
  });
});
