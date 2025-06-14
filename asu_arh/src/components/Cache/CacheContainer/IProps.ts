import { ReactNode } from "react";

import { CacheTableSizes } from "@enums/CacheTableSizes";

export interface IProps {
  size: CacheTableSizes;
  children: ReactNode;
}
