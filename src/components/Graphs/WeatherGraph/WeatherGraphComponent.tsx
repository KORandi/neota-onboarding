import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import styled from 'styled-components';
import { IClimateAavgDTO } from '../../../dtos/IClimateAavgDTO';
import { getGCMDisplayName } from '../../../utils/climateUtils';

const GraphContainer = styled.div`
  height: 250px;
`;

interface WeatherGraphComponentsProps {
  data: IClimateAavgDTO[],
}

const WeatherGraphComponents: React.FunctionComponent<WeatherGraphComponentsProps> = function (
  { data: defaultData },
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
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default WeatherGraphComponents;
