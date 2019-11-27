import {TestBed} from '@angular/core/testing';

import {ViewCommunicationService} from './view-communication.service';

describe('ViewCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewCommunicationService = TestBed.get(ViewCommunicationService);
    expect(service).toBeTruthy();
  });
});
