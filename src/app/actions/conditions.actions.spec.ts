import * as fromConditions from './conditions.actions';

describe('loadConditionss', () => {
  it('should return an action', () => {
    expect(fromConditions.loadConditionss().type).toBe('[Conditions] Load Conditionss');
  });
});
