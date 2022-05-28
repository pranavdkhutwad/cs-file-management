import { FC } from "react";
import { Row } from "../../../../interfaces/file-management.interface";
import { FM_COLUMNS } from "../../../../constants";
import styles from "./Export.module.css";

type ExportProps = {
  canDownload: boolean;
  selectedRows: Row[];
};

const Export: FC<ExportProps> = ({ canDownload, selectedRows }) => {
  const downloadHandler = () => {
    const exportedRecords = selectedRows.reduce((acc: any, row: Row) => {
      if (row.cells[FM_COLUMNS.STATUS] === "available") {
        acc.push({
          path: row.cells[FM_COLUMNS.PATH],
          device: row.cells[FM_COLUMNS.DEVICE],
        });
      }
      return acc;
    }, []);
    alert(JSON.stringify(exportedRecords, null, 4));
  };
  return (
    <div
      onClick={canDownload ? downloadHandler : () => {}}
      className={`${
        !canDownload ? styles.disabled : styles.download
      } space-around`}
    >
      <span className="oi" data-glyph="data-transfer-download"></span>
      <span>Download Selected</span>
    </div>
  );
};

export default Export;
