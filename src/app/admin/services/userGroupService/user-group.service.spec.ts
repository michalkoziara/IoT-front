import {TestBed} from '@angular/core/testing';

import {UserGroupService} from './user-group.service';

describe('UserGroupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGroupService = TestBed.get(UserGroupService);
    expect(service).toBeTruthy();
  });
});
