import { FETCH_URL } from '../constants';

export type YearlyData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | undefined;
};

export type CountryData = {
  name: string;
  iso_code?: string;
  data: YearlyData[];
};

export type Data = {
  [country: string]: CountryData;
};

let cachedData: Data | null = null;

export const useData = (): Data => {
  if (cachedData) {
    return cachedData;
  }
  console.log('cachedData', cachedData);

  throw new Promise((resolve, reject) => {
    fetch(FETCH_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data: Data) => {
        cachedData = data;
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
