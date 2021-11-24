import { IPeriodSelectOption, ISelectOption } from '../utils/optionUtils';

export interface IFilterForm {
  country?: ISelectOption;
  period?: IPeriodSelectOption;
  type?: ISelectOption;
}
