import { IGeo } from './IGeo';

export interface ICase {
  id: number | string;
  postalCode: string;
  geo: IGeo;
  condition: number;
  symptoms: number[];
  confinementState: number;
  timestamp: string;
}
