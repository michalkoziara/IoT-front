import { TestBed } from '@angular/core/testing';

import { DeviceGroupsApiService } from './device-groups-api.service';

describe('DeviceGroupsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceGroupsApiService = TestBed.get(DeviceGroupsApiService);
    expect(service).toBeTruthy();
  });
});
