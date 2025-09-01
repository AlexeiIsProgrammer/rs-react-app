import { useState, useMemo, useCallback, useEffect } from 'react';
import CountryTable from '../CountryTable';
import YearSelector from '../YearSelector';
import SearchBar from '../SearchBar';
import RegionFilter from '../RegionFilter';
import ColumnModal from '../ColumnModal';
import { useData } from '../../hooks/useData';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const data = useData();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({
    key: 'population',
    direction: 'desc',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ]);

  const [selectedYear, setSelectedYear] = useState<number>(-1);

  const regions = useMemo(() => {
    const regionSet = new Set<string>();
    Object.keys(data).forEach((countryKey) => {
      const country = data[countryKey];
      if (country.iso_code) {
        if (country.iso_code.startsWith('OWID_')) {
          regionSet.add('Special Regions');
        } else if (country.iso_code.length === 3) {
          regionSet.add('Countries');
        }
      }
    });
    return ['All', ...Array.from(regionSet)];
  }, [data]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    Object.values(data).forEach((country) => {
      country.data.forEach((yearData) => {
        if (yearData.year) years.add(yearData.year);
      });
    });

    const sortedYears = Array.from(years).sort((a, b) => b - a);

    return sortedYears;
  }, [data]);

  const filteredCountries = useMemo(() => {
    return Object.entries(data)
      .filter(([countryName, countryData]) => {
        const regionMatch =
          selectedRegion === 'All' ||
          (countryData.iso_code &&
            countryData.iso_code.startsWith('OWID_') &&
            selectedRegion === 'Special Regions') ||
          (countryData.iso_code &&
            countryData.iso_code.length === 3 &&
            selectedRegion === 'Countries');

        const nameMatch = countryName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return regionMatch && nameMatch;
      })
      .map(([name, data]) => ({ ...data, name }));
  }, [data, searchQuery, selectedRegion]);

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      const aData = a.data.find((d) => d.year === selectedYear);
      const bData = b.data.find((d) => d.year === selectedYear);

      let aValue: number | string = 0;
      let bValue: number | string = 0;

      if (sortConfig.key === 'name') {
        aValue = a.name;
        bValue = b.name;
      } else if (sortConfig.key === 'population') {
        aValue = aData?.population || 0;
        bValue = bData?.population || 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredCountries, selectedYear, sortConfig]);

  const availableColumns = useMemo(() => {
    const columns = new Set<string>();
    Object.values(data).forEach((country) => {
      country.data.forEach((yearData) => {
        Object.keys(yearData).forEach((key) => {
          if (!['year', 'population', 'co2', 'co2_per_capita'].includes(key)) {
            columns.add(key);
          }
        });
      });
    });
    return Array.from(columns);
  }, [data]);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleRegionFilter = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleSort = useCallback((key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  }, []);

  const handleColumnToggle = useCallback((column: string) => {
    setSelectedColumns((prev) => {
      if (prev.includes(column)) {
        return prev.filter((c) => c !== column);
      } else {
        return [...prev, column];
      }
    });
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (availableYears && selectedYear === -1) {
      handleYearChange(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.controls}>
        <h1>Dashboard</h1>

        <div className={styles['control-row']}>
          <YearSelector
            years={availableYears}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
          />

          <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

          <RegionFilter
            regions={regions}
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionFilter}
          />

          <button className={styles['column-button']} onClick={toggleModal}>
            Select Columns
          </button>
        </div>
      </div>

      <CountryTable
        countries={sortedCountries}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      {isModalOpen && (
        <ColumnModal
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          onColumnToggle={handleColumnToggle}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
