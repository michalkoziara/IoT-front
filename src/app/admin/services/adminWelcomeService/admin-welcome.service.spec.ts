import { TestBed } from '@angular/core/testing';

import { AdminWelcomeService } from './admin-welcome.service';

describe('AdminWelcomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminWelcomeService = TestBed.get(AdminWelcomeService);
    expect(service).toBeTruthy();
  });
});
