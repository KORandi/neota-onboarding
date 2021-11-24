import React from 'react';
import { ControllerFieldState } from 'react-hook-form';
import Select from 'react-select';
import classNames from 'classnames';
import { ISelectOption } from '../../../utils/optionUtils';

interface IFilterProps {
  options: { label: string, value: string }[],
  placeholder: string,
  onChange: (selectedRecord: ISelectOption | null) => void,
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined,
  value: ISelectOption | null,
  name: string,
  fieldState: ControllerFieldState
}

const Filter: React.FunctionComponent<IFilterProps> = function ({
  options, placeholder, onChange, onBlur, value, name, fieldState,
}) {
  const { invalid, error } = fieldState;
  return (
    <>
      <Select
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        placeholder={placeholder}
        options={options}
      />
      <span className={classNames({ 'text-danger': invalid, invisible: !invalid })}>{error?.message}</span>
    </>
  );
};

export default Filter;
