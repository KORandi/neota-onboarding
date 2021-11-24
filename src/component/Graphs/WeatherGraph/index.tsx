import React from 'react';
import { IClimateAavgDTO } from '../../../dto/IClimateAavgDTO';
import WeatherGraphComponent from './WeatherGraphComponent';

interface WeatherGrapListProps {
  isLoaded: boolean,
  data: IClimateAavgDTO[],
  searchType: string
}

const WeatherGraph: React.FunctionComponent<WeatherGrapListProps> = function ({ isLoaded, data, searchType }) {
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
        <div><WeatherGraphComponent data={data} searchType={searchType} /></div>
      )}
    </>
  );
};

export default WeatherGraph;
