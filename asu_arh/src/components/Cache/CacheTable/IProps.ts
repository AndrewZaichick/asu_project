export interface IProps {
  values: string[] | string[][];
  title: string;
  checkingRowIndex: number;
  checkingColIndex: number;
  showChecking: boolean;
  showAddedValue?: boolean;
  showFoundedValue?: boolean;
  changeValue: (
    rowIndex: number,
    colIndex: number,
    value: string,
    numberOfCache: string,
  ) => void;
  isCheckingForAlreadyUsedValues: boolean;
  isChangeable?: boolean;
}
