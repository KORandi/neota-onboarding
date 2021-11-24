import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { IClimateAavgDTO } from '../../../dtos/IClimateAavgDTO';
import WeatherGraphComponent from './WeatherGraphComponent';

interface WeatherGrapListProps {
  isLoaded: boolean,
  data: IClimateAavgDTO[]
}

const WeatherGraph: React.FunctionComponent<WeatherGrapListProps> = function ({ isLoaded, data }) {
  const { filter: { country, type, period } } = useAppContext();
  return (
    <>
      {!isLoaded && (
      <div className="d-flex justify-content-center pt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
      )}
      {isLoaded && data.length === 0 && <p className="text-muted text-center">Data are not available...</p>}
      {isLoaded && data.length > 0
      && (
        <div>
          {country && type && period
          && (
          <div>
            <div>
              <strong>Country:</strong>
              {' '}
              {country.label}
            </div>
            <div>
              <strong>Period:</strong>
              {' '}
              {period.label}
            </div>
            <div>
              <strong>Type:</strong>
              {' '}
              {type.label}
            </div>
          </div>
          )}
          <WeatherGraphComponent data={data} />
        </div>
      )}
    </>
  );
};

export default WeatherGraph;
