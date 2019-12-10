import {TestBed} from '@angular/core/testing';

import {FormulaApiService} from './formula-api.service';

describe('FormulaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormulaApiService = TestBed.get(FormulaApiService);
    expect(service).toBeTruthy();
  });
});
