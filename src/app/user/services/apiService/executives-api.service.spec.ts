import { TestBed } from '@angular/core/testing';

import { ExecutivesApiService } from './executives-api.service';

describe('ExecutivesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutivesApiService = TestBed.get(ExecutivesApiService);
    expect(service).toBeTruthy();
  });
});
