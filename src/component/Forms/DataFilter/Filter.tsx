import React from 'react';
import Select from 'react-select';
import { ISelectOption } from '../../../util/optionUtils';

export interface IOptionsOrGroups {
    label: string,
    value: string
}

export interface IFilterProps {
  options: IOptionsOrGroups[]
  placeholder?: string,
  onChange: (selectedRecord: ISelectOption | null) => void
}

const Filter: React.FunctionComponent<IFilterProps> = function ({ options, placeholder, onChange }) {
  const handleOnChange = function (selectedRecord: ISelectOption | null): void {
    onChange(selectedRecord);
  };

  return (
    <Select
      onChange={(selectedRecord) => { handleOnChange(selectedRecord); }}
      placeholder={placeholder}
      options={options}
    />
  );
};

export default Filter;
