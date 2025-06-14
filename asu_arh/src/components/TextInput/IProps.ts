import { ChangeEvent } from "react";

export interface IProps {
  placeholder: string;
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete: boolean;
  hasBorder: boolean;
  disable?: boolean;
}
