import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Form, Container, Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { useAppContext } from '../../../contexts/AppContext';
import { MONTHS } from '../../../utils/constants';

interface ListFormProps {
  id: string,
  toggle: () => void,
}

interface IListDataEntryForm {
  gcm: string,
  monthVals: number[]
}

const ListForm: FunctionComponent<ListFormProps> = function ({ id, toggle }) {
  const {
    handleSubmit, control, reset,
  } = useForm<IListDataEntryForm>();

  const { mavg: { data }, updateMavg } = useAppContext();

  const updateData = (newRecord: IListDataEntryForm): void => {
    updateMavg({
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
                        type="number"
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
    </Form>
  );
};

export default ListForm;
