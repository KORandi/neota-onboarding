import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Form, Container, Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { useAppContext } from '../../../contexts/AppContext';

interface DashboardFormProps {
  id: string,
  toggle: () => void,
}

interface IDashboardDataEntryForm {
  gcm: string,
  annualData: number[]
}

const DashboardForm: FunctionComponent<DashboardFormProps> = function ({ id, toggle }) {
  const {
    handleSubmit, control, reset,
  } = useForm<IDashboardDataEntryForm>();

  const { aavg: { data }, updateAavg } = useAppContext();

  const updateData = (newRecord: IDashboardDataEntryForm): void => {
    updateAavg({
      isLoaded: true,
      data: [...data, { ...newRecord }],
    });
    toggle();
  };

  return (
    <Form
      id={id}
      onSubmit={handleSubmit((newRecord) => {
        updateData(newRecord);
        reset();
      })}
    >
      <Container>
        <Row>
          <Col>
            <FormGroup className="position-relative">
              <Label>
                GCM Scenario Name:
              </Label>
              <Controller
                control={control}
                rules={{ required: 'Please fill the name of GCM' }}
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
          <Col>
            <FormGroup className="position-relative">
              <Label>
                Annual value
              </Label>
              <Controller
                control={control}
                name="annualData.0"
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
        </Row>
      </Container>
    </Form>
  );
};

export default DashboardForm;
