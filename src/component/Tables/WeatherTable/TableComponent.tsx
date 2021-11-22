import React from 'react';
import { Table } from 'reactstrap';
import { IClimateDTO } from '../../../dto/IClimateDTO';
import { getGCMDisplayName } from '../../../util/climateUtils';
import { MONTHS_SHORT } from '../../../util/constants';
import { round } from '../../../util/numberUtils';

interface ITableComponentProps{
    data: IClimateDTO[],
    searchType: string
}

const WeatherTableComponent: React.FunctionComponent<ITableComponentProps> = function ({ data, searchType }) {
  return (
    <Table>
      <thead>
        <tr>
          <td>GCM scenario</td>
          {MONTHS_SHORT.map((month) => <td key={month}>{month}</td>)}
        </tr>
      </thead>
      <tbody>
        {data.map((record: IClimateDTO) => (
          <tr key={record.gcm}>
            <td>
              {getGCMDisplayName(record.gcm)}
            </td>
            {record.monthVals.map((val) => (
              <td key={`${record.gcm}-${val}`} title={`${val}`}>
                {round(val)}
                {searchType === 'tas' && <>&#8451;</>}
                {searchType === 'pr' && <>mm</>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default WeatherTableComponent;
