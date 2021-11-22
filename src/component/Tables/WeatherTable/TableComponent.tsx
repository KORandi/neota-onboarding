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

const TableComponent: React.FunctionComponent<ITableComponentProps> = function ({ data, searchType }) {
  return (
    <Table>
      <thead>
        <tr className="d-none d-lg-table-row">
          <th scope="col">GCM scenario</th>
          {MONTHS_SHORT.map((month) => <th key={month}>{month}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((record: IClimateDTO) => (
          <tr className="d-block d-lg-table-row mt-3 mt-lg-0" key={record.gcm}>
            <td className="d-block d-lg-table-cell">
              <strong className="d-inline d-lg-none">
                GCM scenario:
                {' '}
              </strong>
              {getGCMDisplayName(record.gcm)}
            </td>
            {record.monthVals.map((val, index) => (
              <td className="d-block d-lg-table-cell" key={`${record.gcm}-${val}`} title={`${val}`}>
                <strong className="d-inline d-lg-none">
                  {MONTHS_SHORT[index]}
                  :
                  {' '}
                </strong>
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

export default TableComponent;
