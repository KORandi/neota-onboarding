import { IClimateAavgDTO } from '../dtos/IClimateAavgDTO';
import { IClimateMavgDTO } from '../dtos/IClimateMavgDTO';
import { calculateAnnualAvarage, calculateMonthlyAvarage } from '../utils/climateUtils';
import { YUG_COUNTRY_CODES } from '../utils/constants';

const endpoint = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country';

export async function fetchMonthlyAvarage(
  countryCode: string,
  type: string,
  from: number,
  to: number,
): Promise<IClimateMavgDTO[]> {
  if (countryCode === 'YUG') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const yug = await fetchMonthlyAvarageForYUGCountries(type, from, to);
    return calculateMonthlyAvarage(yug);
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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const yug = await fetchAnnualAvarageForYUGCountries(type, from, to);
    return calculateAnnualAvarage(yug);
  }
  return fetch(`${endpoint}/annualavg/${type}/${from}/${to}/${countryCode}.json`)
    .then((response) => response.json());
}

/**
 * For Yugoslavia - avarage from all old countries results
 */
async function fetchMonthlyAvarageForYUGCountries(
  type: string,
  from: number,
  to: number,
): Promise<IClimateMavgDTO[][]> {
  return Promise.all(
    YUG_COUNTRY_CODES
      .filter((countryCode) => countryCode !== 'YUG')
      .map((countryCode) => fetchMonthlyAvarage(countryCode, type, from, to)),
  );
}

/**
 * For Yugoslavia - avarage from all old countries results
 */
async function fetchAnnualAvarageForYUGCountries(
  type: string,
  from: number,
  to: number,
): Promise<IClimateAavgDTO[][]> {
  return Promise.all(
    YUG_COUNTRY_CODES
      .filter((countryCode) => countryCode !== 'YUG')
      .map((countryCode) => fetchAnnualAvarage(countryCode, type, from, to)),
  );
}
