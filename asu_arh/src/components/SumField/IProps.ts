export interface IProps {
  sectionId: string;
  firstValue: string;
  secondValue: string;
  isSecondValueNegative: boolean;
  addingUnit?: string;
  addingUnitIdOfFirstValue?: string;
  addingUnitIdOfSecondValue?: string;
  resultIdOfFirstAdding?: string;
  resultIdOfSecondAdding?: string;
  currentDigitOfFirstValueId?: string;
  currentDigitOfSecondValueId?: string;
  templateForEachDigitsOfFirstValue: string;
  templateForEachDigitsOfSecondValue: string;
  sectionTitle: string;
  sumId: string;
}
