import { TestBed } from '@angular/core/testing';

import { ConfinementStatesService } from './confinement-states.service';

describe('ConfinementStatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfinementStatesService = TestBed.get(ConfinementStatesService);
    expect(service).toBeTruthy();
  });
});
