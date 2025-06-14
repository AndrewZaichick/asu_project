import { SetStateAction } from "react";

import { IRAMValues } from "@interfaces/IRAMValues";

export interface IProps {
  values: string[][];
  checkingRowIndex: number | null;
  checkingColIndex: number | null;
  zeroValues: IRAMValues[];
  showZeroValues: boolean;
  showChecking: boolean;
  changeValue:
    | ((
        rowIndex: number,
        colIndex: number,
        value: string,
        numberOfBlock: number,
      ) => void)
    | (() => void);
  selectedValues: IRAMValues[];
  setSelectedValues: (e: SetStateAction<IRAMValues[]>) => void;
  numberOfBlock: number;
  isSelectable?: boolean;
  isChangeable?: boolean;
}
