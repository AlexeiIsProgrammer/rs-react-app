import { useMemo, memo, useState, useRef, useEffect } from 'react';
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
    const [previousYear, setPreviousYear] = useState(selectedYear);
    const [highlightedCells, setHighlightedCells] = useState<Set<string>>(
      new Set()
    );
    const previousDataRef = useRef<Map<string, any>>(new Map());

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

    const isCellHighlighted = (
      countryName: string,
      dataKey: string
    ): boolean => {
      return highlightedCells.has(`${countryName}-${dataKey}`);
    };

    useEffect(() => {
      const currentData = new Map();

      countries.forEach((country) => {
        const yearData =
          country.data.find((d) => d.year === previousYear) || {};
        const keyPrefix = `${country.name}-`;

        Object.entries(yearData).forEach(([key, value]) => {
          currentData.set(keyPrefix + key, value);
        });
      });

      previousDataRef.current = currentData;
      setPreviousYear(selectedYear);
    }, [countries, selectedYear]);

    useEffect(() => {
      if (previousYear === selectedYear) return;

      const newHighlightedCells = new Set<string>();
      const previousData = previousDataRef.current;

      countries.forEach((country) => {
        const yearData =
          country.data.find((d) => d.year === selectedYear) || {};
        const keyPrefix = `${country.name}-`;

        Object.entries(yearData).forEach(([key, value]) => {
          const cellKey = keyPrefix + key;
          const previousValue = previousData.get(cellKey);

          if (value !== previousValue) {
            newHighlightedCells.add(cellKey);
          }
        });
      });

      setHighlightedCells(newHighlightedCells);

      const timer = setTimeout(() => {
        setHighlightedCells(new Set());
      }, 2000);

      return () => clearTimeout(timer);
    }, [countries, selectedYear, previousYear]);

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
                <td
                  className={
                    isCellHighlighted(country.name, 'population')
                      ? styles.highlight
                      : ''
                  }
                >
                  {formatValue((country as unknown as YearlyData).population)}
                </td>
                {selectedColumns.map((column) => (
                  <td
                    key={column}
                    className={
                      isCellHighlighted(country.name, column)
                        ? styles.highlight
                        : ''
                    }
                  >
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
