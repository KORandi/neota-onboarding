import React from 'react';
import { Table } from 'reactstrap';
import { IClimateDTO } from '../../../dto/IClimateDTO';
import { getGCMDisplayName } from '../../../util/climateUtils';
import { round } from '../../../util/numberUtils';

interface iWeatherTableProps {
  data: IClimateDTO[]
}

const WeatherTable: React.FunctionComponent<iWeatherTableProps> = function ({ data }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (data.length === 0) {
    return (<p className="text-muted text-center">Data are not available...</p>);
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>GCM scenario</td>
          {months.map((month) => <td key={month}>{month}</td>)}
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
                &#8451;
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default WeatherTable;
