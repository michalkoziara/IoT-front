import { TestBed } from '@angular/core/testing';

import { UserGroupsApiService } from './user-groups-api.service';

describe('UserGroupsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGroupsApiService = TestBed.get(UserGroupsApiService);
    expect(service).toBeTruthy();
  });
});
