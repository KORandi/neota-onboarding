import { IClimateDTO } from '../dto/IClimateDTO';

export async function fetchData(): Promise<IClimateDTO[]> {
  return fetch('http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/tas/1920/1939/CZE.json')
    .then((response) => response.json());
}
