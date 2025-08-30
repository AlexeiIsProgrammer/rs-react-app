import React, { memo, useCallback } from 'react';
import styles from './SearchBar.module.scss';
import type { SearchBarProps } from './types';

const SearchBar = memo(({ searchQuery, onSearch }: SearchBarProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch]
  );

  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchQuery}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
