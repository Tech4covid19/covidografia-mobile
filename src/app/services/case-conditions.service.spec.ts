import { TestBed } from '@angular/core/testing';

import { CaseConditionsService } from './case-conditions.service';

describe('CaseConditionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseConditionsService = TestBed.get(CaseConditionsService);
    expect(service).toBeTruthy();
  });
});
