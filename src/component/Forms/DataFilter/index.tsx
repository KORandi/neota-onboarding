import React, { useState } from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import DataFilterModal from './DataFilterModal';

const DataFilter: React.FunctionComponent = function () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-end pt-3">
          <Col>
            <div className="d-flex justify-content-end">
              <Button
                color="danger"
                onClick={toggle}
              >
                Set search
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <DataFilterModal isOpen={isModalOpen} toggle={toggle} />
    </>
  );
};

export default DataFilter;
