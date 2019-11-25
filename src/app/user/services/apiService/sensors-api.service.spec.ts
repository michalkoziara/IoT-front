import {TestBed} from '@angular/core/testing';

import {SensorsApiService} from './sensors-api.service';

describe('SensorsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorsApiService = TestBed.get(SensorsApiService);
    expect(service).toBeTruthy();
  });
});
