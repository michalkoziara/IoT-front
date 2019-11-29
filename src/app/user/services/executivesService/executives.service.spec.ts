import {TestBed} from '@angular/core/testing';

import {ExecutivesService} from './executives.service';

describe('ExecutivesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutivesService = TestBed.get(ExecutivesService);
    expect(service).toBeTruthy();
  });
});
