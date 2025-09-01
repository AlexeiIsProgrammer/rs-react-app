import React, { memo, useCallback } from 'react';
import styles from './RegionFilter.module.scss';
import type { RegionFilterProps } from './types';

const RegionFilter = memo(
  ({ regions, selectedRegion, onRegionChange }: RegionFilterProps) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onRegionChange(e.target.value);
      },
      [onRegionChange]
    );

    return (
      <div className={styles['region-filter']}>
        <label htmlFor="region-filter">Filter by Region:</label>
        <select
          id="region-filter"
          value={selectedRegion}
          onChange={handleChange}
          className={styles.select}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

RegionFilter.displayName = 'RegionFilter';

export default RegionFilter;
