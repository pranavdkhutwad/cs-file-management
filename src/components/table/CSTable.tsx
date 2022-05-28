import { FC, ChangeEvent } from "react";

import Checkbox from "../checkbox/Checkbox";
import SelectedCount from "./components/selected-count/SelectedCount";
import Export from "./components/export/Export";
import { getCheckedAllStatus } from "./util";
import { FM_COLUMNS } from "../../constants";

import { Columns, Row } from "../../interfaces/file-management.interface";
import styles from "./CSTable.module.css";

// Props Type.
interface CSTableProps {
  selectedRows: Row[];
  cols: Columns;
  rows: Row[];
  onRowSelection: (row: Row, checked: boolean, index: number) => void;
  selectAllRows: (rows: Row[]) => void;
}

const CSTable: FC<CSTableProps> = ({
  cols,
  onRowSelection,
  rows,
  selectAllRows,
  selectedRows,
}) => {
  const canDownload = () => {
    for (let row of selectedRows) {
      if (row.cells[FM_COLUMNS.STATUS] === "available") {
        return true;
      }
    }

    return false;
  };

  // Top most checkbox change handler.
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const selectedRows = checked ? rows : [];
    selectAllRows(selectedRows);
  };

  // row checked/unchecked handler.
  const recordSelectionHandler = (
    row: Row,
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const checked = event.target.checked;
    onRowSelection(row, checked, index);
  };

  const selectedCount = selectedRows.length;

  return (
    <div className={styles.container}>
      {rows.length ? (
        <div className={styles.tableOptions}>
          <Checkbox
            value={getCheckedAllStatus(rows.length, selectedRows.length)}
            onChange={changeHandler}
          />
          <SelectedCount selectedRowsCount={selectedCount} />
          <Export canDownload={canDownload()} selectedRows={selectedRows} />
        </div>
      ) : null}
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th></th>
            {Object.keys(cols).map((key: string) => (
              <th key={key}>{cols[key].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: Row, index) => (
            <tr key={index} className={row.checked ? styles.selected : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={row.checked}
                  onChange={(event) =>
                    recordSelectionHandler(row, event, index)
                  }
                />
              </td>
              {Object.keys(row.cells).map((key: string) => {
                if (key === "status") {
                  return (
                    <td>
                      <span className={styles.status}>
                        {row.cells[key] === "available" ? (
                          <span
                            className={`oi ${styles.online}`}
                            data-glyph="media-record"
                          ></span>
                        ) : (
                          <span
                            className={`oi ${styles.scheduled}`}
                            data-glyph="clock"
                          ></span>
                        )}
                        <span>{row.cells[key]}</span>
                      </span>
                    </td>
                  );
                }
                return <td key={key}>{row.cells[key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSTable;
