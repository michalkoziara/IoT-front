import {TestBed} from '@angular/core/testing';

import {UserGroupApiService} from './user-group-api.service';

describe('UserGroupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGroupApiService = TestBed.get(UserGroupApiService);
    expect(service).toBeTruthy();
  });
});
