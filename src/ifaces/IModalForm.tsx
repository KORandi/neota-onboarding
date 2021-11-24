import { IPeriodSelectOption, ISelectOption } from '../util/optionUtils';

export interface IModalForm {
  country?: ISelectOption;
  period?: IPeriodSelectOption;
  type?: ISelectOption;
}
