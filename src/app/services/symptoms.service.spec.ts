import { TestBed } from '@angular/core/testing';

import { SymptomsService } from './symptoms.service';

describe('SymptomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymptomsService = TestBed.get(SymptomsService);
    expect(service).toBeTruthy();
  });
});
