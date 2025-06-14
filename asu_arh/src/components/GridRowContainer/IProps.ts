import { ReactNode } from "react";

export interface IProps {
  sectionId?: string;
  sectionTitle?: string;
  idOfFirstField?: string;
  idOfSecondField?: string;
  firstValue?: string | ReactNode;
  secondValue?: string | ReactNode;
}
