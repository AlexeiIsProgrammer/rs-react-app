import { memo } from 'react';
import styles from './ColumnModal.module.scss';
import type { ColumnModalProps } from './types';

const ColumnModal = memo(
  ({
    availableColumns,
    selectedColumns,
    onColumnToggle,
    onClose,
  }: ColumnModalProps) => {
    return (
      <div className={styles['modal-overlay']} onClick={onClose}>
        <div
          className={styles['modal-content']}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles['modal-header']}>
            <h2>Select Columns to Display</h2>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
          <div className={styles['modal-body']}>
            {availableColumns.map((column) => (
              <label key={column} className={styles['column-option']}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() => onColumnToggle(column)}
                />
                <span>{column.replace(/_/g, ' ').toUpperCase()}</span>
              </label>
            ))}
          </div>
          <div className={styles['modal-footer']}>
            <button onClick={onClose}>Apply</button>
          </div>
        </div>
      </div>
    );
  }
);

ColumnModal.displayName = 'ColumnModal';

export default ColumnModal;
