import { SetStateAction } from "react";

import { IAccurancyOption } from "@interfaces/IAccurancyOption";

export interface IProps {
  firstValue: number | string | null;
  setFirstValue: (e: SetStateAction<number | string | null>) => void;
  secondValue: number | string | null;
  setSecondValue: (e: SetStateAction<number | string | null>) => void;
  accurancyOptions: IAccurancyOption[];
  selectedAccuracy: string | null;
  setSelectedAccurancy: (e: SetStateAction<string | null>) => void;
  setShowSecondModal: () => void;
}
