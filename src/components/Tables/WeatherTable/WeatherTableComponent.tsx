import React from 'react';
import { Table } from 'reactstrap';
import { IClimateMavgDTO } from '../../../dtos/IClimateMavgDTO';
import { getGCMDisplayName } from '../../../utils/climateUtils';
import { MONTHS_SHORT } from '../../../utils/constants';
import { round } from '../../../utils/numberUtils';
import { getMeasurementUnit } from '../../../utils/templateUtils';

interface ITableComponentProps{
    data: IClimateMavgDTO[],
    searchType: string
}

const WeatherTableComponent: React.FunctionComponent<ITableComponentProps> = function ({ data, searchType }) {
  return (
    <div className="table-responsive">
      <Table>
        <thead>
          <tr className="d-none d-lg-table-row">
            <th scope="col">GCM scenario</th>
            {MONTHS_SHORT.map((month) => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((record: IClimateMavgDTO, index) => (
            <tr className="d-block d-lg-table-row mt-3 mt-lg-0" key={`${record.gcm}-${`n${index}`}`}>
              <td className="d-block d-lg-table-cell">
                <strong className="d-inline d-lg-none">
                  GCM scenario:
                  {' '}
                </strong>
                {getGCMDisplayName(record.gcm)}
              </td>
              {record.monthVals.map((val, monthIndex) => (
                <td
                  className="d-block d-lg-table-cell"
                  key={`${record.gcm}-${`i${monthIndex}`}`}
                  title={`${val || ''}`}
                >
                  <strong className="d-inline d-lg-none">
                    {MONTHS_SHORT[monthIndex]}
                    :
                    {' '}
                  </strong>
                  {(val || val === 0)
                  && (
                  <>
                    {round(val)}
                    {getMeasurementUnit(searchType)}
                  </>
                  )}
                  {
                    !(val || val === 0) && '---'
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WeatherTableComponent;
