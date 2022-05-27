import { FC, useEffect, useState } from "react";

import Table from "../../components/table/CSTable";
import useAxios from "../../hooks/useAxios";
import { FM_COLUMNS } from "../../constants";
import { Columns, File, Row } from "../../interfaces/file-management.interface";

import styles from "./FileManagement.module.css";

const columns: Columns = {
  [FM_COLUMNS.NAME]: {
    label: "Name",
  },
  [FM_COLUMNS.DEVICE]: {
    label: "Device",
  },
  [FM_COLUMNS.PATH]: {
    label: "Path",
  },
  [FM_COLUMNS.STATUS]: {
    label: "Status",
  },
};

const FileManagement: FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);

  // custom hook to make api calls.
  const { response } = useAxios("/files");

  useEffect(() => {
    if (response !== null) {
      const rows = response.map(getRow);
      setRows(rows);
    }
  }, [response]);

  // To prepare a table row.
  const getRow = (record: File, index: number): Row => {
    return {
      id: index,
      checked: false,
      cells: {
        [FM_COLUMNS.NAME]: record.name,
        [FM_COLUMNS.DEVICE]: record.device,
        [FM_COLUMNS.PATH]: record.path,
        [FM_COLUMNS.STATUS]: record.status,
      },
    };
  };

  // When row checked/unchecked.
  const rowChangeHandler = (row: Row, checked: boolean, index: number) => {
    if (checked) {
      setSelectedRows([...selectedRows, { id: index, ...row }]);
    } else {
      const rows = selectedRows.filter((row: Row) => row.id !== index);
      setSelectedRows(rows);
    }

    const updatedRecords = rows.map((row: Row) => {
      if (row.id === index) {
        row.checked = checked;
      }

      return row;
    });

    setRows(updatedRecords);
  };

  // When checked/unchecked top checkbox.
  const selectAllRows = (records: Row[]) => {
    let updatedRecords;
    if (records.length) {
      updatedRecords = rows.map((row: Row) => {
        row.checked = true;
        return row;
      });
    } else {
      updatedRecords = rows.map((row: Row) => {
        row.checked = false;
        return row;
      });
    }
    setSelectedRows(records);
    setRows(updatedRecords);
  };

  return (
    <div className={styles.container}>
      <Table
        selectedRows={selectedRows}
        cols={columns}
        rows={rows}
        onRowSelection={rowChangeHandler}
        selectAllRows={selectAllRows}
      />
    </div>
  );
};

export default FileManagement;
