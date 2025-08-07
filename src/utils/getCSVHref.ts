import type { Character } from '../types/interfaces';

const getCSVHref = (items: Character[]) => {
  const csvData = jsonToCSV(items);

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  return url;
};

function jsonToCSV(items: Character[]) {
  if (items.length === 0) return '';

  const header = Object.keys(items[0]) as Array<keyof Character>;

  let csv = header.join(',') + '\n';

  items.forEach((item) => {
    const row = header.map((fieldName) => {
      const value = item[fieldName];
      return JSON.stringify(value);
    });
    csv += row.join(',') + '\n';
  });

  return csv;
}

export default getCSVHref;
