import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import styled from 'styled-components';
import { IClimateAavgDTO } from '../../../dto/IClimateAavgDTO';
import { getGCMDisplayName } from '../../../util/climateUtils';
import { getMeasurementUnit } from '../../../util/templateUtils';

const GraphContainer = styled.div`
  height: 250px;
`;

interface WeatherGraphComponentsProps {
  data: IClimateAavgDTO[],
  searchType: string
}

const WeatherGraphComponents: React.FunctionComponent<WeatherGraphComponentsProps> = function (
  { data: defaultData, searchType },
) {
  const data = defaultData.map((record) => ({
    name: getGCMDisplayName(record.gcm),
    value: record.annualData[0],
  }));
  return (
    <GraphContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={getMeasurementUnit(searchType)}
          />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default WeatherGraphComponents;
