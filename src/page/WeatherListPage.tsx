import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import WeatherTable from '../component/Tables/WeatherTable';
import { useAppContext } from '../context/AppContext';
import DefaultLayout from '../layout/DefaultLayout';

const WeatherListPage: React.FunctionComponent = function () {
  const title = 'Weather List';
  const { climate: { isLoaded, data }, searchType } = useAppContext();

  return (
    <DefaultLayout title={title}>
      <Container className="pt-3">
        <Row>
          <Col>
            <WeatherTable isLoaded={isLoaded} data={data} searchType={searchType} />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default WeatherListPage;
