import { TestBed } from '@angular/core/testing';

import { FormulasService } from './formulas.service';

describe('FormulasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormulasService = TestBed.get(FormulasService);
    expect(service).toBeTruthy();
  });
});
