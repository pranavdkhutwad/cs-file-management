import { FC, ReactNode } from "react";
import { Row } from "../../../../interfaces/file-management.interface";
import { FM_COLUMNS } from "../../../../constants";

type ExportProps = {
  selectedRows: Row[];
};

const Export: FC<ExportProps> = ({ selectedRows }) => {
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
      onClick={downloadHandler}
      style={{ cursor: "pointer" }}
      className="space-around"
    >
      <span className="oi" data-glyph="data-transfer-download"></span>
      <span>Download Selected</span>
    </div>
  );
};

export default Export;
