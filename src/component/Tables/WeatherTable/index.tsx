import React from 'react';
import { IClimateDTO } from '../../../dto/IClimateDTO';
import WeatherTableComponent from './WeatherTableComponent';

interface IWeatherTableProps {
  isLoaded: boolean,
  data: IClimateDTO[],
  searchType: string
}

const WeatherTable: React.FunctionComponent<IWeatherTableProps> = function ({ data, isLoaded, searchType }) {
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
        <WeatherTableComponent data={data} searchType={searchType} />
      )}
    </>
  );
};

export default React.memo(WeatherTable);
