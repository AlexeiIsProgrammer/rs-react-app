import type { Character } from '../types/interfaces';

const downloadCSV = (items: Character[]) => {
  const csvData = jsonToCSV(items);

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${items.length}_items.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

function jsonToCSV(items: Character[]) {
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

export default downloadCSV;
