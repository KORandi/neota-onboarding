import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Modal, ModalBody, ModalFooter, Button, Container, Row, Col, FormGroup, Label,
} from 'reactstrap';
import { useAppContext } from '../../../context/AppContext';
import {
  getCountries, getPeriods, getTypes,
} from '../../../util/optionUtils';
import Filter from './Filter';
import { IModalForm } from '../../../ifaces/IModalForm';

interface IDataFilterModalProps {
  isOpen: boolean,
  toggle: () => void
}

const DataFilterModal: React.FunctionComponent<IDataFilterModalProps> = function ({ isOpen, toggle }) {
  const {
    updateMavg, updateAavg, updateFilter, filter,
  } = useAppContext();
  const { handleSubmit, control, setValue } = useForm<IModalForm>();
  const countryOptions = getCountries();
  const periodOptions = getPeriods();
  const typeOptions = getTypes();

  const updateData = (newData: IModalForm): void => {
    updateFilter(newData);
    updateMavg({ isLoaded: false, data: [] });
    updateAavg({ isLoaded: false, data: [] });
    toggle();
  };

  useEffect(() => {
    setValue('country', filter.country);
    setValue('period', filter.period);
    setValue('type', filter.type);
  });

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
                <FormGroup>
                  <Label>Country:</Label>
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
                        value={value || null}
                        name={name}
                        fieldState={fieldState}
                      />
                    )}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Period: </Label>
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
                        value={value || null}
                        name={name}
                        fieldState={fieldState}
                      />
                    )}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Type: </Label>
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
                        value={value || null}
                        name={name}
                        fieldState={fieldState}
                      />
                    )}
                  />
                </FormGroup>
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
