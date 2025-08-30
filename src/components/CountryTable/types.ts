import type { CountryData } from '../../hooks/useData';

export type CountryTableProps = {
  countries: CountryData[];
  selectedYear: number;
  selectedColumns: string[];
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
};
