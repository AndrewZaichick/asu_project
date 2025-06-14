import { SetStateAction } from "react";

import { IRAMValues } from "@interfaces/IRAMValues";

export interface IProps {
  text: string;
  isChecking: boolean;
  isZero?: boolean | null;
  colIndex: number;
  rowIndex: number;
  showZeroValues?: boolean;
  changeValue: (
    numberOfBlock: number,
    rowIndex: number,
    colIndex: number,
    value: string,
  ) => void;
  selectedValues?: IRAMValues[];
  setSelectedValues?: (e: SetStateAction<IRAMValues[]>) => void;
  numberOfBlock: number;
  isSelectable?: boolean;
  isChangeable?: boolean;
}
