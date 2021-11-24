import { IClimateAavgDTO } from '../dtos/IClimateAavgDTO';
import { IClimateMavgDTO } from '../dtos/IClimateMavgDTO';
import { YUG_COUNTRY_CODES } from '../utils/constants';

const endpoint = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country';

export async function fetchMonthlyAvarage(
  countryCode: string,
  type: string,
  from: number,
  to: number,
): Promise<IClimateMavgDTO[]> {
  if (countryCode === 'YUG') {
    // Rule disabled due recursion call
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return fetchMonthlyAvarageForYUG(type, from, to);
  }
  return fetch(`${endpoint}/mavg/${type}/${from}/${to}/${countryCode}.json`)
    .then((response) => response.json());
}

export async function fetchAnnualAvarage(
  countryCode: string,
  type: string,
  from: number,
  to: number,
): Promise<IClimateAavgDTO[]> {
  if (countryCode === 'YUG') {
    // Rule disabled due recursion call
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return fetchAnnualAvarageForYUG(type, from, to);
  }
  return fetch(`${endpoint}/annualavg/${type}/${from}/${to}/${countryCode}.json`)
    .then((response) => response.json());
}

/**
 * For Yugoslavia - avarage from all old countries results
 */
async function fetchMonthlyAvarageForYUG(
  type: string,
  from: number,
  to: number,
): Promise<IClimateMavgDTO[]> {
  const result = await Promise.all(
    YUG_COUNTRY_CODES
      .filter((countryCode) => countryCode !== 'YUG')
      .map((countryCode) => fetchMonthlyAvarage(countryCode, type, from, to)),
  );
  const resultSize = result.length;
  return result.reduce(
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
  ).map((response) => (
    { ...response, monthVals: response.monthVals.map((month) => month / resultSize) }
  ));
}

/**
 * For Yugoslavia - avarage from all old countries results
 */
async function fetchAnnualAvarageForYUG(
  type: string,
  from: number,
  to: number,
): Promise<IClimateAavgDTO[]> {
  const result = await Promise.all(
    YUG_COUNTRY_CODES
      .filter((countryCode) => countryCode !== 'YUG')
      .map((countryCode) => fetchAnnualAvarage(countryCode, type, from, to)),
  );
  const resultSize = result.length;
  return result.reduce(
    (acc, response) => acc.map(
      (accClimateRecord) => (
        {
          ...accClimateRecord,
          annualData: response.find(
            (reponseClimate) => accClimateRecord.gcm === reponseClimate.gcm,
          )?.annualData.map(
            (annualData, index) => (accClimateRecord.annualData[index] + annualData),
          ) || accClimateRecord.annualData,
        }
      ),
    ),
  ).map((response) => (
    { ...response, annualData: response.annualData.map((month) => month / resultSize) }
  ));
}
