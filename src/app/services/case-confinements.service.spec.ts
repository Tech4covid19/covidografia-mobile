import { TestBed } from '@angular/core/testing';

import { CaseConfinementsService } from './case-confinements.service';

describe('CaseConfinementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseConfinementsService = TestBed.get(CaseConfinementsService);
    expect(service).toBeTruthy();
  });
});
