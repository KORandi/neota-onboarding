import { COUNTRIES, PERIODS, TYPES } from './constants';

export interface ISelectOption {
    label: string,
    value: string
}

export interface IPeriodSelectOption extends ISelectOption {
    from: number,
    to: number
}

export function getCountries(): ISelectOption[] {
  return COUNTRIES;
}

export function getPeriods(): ISelectOption[] {
  return PERIODS;
}

export function getTypes(): ISelectOption[] {
  return TYPES;
}
