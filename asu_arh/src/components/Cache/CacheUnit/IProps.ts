export interface IProps {
  text: string;
  isChecking: boolean;
  colIndex: number;
  rowIndex: number;
  changeValue: (
    value: string,
    rowIndex: number,
    colIndex: number,
    numberOfCache: string,
  ) => void;
  isAddedValue: boolean;
  isCheckingForAlreadyUsedValues: boolean;
  isValueFounded: boolean;
  titleOfCache: string;
  isChangeable?: boolean;
}
