import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Modal, ModalBody, ModalFooter, Button, Container, Row, Col,
} from 'reactstrap';
import { useAppContext } from '../../../context/AppContext';
import { fetchMonthlyAvarage } from '../../../util/api';
import {
  getCountries, getPeriods, getTypes, IPeriodSelectOption, ISelectOption,
} from '../../../util/optionUtils';
import Filter from './Filter';

interface IDataFilterModalProps {
  isOpen: boolean,
  toggle: () => void
}

interface IModalForm {
  country: ISelectOption,
  period: IPeriodSelectOption,
  type: ISelectOption
}

const DataFilterModal: React.FunctionComponent<IDataFilterModalProps> = function ({ isOpen, toggle }) {
  const {
    handleSubmit, control,
  } = useForm<IModalForm>();
  const { updateClimate: updateWeatherData, updateSearchType, addFlashMessage } = useAppContext();
  const countryOptions = getCountries();
  const periodOptions = getPeriods();
  const typeOptions = getTypes();

  const updateData = async ({
    country: { value: countryName },
    period: { from, to },
    type: { value: typeName },
  }: IModalForm): Promise<void> => {
    toggle();
    updateWeatherData({ isLoaded: false, data: [] });
    try {
      const result = await fetchMonthlyAvarage(countryName, typeName, from, to);
      updateWeatherData({ isLoaded: true, data: result });
    } catch (error) {
      addFlashMessage({ message: 'Endpoint responed with error. Please contact administrator', type: 'danger' });
      updateWeatherData({ isLoaded: true, data: [] });
    }
    updateSearchType(typeName);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <form
        onSubmit={handleSubmit((data) => {
          updateData(data);
        })}
      >
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Controller
                  control={control}
                  rules={{ required: 'Please select country' }}
                  name="country"
                  render={({
                    field: {
                      onChange, onBlur, value, name,
                    },
                    fieldState,
                  }) => (
                    <Filter
                      placeholder="Select country"
                      options={countryOptions}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      fieldState={fieldState}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Controller
                  control={control}
                  rules={{ required: 'Please select period' }}
                  name="period"
                  render={({
                    field: {
                      onChange, onBlur, value, name,
                    },
                    fieldState,
                  }) => (
                    <Filter
                      placeholder="Select period"
                      options={periodOptions}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      fieldState={fieldState}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Controller
                  control={control}
                  rules={{ required: 'Please select type' }}
                  name="type"
                  render={({
                    field: {
                      onChange, onBlur, value, name,
                    },
                    fieldState,
                  }) => (
                    <Filter
                      placeholder="Select type"
                      options={typeOptions}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      fieldState={fieldState}
                    />
                  )}
                />
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          {' '}
          <Button
            onClick={() => {
              toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default DataFilterModal;
