import {TestBed} from '@angular/core/testing';

import {FormulasApiService} from './formulas-api.service';

describe('FormulasApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormulasApiService = TestBed.get(FormulasApiService);
    expect(service).toBeTruthy();
  });
});
