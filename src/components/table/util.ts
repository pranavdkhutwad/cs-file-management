export const getCheckedAllStatus = (
  totalCount: number,
  selectedCount: number
): string => {
  if (totalCount === selectedCount) {
    return "Checked";
  }

  if (selectedCount) {
    return "Indeterminate";
  }

  return "Unchecked";
};
