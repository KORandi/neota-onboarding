import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import WeatherTable from '../components/Tables/WeatherTable';
import { useAppContext } from '../contexts/AppContext';
import DefaultLayout from '../layouts/DefaultLayout';
import { fetchMonthlyAvarage } from '../api/climateDataAPI';

const WeatherListPage: React.FunctionComponent = function () {
  const title = 'Weather List';
  const {
    mavg: { isLoaded, data }, updateMavg, addFlashMessage, filter: { type, country, period },
  } = useAppContext();

  // When data are not available pull fresh one
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        try {
          const result = await fetchMonthlyAvarage(
            country?.value || '',
            type?.value || '',
            period?.from || 0,
            period?.to || 0,
          );
          updateMavg({ isLoaded: true, data: result });
        } catch (error) {
          addFlashMessage({ message: 'Endpoint responed with error. Please contact administrator', type: 'danger' });
          updateMavg({ isLoaded: true, data: [] });
        }
      }
    })();
  });

  return (
    <DefaultLayout title={title}>
      <Container className="pt-3">
        <Row>
          <Col>
            <WeatherTable isLoaded={isLoaded} data={data} searchType={type?.value || ''} />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default WeatherListPage;
