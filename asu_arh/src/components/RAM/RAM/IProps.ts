import { SetStateAction } from "react";

import { IRAMValues } from "@interfaces/IRAMValues";

export interface IProps {
  values: string[][];
  checkingRowIndex: number | null;
  checkingColIndex: number | null;
  zeroValues: IRAMValues[];
  showZeroValues: boolean;
  showChecking: boolean;
  changeValue: (
    numberOfBlock: number,
    rowIndex: number,
    colIndex: number,
    value: string,
  ) => void;
  selectedValues: IRAMValues[];
  setSelectedValues: (e: SetStateAction<IRAMValues[]>) => void;
  numberOfBlock: number;
  isSelectable?: boolean;
  isChangeable?: boolean;
}
