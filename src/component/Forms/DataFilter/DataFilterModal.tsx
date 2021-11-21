import React from 'react';
import {
  Modal, ModalBody, ModalFooter, Button, Container, Row, Col,
} from 'reactstrap';
import { useAppContext } from '../../../context/AppContext';
import { fetchData } from '../../../util/api';
import {
  getCountries, getPeriods, getTypes, ISelectOption,
} from '../../../util/optionUtils';
import Filter from './Filter';

interface IDataFilterModalProps {
  isOpen: boolean,
  toggle: () => void
}

const DataFilterModal: React.FunctionComponent<IDataFilterModalProps> = function ({ isOpen, toggle }) {
  const { updateWeatherData } = useAppContext();
  const countryOptions = getCountries();
  const periodOptions = getPeriods();
  const typeOptions = getTypes();

  const updateData = async (): Promise<void> => {
    const data = await fetchData();
    updateWeatherData(data);
    toggle();
  };

  const handleFilterChange = (filterName: string, data: ISelectOption | null) => {
    // @TODO: Handle change of filter
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <Container>
          <Row>
            <Col>
              <Filter
                placeholder="Select country"
                options={countryOptions}
                onChange={(data) => { handleFilterChange('country', data); }}
              />
            </Col>
          </Row>
          <Row className="pt-3">
            <Col>
              <Filter
                placeholder="Select period"
                options={periodOptions}
                onChange={(data) => { handleFilterChange('period', data); }}
              />
            </Col>
          </Row>
          <Row className="pt-3">
            <Col>
              <Filter
                placeholder="Select type"
                options={typeOptions}
                onChange={(data) => { handleFilterChange('type', data); }}
              />
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={updateData}
        >
          Submit
        </Button>
        {' '}
        <Button
          onClick={toggle}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DataFilterModal;
