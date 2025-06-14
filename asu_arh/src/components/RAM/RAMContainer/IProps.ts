import { ReactNode } from "react";

import { RAMTableSizes } from "@enums/RAMTableSizes";

export interface IProps {
  size: RAMTableSizes;
  children: ReactNode;
}
