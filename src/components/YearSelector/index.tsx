import React, { memo, useCallback } from 'react';
import styles from './YearSelector.module.scss';
import type { YearSelectorProps } from './types';

const YearSelector = memo(
  ({ years, selectedYear, onYearChange }: YearSelectorProps) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onYearChange(Number(e.target.value));
      },
      [onYearChange]
    );

    return (
      <div className={styles['year-selector']}>
        <label htmlFor="year-select">Select Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleChange}
          className={styles.select}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

YearSelector.displayName = 'YearSelector';

export default YearSelector;
