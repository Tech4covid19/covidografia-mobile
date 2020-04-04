import { IConditionAmount } from './ICondition-amount';

export interface INetwork {
  direct: IConditionAmount[];
  indirect: IConditionAmount[];
}
