import {TestBed} from '@angular/core/testing';

import {AdminViewCommunicationService} from './admin-view-communication.service';

describe('AdminViewCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminViewCommunicationService = TestBed.get(AdminViewCommunicationService);
    expect(service).toBeTruthy();
  });
});
