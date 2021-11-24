import React, { useEffect } from 'react';
import { Container, Col, Row } from 'reactstrap';
import WeatherGraph from '../components/Graphs/WeatherGraph';
import { useAppContext } from '../contexts/AppContext';
import DefaultLayout from '../layouts/DefaultLayout';
import { fetchAnnualAvarage } from '../api/climateDataAPI';

interface WeatherDashboardPageProps {
  title: string
}

const WeatherDashboardPage: React.FunctionComponent<WeatherDashboardPageProps> = function ({ title }) {
  const {
    aavg: { isLoaded, data }, updateAavg, addFlashMessage, filter: { type, country, period },
  } = useAppContext();

  // When data are not available pull fresh one
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        try {
          const result = await fetchAnnualAvarage(
            country?.value || '',
            type?.value || '',
            period?.from || 0,
            period?.to || 0,
          );
          updateAavg({ isLoaded: true, data: result });
        } catch (error) {
          addFlashMessage({ message: 'Endpoint responed with error. Please contact administrator', type: 'danger' });
          updateAavg({ isLoaded: true, data: [] });
        }
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <DefaultLayout title={title}>
      <Container className="pt-3">
        <Row>
          <Col>
            <WeatherGraph isLoaded={isLoaded} data={data} />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default WeatherDashboardPage;
