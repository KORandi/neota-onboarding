import { IClimateAavgDTO } from '../dtos/IClimateAavgDTO';
import { IClimateMavgDTO } from '../dtos/IClimateMavgDTO';
import { GCM_NAMES } from './constants';

export function getGCMDisplayName(technicalName: string): string {
  const map = new Map(Object.entries(GCM_NAMES));
  if (map.has(technicalName)) {
    return map.get(technicalName) || '';
  }
  return technicalName;
}

export function calculateAnnualAvarage(input: IClimateAavgDTO[][]): IClimateAavgDTO[] {
  return input.reduce(
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
    { ...response, annualData: response.annualData.map((month) => month / input.length) }
  ));
}

export function calculateMonthlyAvarage(input: IClimateMavgDTO[][]): IClimateMavgDTO[] {
  return input.reduce(
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
    { ...response, monthVals: response.monthVals.map((month) => month / input.length) }
  ));
}
