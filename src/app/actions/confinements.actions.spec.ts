import * as fromConfinements from './confinements.actions';

describe('loadConfinementss', () => {
  it('should return an action', () => {
    expect(fromConfinements.loadConfinementss().type).toBe('[Confinements] Load Confinementss');
  });
});
