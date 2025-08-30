export type ColumnModalProps = {
  availableColumns: string[];
  selectedColumns: string[];
  onColumnToggle: (column: string) => void;
  onClose: () => void;
};
