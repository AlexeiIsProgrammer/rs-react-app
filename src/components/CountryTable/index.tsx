import { useMemo, memo } from 'react';
import styles from './CountryTable.module.scss';
import type { CountryTableProps } from './types';
import type { YearlyData } from '../../hooks/useData';

const CountryTable = memo(
  ({
    countries,
    selectedYear,
    selectedColumns,
    onSort,
    sortConfig,
  }: CountryTableProps) => {
    const countryYearData = useMemo(() => {
      return countries.map((country) => {
        const yearData =
          country.data.find((d) => d.year === selectedYear) || {};
        return {
          name: country.name,
          isoCode: country.iso_code,
          ...yearData,
        };
      });
    }, [countries, selectedYear]);

    const formatValue = (value: number | undefined) => {
      if (value === undefined || value === null) return 'N/A';
      if (typeof value === 'number') {
        if (value > 1000000) {
          return (value / 1000000).toFixed(2) + 'M';
        }
        return value.toFixed(2);
      }
      return value;
    };

    return (
      <div className={styles['table-container']}>
        <table className={styles['country-table']}>
          <thead>
            <tr>
              <th onClick={() => onSort('name')}>
                Country{' '}
                {sortConfig.key === 'name' &&
                  (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => onSort('population')}>
                Population{' '}
                {sortConfig.key === 'population' &&
                  (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              {selectedColumns.map((column) => (
                <th key={column}>{column.replace(/_/g, ' ').toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countryYearData.map((country) => (
              <tr
                key={`${country.name}-${selectedYear}`}
                className={styles['country-row']}
              >
                <td>
                  <div className={styles['country-name']}>
                    {country.name}
                    {country.isoCode && (
                      <span className={styles['iso-code']}>
                        {' '}
                        ({country.isoCode})
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  {formatValue((country as unknown as YearlyData).population)}
                </td>
                {selectedColumns.map((column) => (
                  <td key={column}>
                    {formatValue(
                      (country as unknown as YearlyData)[column] as
                        | number
                        | undefined
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

CountryTable.displayName = 'CountryTable';

export default CountryTable;
