import { ReactNode } from "react";

import { TableSizes } from "@enums/RAMTableSizes";

export interface IProps {
  size: TableSizes;
  children: ReactNode;
}
