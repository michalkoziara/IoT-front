import {TestBed} from '@angular/core/testing';

import {SensorApiService} from './sensor-api.service';

describe('SensorApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorApiService = TestBed.get(SensorApiService);
    expect(service).toBeTruthy();
  });
});
