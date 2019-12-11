import {TestBed} from '@angular/core/testing';

import {SensorTypeApiService} from './sensor-type-api.service';

describe('SensorTypeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorTypeApiService = TestBed.get(SensorTypeApiService);
    expect(service).toBeTruthy();
  });
});
