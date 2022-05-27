import { FC } from "react";

type SelectedCountProps = {
  selectedRowsCount: number;
};

const SelectedCount: FC<SelectedCountProps> = ({ selectedRowsCount }) => {
  return (
    <div className="space-around">
      {selectedRowsCount ? `Selected ${selectedRowsCount}` : "None Selected"}
    </div>
  );
};

export default SelectedCount;
