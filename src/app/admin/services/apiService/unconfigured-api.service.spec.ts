import { TestBed } from '@angular/core/testing';

import { UnconfiguredApiService } from './unconfigured-api.service';

describe('UnconfiguredApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnconfiguredApiService = TestBed.get(UnconfiguredApiService);
    expect(service).toBeTruthy();
  });
});
