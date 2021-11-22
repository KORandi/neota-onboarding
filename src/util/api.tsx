import { IClimateDTO } from '../dto/IClimateDTO';
import { YUG_COUNTRY_CODES } from './constants';

export async function fetchMonthlyAvarage(
  countryCode: string,
  type: string,
  from: number,
  to: number,
): Promise<IClimateDTO[]> {
  const endpoint = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country';

  if (countryCode === 'YUG') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return fetchMonthlyAvarageForYUG(type, from, to);
  }
  return fetch(`${endpoint}/mavg/${type}/${from}/${to}/${countryCode}.json`)
    .then((response) => response.json());
}

/**
 * For Yugoslavia avarage from old countries results
 */
async function fetchMonthlyAvarageForYUG(
  type: string,
  from: number,
  to: number,
): Promise<IClimateDTO[]> {
  return (await Promise.all(
    YUG_COUNTRY_CODES
      .filter((countryCode) => countryCode !== 'YUG')
      .map((countryCode) => fetchMonthlyAvarage(countryCode, type, from, to)),
  ))
    .reduce(
      (acc, response) => acc.map(
        (accClimateRecord) => (
          {
            ...accClimateRecord,
            monthVals: response.find(
              (reponseClimate) => accClimateRecord.gcm === reponseClimate.gcm,
            )?.monthVals.map(
              (monthVal, index) => (accClimateRecord.monthVals[index] + monthVal),
            ) || accClimateRecord.monthVals,
          }
        ),
      ),
    )
    .map((response) => (
      { ...response, monthVals: response.monthVals.map((month) => month / YUG_COUNTRY_CODES.length) }
    ));
}
