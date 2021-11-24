import classNames from 'classnames';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Modal, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, Row, Col, Container,
} from 'reactstrap';
import { useAppContext } from '../../../context/AppContext';
import { MONTHS } from '../../../util/constants';

interface IDataEntryModalProps {
  isOpen: boolean,
  toggle: () => void
}

interface IModalForm {
  gcm: string,
  monthVals: number[]
}

const DataEntryModal: React.FunctionComponent<IDataEntryModalProps> = function ({ isOpen, toggle }) {
  const {
    handleSubmit, control, reset,
  } = useForm<IModalForm>();

  const { mavg: { data }, updateMavg: updateClimate } = useAppContext();

  const updateData = (newRecord: IModalForm): void => {
    updateClimate({
      isLoaded: true,
      data: [...data, { ...newRecord }],
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Form
        onSubmit={handleSubmit((newRecord) => {
          updateData(newRecord);
          reset();
          toggle();
        })}
      >
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <FormGroup className="position-relative">
                  <Label>
                    GCM Scenario Name:
                  </Label>
                  <Controller
                    control={control}
                    rules={{ required: 'Please select country' }}
                    name="gcm"
                    render={({
                      field,
                      fieldState: { invalid, error: err },
                    }) => (
                      <>
                        <Input
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...field}
                        />
                        <span className={classNames({ 'text-danger': invalid, invisible: !invalid })}>
                          {err?.message}
                        </span>
                      </>
                    )}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {MONTHS.map((month, index) => (
                <Col key={month} lg={6} xs={12}>
                  <FormGroup key={month} className="position-relative">
                    <Label>
                      Data for
                      {' '}
                      {month}
                      :
                    </Label>
                    <Controller
                      control={control}
                      name={`monthVals.${index}`}
                      render={({
                        field,
                        fieldState: { invalid, error: err },
                      }) => (
                        <>
                          <Input
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...field}
                          />
                          <span
                            className={classNames({ 'text-danger': invalid, invisible: !invalid })}
                          >
                            {err?.message}
                          </span>
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
          >
            Add
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
      </Form>
    </Modal>
  );
};

export default DataEntryModal;
