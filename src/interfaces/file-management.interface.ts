import { ReactNode } from "react";

export interface File {
  name: string;
  device: string;
  path: string;
  status: string;
}

interface Column {
  label: string;
}

export interface Columns {
  [key: string]: Column;
}

export interface Row {
  id?: number;
  checked: boolean;
  cells: {
    [key: string]: string | ReactNode;
  };
}
